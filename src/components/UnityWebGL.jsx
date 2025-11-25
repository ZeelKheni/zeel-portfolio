// UnityPage.jsx
import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityPage({ BuildUrl, appName, height = 600 , width = "100%"  ,streamingAssetsUrl = undefined}) {
  // build folder under /Build/<appName> and file names follow <appName>.*
  const base = `${BuildUrl}/${encodeURIComponent(appName)}`;
  const loaderUrl = `${base}.loader.js`;
  const dataUrl = `${base}.data`;
  const frameworkUrl = `${base}.framework.js`;
  const codeUrl = `${base}.wasm`;
console.log("StreamingUrl:",streamingAssetsUrl);
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl,
    streamingAssetsUrl,
  });

  // Optional: cleanup attempt when component unmounts
  useEffect(() => {
    return () => {
      // react-unity-webgl exposes a unityProvider object.
      // Best-effort cleanup: if the provider has a `quit()` or `_unityInstance`, call Quit where available.
      try {
        const p = unityProvider;
        if (!p) return;

        // some versions store the instance as p._unityInstance or p.getInstance()
        const inst = p._unityInstance ?? (typeof p.getInstance === "function" ? p.getInstance() : null);
        if (inst && typeof inst.Quit === "function") {
          inst.Quit().catch(() => {});
        } else if (typeof p.unload === "function") {
          // some wrappers offer unload()
          p.unload().catch(() => {});
        } else {
          // last resort: try to clear Module global (not always safe)
          try { if (window.Module && typeof window.Module.quit === "function") window.Module.quit(); } catch(e) {}
        }
      } catch (e) {
        // swallow - best-effort only
        console.warn("Unity cleanup attempt failed:", e);
      }
    };
  }, [unityProvider]);

 return (
    <div
      style={{
        display: "flex",
        alignItems: "center",       // vertical center
        justifyContent: "center",   // horizontal center
        width: "100%",
        height: "100%",
        overflow: "visible",        // 🔥 allows growth beyond 100%
      }}
    >
      <div
        style={{
          width,
          height,          // 🔥 canvas bigger than parent
          transformOrigin: "top center",
          background: "#000",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Unity
          unityProvider={unityProvider}
          style={{ width: "100%", height: "100%" }}
        />

        {!isLoaded && (
          <div
            style={{
              position: "absolute",
              left: 12,
              bottom: 12,
              color: "#fff",
            }}
          >
            Loading {Math.round(loadingProgression * 100)}%
          </div>
        )}
      </div>
    </div>
  );
}
