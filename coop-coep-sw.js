// Clean up any stale Service Worker to ensure Cloudflare R2 assets load without COEP blocking
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() => self.registration.unregister())
  );
});
