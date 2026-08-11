// Web Worker for multithreaded parallel game asset preloading and IndexedDB caching
const DB_NAME = 'ZeelGameCacheDB';
const DB_VERSION = 1;
const STORE_NAME = 'gameAssets';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'url' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getCachedAsset(url) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(url);
      req.onsuccess = () => resolve(req.result ? req.result.buffer : null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

async function cacheAsset(url, buffer) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ url, buffer, timestamp: Date.now() });
  } catch (err) {
    console.warn('IndexedDB cache put failed:', err);
  }
}

self.onmessage = async (e) => {
  const { action, urls } = e.data;

  if (action === 'PRELOAD') {
    let totalBytes = 0;
    let loadedBytes = 0;
    const progressMap = {};

    const fetchPromises = urls.map(async (url) => {
      // Check IndexedDB cache first
      const cachedBuffer = await getCachedAsset(url);
      if (cachedBuffer) {
        self.postMessage({ type: 'FILE_LOADED', url, fromCache: true, size: cachedBuffer.byteLength });
        return { url, buffer: cachedBuffer, fromCache: true };
      }

      // Fetch from network with progress stream
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
      }

      const contentLength = response.headers.get('Content-Length');
      const fileTotal = contentLength ? parseInt(contentLength, 10) : 0;
      totalBytes += fileTotal;

      const reader = response.body.getReader();
      const chunks = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        progressMap[url] = receivedLength;

        // Sum overall progress
        const currentTotalLoaded = Object.values(progressMap).reduce((a, b) => a + b, 0);
        self.postMessage({
          type: 'PROGRESS',
          url,
          loaded: receivedLength,
          total: fileTotal,
          overallLoaded: currentTotalLoaded,
          overallTotal: totalBytes,
        });
      }

      // Combine chunks into ArrayBuffer
      const combinedArray = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        combinedArray.set(chunk, position);
        position += chunk.length;
      }
      const buffer = combinedArray.buffer;

      // Cache asynchronously
      cacheAsset(url, buffer);

      self.postMessage({ type: 'FILE_LOADED', url, fromCache: false, size: buffer.byteLength });
      return { url, buffer, fromCache: false };
    });

    try {
      await Promise.all(fetchPromises);
      self.postMessage({ type: 'ALL_COMPLETE' });
    } catch (error) {
      self.postMessage({ type: 'ERROR', error: error.message });
    }
  }
};
