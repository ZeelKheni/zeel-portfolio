import React, { useEffect, useState, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import decompress from "brotli/decompress";
import M3CircularProgress from "./M3CircularProgress";
import M3LinearProgress from "./M3LinearProgress";

export default function UnityWebGL({
  BuildUrl,
  appName,
  height = "100%",
  width = "100%",
  streamingAssetsUrl = undefined,
  isCompressed = false,
}) {
  const [blobUrls, setBlobUrls] = useState(null);
  const [cacheStatus, setCacheStatus] = useState("Initializing fast loader...");

  // Normalize base path for Vite
  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  let cleanBuildUrl = BuildUrl;
  if (!BuildUrl.startsWith("http")) {
    const cleanRelative = BuildUrl.startsWith("/") ? BuildUrl.slice(1) : BuildUrl;
    cleanBuildUrl = `${cleanBase}${cleanRelative}`;
  }

  let cleanStreamingUrl = streamingAssetsUrl;
  if (streamingAssetsUrl && !streamingAssetsUrl.startsWith("http")) {
    const cleanRelative = streamingAssetsUrl.startsWith("/") ? streamingAssetsUrl.slice(1) : streamingAssetsUrl;
    cleanStreamingUrl = `${cleanBase}${cleanRelative}`;
  }

  const base = `${cleanBuildUrl}/${encodeURIComponent(appName)}`;

  useEffect(() => {
    let isMounted = true;
    let createdUrls = [];

    async function prepareAssets() {
      try {
        const loaderUrl = `${base}.loader.js`;

        if (!isCompressed) {
          if (isMounted) {
            setBlobUrls({
              loaderUrl,
              dataUrl: `${base}.data`,
              frameworkUrl: `${base}.framework.js`,
              codeUrl: `${base}.wasm`,
              streamingAssetsUrl: cleanStreamingUrl,
            });
          }
          return;
        }

        setCacheStatus("Downloading compressed WebGL streams...");
        const [frameworkRes, dataRes, wasmRes] = await Promise.all([
          fetch(`${base}.framework.js.br`),
          fetch(`${base}.data.br`),
          fetch(`${base}.wasm.br`),
        ]);

        if (!frameworkRes.ok || !dataRes.ok || !wasmRes.ok) {
          throw new Error(`Failed to fetch Brotli build files (status: ${frameworkRes.status}, ${dataRes.status}, ${wasmRes.status})`);
        }

        setCacheStatus("⚡ Decompressing Brotli streams...");
        const [frameworkBuf, dataBuf, wasmBuf] = await Promise.all([
          frameworkRes.arrayBuffer(),
          dataRes.arrayBuffer(),
          wasmRes.arrayBuffer(),
        ]);

        const decompFramework = decompress(new Uint8Array(frameworkBuf));
        const decompData = decompress(new Uint8Array(dataBuf));
        const decompWasm = decompress(new Uint8Array(wasmBuf));

        const frameworkBlobUrl = URL.createObjectURL(
          new Blob([decompFramework], { type: "application/javascript" })
        );
        const dataBlobUrl = URL.createObjectURL(
          new Blob([decompData], { type: "application/octet-stream" })
        );
        const wasmBlobUrl = URL.createObjectURL(
          new Blob([decompWasm], { type: "application/wasm" })
        );

        createdUrls = [frameworkBlobUrl, dataBlobUrl, wasmBlobUrl];

        if (isMounted) {
          setBlobUrls({
            loaderUrl,
            frameworkUrl: frameworkBlobUrl,
            dataUrl: dataBlobUrl,
            codeUrl: wasmBlobUrl,
            streamingAssetsUrl: cleanStreamingUrl,
          });
        }
      } catch (err) {
        console.error("Unity asset preparation error:", err);
      }
    }

    prepareAssets();

    return () => {
      isMounted = false;
      createdUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [base, isCompressed, cleanStreamingUrl]);

  if (!blobUrls) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[450px] bg-m3-surface-low text-m3-on-surface p-6 rounded-[28px] border border-m3-outline-variant shadow-2xl transition-colors duration-300">
        <M3CircularProgress progress={null} size={96} strokeWidth={5} className="mb-5" />
        <h4 className="text-xl font-black text-m3-on-surface font-display mb-2">Initializing {appName}</h4>
        <p className="text-xs font-mono text-m3-primary bg-m3-surface-container px-4 py-1.5 rounded-full border border-m3-primary/30 shadow-md">
          {cacheStatus}
        </p>
      </div>
    );
  }

  return (
    <UnityInstance
      {...blobUrls}
      appName={appName}
      height={height}
      width={width}
    />
  );
}

function UnityInstance({
  loaderUrl,
  dataUrl,
  frameworkUrl,
  codeUrl,
  streamingAssetsUrl,
  appName,
  height,
  width,
}) {
  const containerRef = useRef(null);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.JS_WebRequests = window.JS_WebRequests || {};
      window.webRequests = window.webRequests || {};
      window.unityWebRequests = window.unityWebRequests || {};
      window.webRequestObjects = window.webRequestObjects || {};
      if (window.Module) {
        window.Module.JS_WebRequests = window.Module.JS_WebRequests || window.Module.JS_WebRequests;
        window.Module.webRequests = window.Module.webRequests || window.webRequests;
      }
    }
  }, [loaderUrl]);

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl,
    streamingAssetsUrl,
  });

  const displayProgress = Math.round(loadingProgression * 100);

  const focusCanvas = () => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector("canvas");
      if (canvas) {
        canvas.setAttribute("tabindex", "0");
        canvas.focus();
        setHasFocus(true);
      }
    }
  };

  useEffect(() => {
    if (isLoaded) {
      focusCanvas();
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasFocus && ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasFocus]);

  useEffect(() => {
    return () => {
      try {
        const p = unityProvider;
        if (!p) return;
        const inst =
          p._unityInstance ??
          (typeof p.getInstance === "function" ? p.getInstance() : null);
        if (inst && typeof inst.Quit === "function") {
          inst.Quit().catch(() => {});
        } else if (typeof p.unload === "function") {
          p.unload().catch(() => {});
        }
      } catch (e) {
        console.warn("Unity cleanup:", e);
      }
    };
  }, [unityProvider]);

  return (
    <div
      ref={containerRef}
      onClick={focusCanvas}
      className="relative flex items-center justify-center w-full h-full bg-neutral-950 rounded-xl overflow-hidden select-none cursor-pointer group"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Unity
          unityProvider={unityProvider}
          className="w-full h-full object-contain rounded-xl focus:outline-none"
          tabIndex="0"
          style={{ width, height, visibility: isLoaded ? "visible" : "hidden" }}
        />

        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-m3-surface/95 backdrop-blur-xl p-6 text-m3-on-surface transition-colors duration-300">
            {/* Official Material 3 Circular Progress Ring */}
            <M3CircularProgress
              progress={displayProgress}
              size={96}
              strokeWidth={5}
              className="mb-5"
            />

            <h4 className="text-2xl font-black tracking-tight text-m3-on-surface mb-3 font-display">
              Initializing {appName}
            </h4>

            {/* Official M3 Expressive Wavy Linear Progress Bar */}
            <div className="w-64 sm:w-80 mb-2">
              <M3LinearProgress progress={displayProgress} variant="wavy" amplitude={2.5} wavelength={24} />
            </div>
          </div>
        )}

        {isLoaded && !hasFocus && (
          <div
            onClick={focusCanvas}
            className="absolute inset-x-0 bottom-3 z-30 flex justify-center pointer-events-none"
          >
            <span className="px-4 py-1.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 text-xs font-mono backdrop-blur-md shadow-lg animate-bounce pointer-events-auto cursor-pointer">
              🎮 Click to Focus Controls
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
