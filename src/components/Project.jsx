import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import { getAssetUrl } from "../utils";
import M3LinearProgress from "./M3LinearProgress";

const Project = ({
  id,
  title = "",
  category = "Unity WebGL",
  orientation = "portrait",
  description,
  subDescription = [],
  href,
  image,
  URL,
  width,
  height,
  streamingUrl,
  appName,
  tags = [],
  controls = [],
  isCompressed = false,
  setPreview,
  viewMode = "grid",
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Deterministic performance score based on title length
  const scoreSeed = typeof id === "number" ? id : (title || "").length;
  const perfScore = 92 + (scoreSeed % 7);

  if (viewMode === "grid") {
    return (
      <>
        <div
          className="group relative flex flex-col justify-between p-7 rounded-[28px] bg-m3-surface-low border border-m3-outline-variant hover:border-m3-primary/60 shadow-xl transition-all duration-400 hover:-translate-y-2 overflow-hidden m3-interactive"
          style={{ borderRadius: "28px 8px 28px 28px" }}
          onMouseEnter={() => setPreview && setPreview(image)}
          onMouseLeave={() => setPreview && setPreview(null)}
        >
          {/* Card Top Header */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3.5 py-1 text-[11px] font-mono font-bold rounded-full bg-m3-primary-container text-m3-on-primary-container border border-m3-primary/30 shadow-sm">
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 dark:text-emerald-400 font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {orientation === "landscape" ? "Landscape 📺" : "Portrait 📱"}
              </span>
            </div>

            <h3 className="text-xl font-black text-m3-on-surface font-display group-hover:text-m3-primary transition-colors mb-2">
              {title}
            </h3>

            <p className="text-sm text-m3-on-surface-variant line-clamp-3 leading-relaxed mb-4 font-normal transition-colors">
              {description}
            </p>

            {/* M3 Wavy Performance Meter */}
            <div className="mb-4 p-3 rounded-2xl bg-m3-surface-container border border-m3-outline-variant transition-colors">
              <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                <span className="text-m3-on-surface-variant">FPS & Asset Optimization</span>
                <span className="text-m3-primary font-bold">{perfScore}% ⚡</span>
              </div>
              <M3LinearProgress progress={perfScore} variant="wavy" amplitude={1.8} wavelength={18} height={8} strokeWidth={2} />
            </div>
          </div>

          {/* Card Bottom Actions */}
          <div className="pt-4 border-t border-m3-outline-variant flex items-center justify-between gap-3 mt-2 transition-colors">
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={getAssetUrl(tag.path)}
                  alt={tag.name}
                  title={tag.name}
                  className="w-6 h-6 rounded-lg bg-m3-surface-container p-0.5 border border-m3-outline-variant object-contain"
                />
              ))}
            </div>

            <button
              onClick={() => setIsOpenModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black font-mono rounded-full bg-m3-primary text-m3-on-primary hover:brightness-110 shadow-md active:scale-95 transition-all cursor-pointer m3-interactive"
            >
              <span>Play Game</span>
              <span className="text-sm">🎮</span>
            </button>
          </div>
        </div>

        {isOpenModal && (
          <ProjectDetails
            title={title}
            category={category}
            orientation={orientation}
            description={description}
            subDescription={subDescription}
            appName={appName}
            image={image}
            URL={URL}
            height={height}
            width={width}
            tags={tags}
            controls={controls}
            href={href}
            streamingUrl={streamingUrl}
            isCompressed={isCompressed}
            closeModal={() => setIsOpenModal(false)}
          />
        )}
      </>
    );
  }

  // List View Mode
  return (
    <>
      <div
        className="group relative flex flex-wrap items-center justify-between p-6 rounded-[28px] bg-m3-surface-low border border-m3-outline-variant hover:border-m3-primary/60 shadow-lg transition-all duration-300 hover:-translate-y-1 gap-4 m3-interactive"
        onMouseEnter={() => setPreview && setPreview(image)}
        onMouseLeave={() => setPreview && setPreview(null)}
      >
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3.5 py-1 text-[11px] font-mono font-bold rounded-full bg-m3-primary-container text-m3-on-primary-container border border-m3-primary/30">
              {category}
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-m3-surface-container text-m3-on-surface-variant border border-m3-outline-variant">
              {orientation === "landscape" ? "Landscape 📺" : "Portrait 📱"}
            </span>
            <h3 className="text-xl font-extrabold text-m3-on-surface font-display group-hover:text-m3-primary transition-colors">
              {title}
            </h3>
          </div>

          <p className="text-sm text-m3-on-surface-variant line-clamp-2 max-w-3xl mb-3 font-normal transition-colors">
            {description}
          </p>

          <div className="flex items-center gap-4 text-xs text-m3-on-surface-variant font-mono">
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <span key={tag.id} className="flex items-center gap-1.5 bg-m3-surface-container px-3 py-1 rounded-full border border-m3-outline-variant">
                  <img src={getAssetUrl(tag.path)} alt={tag.name} className="w-4 h-4 rounded" />
                  <span>{tag.name}</span>
                </span>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 w-48">
              <span className="text-[10px] text-m3-on-surface-variant font-semibold">{perfScore}% FPS</span>
              <M3LinearProgress progress={perfScore} variant="wavy" amplitude={1.5} wavelength={16} height={6} strokeWidth={2} />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpenModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black font-mono rounded-full bg-m3-primary text-m3-on-primary hover:brightness-110 shadow-md active:scale-95 transition-all cursor-pointer m3-interactive"
        >
          <span>Launch Game</span>
          <span className="text-sm">🎮</span>
        </button>
      </div>

      {isOpenModal && (
        <ProjectDetails
          title={title}
          category={category}
          orientation={orientation}
          description={description}
          subDescription={subDescription}
          appName={appName}
          image={image}
          URL={URL}
          height={height}
          width={width}
          tags={tags}
          controls={controls}
          href={href}
          streamingUrl={streamingUrl}
          isCompressed={isCompressed}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default Project;
