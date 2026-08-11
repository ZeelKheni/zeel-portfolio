import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import ProjectDetails from "./ProjectDetails";
import { getAssetUrl } from "../utils";

/**
 * Official Material Design 3 Hero Carousel Component
 * Features auto-scroll tracking centering the 2x expanded active card when navigating or clicking slides.
 */
export function M3Carousel({ projects, setPreview }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-scroll track to center the new active card whenever activeIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      const activeCard = carouselRef.current.children[activeIndex];
      if (activeCard) {
        activeCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  return (
    <>
      <div className="relative w-full my-8 select-none">
        {/* Carousel Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-m3-primary animate-pulse" />
            <span className="text-xs font-mono font-bold text-m3-primary tracking-wider transition-colors duration-300">
              MATERIAL 3 HERO CAROUSEL ({activeIndex + 1} OF {projects.length})
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-m3-surface-low border border-m3-outline-variant transition-colors duration-300">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx
                      ? "w-6 bg-m3-primary shadow-md"
                      : "w-2 bg-m3-outline-variant hover:bg-m3-outline"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="p-3.5 rounded-full bg-m3-surface-low hover:bg-m3-primary hover:text-m3-on-primary border border-m3-outline-variant text-m3-on-surface transition-all shadow-lg cursor-pointer m3-interactive"
                aria-label="Previous game"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="p-3.5 rounded-full bg-m3-surface-low hover:bg-m3-primary hover:text-m3-on-primary border border-m3-outline-variant text-m3-on-surface transition-all shadow-lg cursor-pointer m3-interactive"
                aria-label="Next game"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Dynamic 2x Hero Width Track */}
        <div
          ref={carouselRef}
          className="flex items-center gap-5 overflow-x-auto pb-8 pt-2 px-2 custom-scrollbar scroll-smooth w-full justify-start"
        >
          {projects.map((project, idx) => {
            const isCenter = idx === activeIndex;

            return (
              <motion.div
                key={project.id}
                onClick={() => {
                  if (isCenter) {
                    setSelectedGame(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                onMouseEnter={() => setPreview && setPreview(project.image)}
                onMouseLeave={() => setPreview && setPreview(null)}
                layout
                initial={false}
                animate={{
                  width: isCenter ? "640px" : "280px",
                  opacity: isCenter ? 1 : 0.75,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 25,
                }}
                className={`relative shrink-0 h-[340px] sm:h-[400px] rounded-[32px] overflow-hidden border cursor-pointer group m3-interactive transition-all duration-300 ${
                  isCenter
                    ? "border-m3-primary shadow-2xl z-20"
                    : "border-m3-outline-variant hover:border-m3-outline hover:opacity-95 z-10"
                }`}
                style={{
                  minWidth: isCenter ? "320px" : "180px",
                }}
              >
                {/* Full-Bleed Image Background */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Tonal Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isCenter
                      ? "bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-95 dark:from-[#080c14] dark:via-[#080c14]/50"
                      : "bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/30 opacity-90 dark:from-[#080c14] dark:via-[#080c14]/60"
                  }`}
                />

                {/* Category Chip Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3.5 py-1 text-[10px] font-mono font-bold rounded-full bg-m3-surface-low/90 text-m3-primary border border-m3-primary/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  {isCenter && (
                    <span className="px-3 py-1 text-[10px] font-mono font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>

                {/* Overlaid Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
                  <h3
                    className={`font-black text-white font-display group-hover:text-cyan-300 transition-colors drop-shadow-md mb-2 ${
                      isCenter ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl line-clamp-1"
                    }`}
                  >
                    {project.title}
                  </h3>

                  {isCenter ? (
                    <>
                      <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed font-normal mb-5 max-w-xl drop-shadow">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="flex items-center gap-1.5 bg-m3-surface-low/90 px-3 py-1 rounded-full border border-white/10 text-[11px] text-white font-mono"
                            >
                              <img src={getAssetUrl(tag.path)} alt={tag.name} className="w-4 h-4 rounded" />
                              <span>{tag.name}</span>
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGame(project);
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-black rounded-full bg-m3-primary text-m3-on-primary hover:brightness-110 shadow-xl cursor-pointer transition-all active:scale-95 m3-interactive"
                        >
                          <span>Play Game</span>
                          <span className="text-sm">🎮</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <span className="text-[11px] font-mono text-cyan-300 font-bold flex items-center gap-1 mt-1">
                      <span>Click to Focus</span>
                      <span>➔</span>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Render Modal Dialog if Game Selected */}
      {selectedGame && (
        <ProjectDetails
          {...selectedGame}
          closeModal={() => setSelectedGame(null)}
        />
      )}
    </>
  );
}

export default M3Carousel;
