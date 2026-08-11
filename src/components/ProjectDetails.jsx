import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import UnityWebGL from "./UnityWebGL";
import { getAssetUrl } from "../utils";

const ProjectDetails = ({
  title,
  description,
  subDescription = [],
  image,
  URL,
  appName,
  height,
  width,
  streamingUrl,
  tags = [],
  category = "Unity WebGL",
  orientation = "portrait",
  controls = [],
  isCompressed = false,
  closeModal,
}) => {
  const [activeSideTab, setActiveSideTab] = useState("overview"); // 'overview', 'controls', 'tech'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likeCount, setLikeCount] = useState(148);
  const [isLiked, setIsLiked] = useState(false);
  const modalContainerRef = useRef(null);

  const isLandscape = orientation === "landscape";

  const toggleFullscreen = () => {
    if (!modalContainerRef.current) return;
    if (!document.fullscreenElement) {
      modalContainerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.warn("Fullscreen request error:", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.warn("Exit fullscreen error:", err));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-m3-surface/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        ref={modalContainerRef}
        className={`relative w-full ${
          isFullscreen
            ? "max-w-none h-screen rounded-none"
            : isLandscape
            ? "max-w-7xl h-[92vh] max-h-[860px] rounded-[36px]"
            : "max-w-6xl h-[92vh] max-h-[820px] rounded-[36px]"
        } bg-m3-surface border border-m3-primary/30 shadow-2xl flex flex-col md:flex-row overflow-hidden text-m3-on-surface transition-all duration-300`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        {/* LEFT COLUMN: Playable Game Viewport */}
        <div className="relative flex-1 bg-black flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden border-b md:border-b-0 md:border-r border-m3-outline-variant">
          {/* Top Floating MD3 Badge Bar */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="px-3.5 py-1.5 rounded-full bg-m3-surface-low/90 text-m3-primary border border-m3-primary/40 text-xs font-mono backdrop-blur-md shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-m3-primary animate-pulse" />
                <span className="font-bold tracking-wide">PLAYABLE GAME</span>
              </span>
              <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-m3-surface-low/90 text-m3-on-surface-variant border border-m3-outline-variant text-xs font-mono backdrop-blur-md">
                {isLandscape ? "📺 16:9 Landscape" : "📱 Portrait Mode"}
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={toggleFullscreen}
                className="px-4 py-1.5 rounded-full bg-m3-surface-low/90 hover:bg-m3-surface-container text-m3-primary border border-m3-primary/40 text-xs font-mono font-bold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Game Mode"}
              >
                <span>{isFullscreen ? "↙ Exit" : "⛶ Fullscreen"}</span>
              </button>

              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/40 backdrop-blur-md transition-all cursor-pointer shadow-lg md:hidden active:scale-95"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* WebGL Frame Container */}
          <div
            className={`relative w-full h-full ${
              isLandscape
                ? "max-w-[880px] max-h-[640px] aspect-video"
                : "max-w-[420px] max-h-[720px]"
            } flex items-center justify-center rounded-2xl overflow-hidden border border-m3-primary/30 shadow-2xl bg-black`}
          >
            <UnityWebGL
              BuildUrl={URL}
              appName={appName}
              height="100%"
              width="100%"
              streamingAssetsUrl={streamingUrl}
              isCompressed={isCompressed}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: MD3 Expressive Side Panel */}
        <div className="w-full md:w-[380px] lg:w-[420px] bg-m3-surface-low flex flex-col border-l border-m3-outline-variant overflow-hidden transition-colors duration-300">
          {/* Header Profile Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-m3-outline-variant select-none bg-m3-surface-dim/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-0.5 shadow-md">
                <div className="w-full h-full rounded-[14px] bg-m3-surface flex items-center justify-center font-bold text-xs text-m3-primary font-mono">
                  ZK
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-m3-on-surface font-display">Zeel Kheni</span>
                  <span className="w-4 h-4 rounded-full bg-m3-primary text-m3-on-primary text-[10px] font-bold flex items-center justify-center">
                    ✓
                  </span>
                </div>
                <span className="text-xs text-m3-on-surface-variant font-mono">Game Dev • WebGL</span>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="p-2 rounded-full bg-m3-surface-container hover:bg-m3-surface-high text-m3-on-surface-variant hover:text-m3-on-surface transition-all cursor-pointer active:scale-95"
              title="Close (Esc)"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Game Title & Category Header */}
          <div className="px-5 py-4 border-b border-m3-outline-variant bg-m3-surface-dim/30">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-m3-primary-container text-m3-on-primary-container border border-m3-primary/30 text-[11px] font-mono font-bold">
                {category}
              </span>
              <span className="text-xs font-mono text-m3-on-surface-variant">
                {isLandscape ? "Landscape 📺" : "Portrait 📱"}
              </span>
            </div>
            <h2 className="text-xl font-black text-m3-on-surface font-display tracking-tight">{title}</h2>
          </div>

          {/* MD3 Segmented Tab Bar */}
          <div className="p-2 border-b border-m3-outline-variant bg-m3-surface-dim/80 text-xs font-mono">
            <div className="flex items-center p-1 bg-m3-surface-container rounded-full">
              <button
                onClick={() => setActiveSideTab("overview")}
                className={`flex-1 py-2 text-center transition-all cursor-pointer font-bold rounded-full ${
                  activeSideTab === "overview"
                    ? "bg-m3-primary text-m3-on-primary shadow-md"
                    : "text-m3-on-surface-variant hover:text-m3-on-surface"
                }`}
              >
                📋 Overview
              </button>
              <button
                onClick={() => setActiveSideTab("controls")}
                className={`flex-1 py-2 text-center transition-all cursor-pointer font-bold rounded-full ${
                  activeSideTab === "controls"
                    ? "bg-m3-primary text-m3-on-primary shadow-md"
                    : "text-m3-on-surface-variant hover:text-m3-on-surface"
                }`}
              >
                ⌨️ Controls
              </button>
              <button
                onClick={() => setActiveSideTab("tech")}
                className={`flex-1 py-2 text-center transition-all cursor-pointer font-bold rounded-full ${
                  activeSideTab === "tech"
                    ? "bg-m3-primary text-m3-on-primary shadow-md"
                    : "text-m3-on-surface-variant hover:text-m3-on-surface"
                }`}
              >
                ⚡ Tech Stack
              </button>
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 custom-scrollbar">
            {activeSideTab === "overview" && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-m3-primary uppercase tracking-wider mb-2 font-bold">
                    About Game
                  </h4>
                  <p className="text-sm text-m3-on-surface-variant leading-relaxed font-normal">
                    {description}
                  </p>
                </div>

                {subDescription.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono text-m3-primary uppercase tracking-wider mb-2.5 font-bold">
                      Highlights & Features
                    </h4>
                    <div className="space-y-2">
                      {subDescription.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-m3-surface-container border border-m3-outline-variant text-xs text-m3-on-surface-variant"
                        >
                          <span className="text-m3-primary font-bold text-sm">•</span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSideTab === "controls" && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-m3-primary uppercase tracking-wider mb-2 font-bold">
                  Keyboard & Touch Inputs
                </h4>

                {controls.length > 0 ? (
                  <div className="space-y-2.5">
                    {controls.map((ctrl, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-m3-surface-container border border-m3-outline-variant"
                      >
                        <span className="px-3.5 py-1 rounded-full bg-m3-primary-container text-m3-on-primary-container font-mono text-xs font-bold border border-m3-primary/30 shadow-sm">
                          {ctrl.key}
                        </span>
                        <span className="text-xs text-m3-on-surface font-medium">{ctrl.action}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-m3-surface-container border border-m3-outline-variant text-xs text-m3-on-surface-variant">
                    Standard Touch / Mouse / Arrow key controls supported.
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-m3-tertiary-container/40 border border-m3-tertiary/30 text-xs text-m3-on-tertiary-container space-y-1">
                  <p className="font-bold text-m3-on-surface flex items-center gap-1">
                    <span>💡 Focus Tip</span>
                  </p>
                  <p className="text-[11px] text-m3-on-surface-variant leading-normal">
                    Click inside the game frame to assign keyboard focus directly to Unity!
                  </p>
                </div>
              </div>
            )}

            {activeSideTab === "tech" && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-m3-primary uppercase tracking-wider mb-2 font-bold">
                  Engine & Architecture
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-m3-surface-container border border-m3-outline-variant">
                    <span className="text-[10px] text-m3-on-surface-variant font-mono font-semibold">ENGINE</span>
                    <p className="text-sm font-bold text-m3-on-surface mt-0.5 font-display">Unity 6 & C#</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-m3-surface-container border border-m3-outline-variant">
                    <span className="text-[10px] text-m3-on-surface-variant font-mono font-semibold">ACCELERATOR</span>
                    <p className="text-sm font-bold text-m3-on-surface mt-0.5 font-display">WebWorker & IDB</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-m3-primary uppercase tracking-wider mb-2 font-bold">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-m3-surface-container border border-m3-outline-variant text-xs text-m3-on-surface"
                      >
                        <img src={getAssetUrl(tag.path)} alt={tag.name} className="w-4 h-4 rounded" />
                        <span>{tag.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Footer Bar */}
          <div className="px-5 py-3.5 border-t border-m3-outline-variant bg-m3-surface-dim/80 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                  isLiked ? "text-pink-500 scale-110" : "text-m3-on-surface-variant hover:text-m3-on-surface"
                }`}
              >
                <span>{isLiked ? "❤️" : "🤍"}</span>
                <span>{likeCount}</span>
              </button>

              <span className="text-xs text-m3-outline-variant">•</span>

              <span className="text-xs font-mono text-m3-on-surface-variant flex items-center gap-1">
                <span>🎮</span>
                <span>Play Live</span>
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="px-5 py-2 rounded-full bg-m3-primary text-m3-on-primary font-mono font-black text-xs transition-all shadow-md hover:brightness-110 active:scale-95 cursor-pointer"
            >
              Fullscreen ⛶
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
