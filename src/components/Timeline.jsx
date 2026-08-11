"use client";
import { useScroll, useTransform, useSpring, motion } from "motion/react";
import React, { useEffect, useRef, useState, useId } from "react";
import { RESUME_URL } from "../constants";

/**
 * Official Material Design 3 Expressive Work Experience Timeline
 * Features a vertical smooth wavy progress line that fills pixel-by-pixel as the user scrolls through career roles.
 */
export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const lastDotRef = useRef(null);
  const [height, setHeight] = useState(0);

  const gradientId = useId();
  const filterId = useId();

  // Measure exact distance from top of timeline to center of the last dot badge
  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current && lastDotRef.current) {
        const refRect = ref.current.getBoundingClientRect();
        const lastDotRect = lastDotRef.current.getBoundingClientRect();
        const calculatedLen = lastDotRect.top - refRect.top + lastDotRect.height / 2;
        setHeight(calculatedLen > 0 ? calculatedLen : ref.current.offsetHeight);
      } else if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(ref.current);
    if (lastDotRef.current) {
      resizeObserver.observe(lastDotRef.current);
    }
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [data]);

  // Silky-smooth GPU scroll tracking with spring physics (eliminates snapping & lag)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  const heightTransform = useTransform(smoothProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  /**
   * Generates a smooth cubic Bezier vertical sine wave path.
   */
  const buildVerticalWavyPath = (totalHeight) => {
    if (!totalHeight || totalHeight <= 0) return "";

    const cx = 10;
    const amplitude = 3.5;
    const wavelength = 24;
    const halfWaves = Math.max(4, Math.floor(totalHeight / (wavelength / 2)));
    const actualHalfWavelength = totalHeight / halfWaves;

    let path = `M ${cx} 0`;

    for (let i = 0; i < halfWaves; i++) {
      const y0 = i * actualHalfWavelength;
      const y1 = (i + 1) * actualHalfWavelength;
      const direction = i % 2 === 0 ? 1 : -1;

      const cp1y = y0 + actualHalfWavelength / 3;
      const cp1x = cx + direction * amplitude * 1.33;
      const cp2y = y0 + (2 * actualHalfWavelength) / 3;
      const cp2x = cx + direction * amplitude * 1.33;

      path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${cx.toFixed(2)} ${y1.toFixed(2)}`;
    }

    return path;
  };

  const verticalWavyPath = buildVerticalWavyPath(height);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      {/* Section Header with M3 Containment Badge and Download Resume CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-m3-surface-low border border-m3-primary/30 text-m3-primary text-xs font-mono mb-3 shadow-md transition-colors duration-300">
            <span>💼 CAREER MILESTONES</span>
            <span>•</span>
            <span>6+ Years Experience</span>
          </div>
          <h2 className="text-heading">Work Experience & Roles</h2>
        </div>

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          download="Zeel_Kheni_Resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-m3-primary text-m3-on-primary font-mono font-bold text-xs shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer w-fit m3-interactive tracking-wide"
          title="Download Complete PDF Resume"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Resume (PDF)</span>
        </a>
      </div>

      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-10"
          >
            <div className="sticky z-30 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div
                ref={index === data.length - 1 ? lastDotRef : null}
                className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[19px] bg-m3-surface-low border border-m3-primary/40 shadow-lg transition-colors duration-300"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-m3-primary animate-pulse shadow-sm" />
              </div>
              <div className="flex-col hidden gap-1.5 md:flex md:pl-20">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-m3-primary-container text-m3-on-primary-container border border-m3-primary/30 text-xs font-mono font-bold w-fit shadow-sm">
                    {item.date}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-m3-surface-container text-m3-on-surface-variant text-[10px] font-mono font-semibold">
                    Role {index + 1} of {data.length}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-m3-on-surface font-display mt-1 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-m3-on-surface-variant font-display transition-colors">{item.job}</h4>
                  {item.location && (
                    <span className="text-xs text-m3-on-surface-variant font-mono opacity-80">
                      • 📍 {item.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative w-full pl-16 pr-4 md:pl-4">
              <div className="block mb-4 text-left md:hidden">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3.5 py-1 rounded-full bg-m3-primary-container text-m3-on-primary-container border border-m3-primary/30 text-xs font-mono font-bold">
                    {item.date}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-m3-surface-container text-m3-on-surface-variant text-[10px] font-mono">
                    {index + 1}/{data.length}
                  </span>
                </div>
                <h3 className="text-xl font-black text-m3-on-surface font-display mt-1 transition-colors">{item.title}</h3>
                <h4 className="text-sm font-semibold text-m3-on-surface-variant font-display transition-colors">
                  {item.job} {item.location && `• 📍 ${item.location}`}
                </h4>
              </div>

              <div className="space-y-3.5 p-6 rounded-[28px] bg-m3-surface-low border border-m3-outline-variant shadow-xl backdrop-blur-md transition-colors duration-300">
                {item.contents.map((content, idx) => (
                  <div className="flex items-start gap-2.5" key={idx}>
                    <span className="text-m3-primary text-xs mt-1 font-bold">⚡</span>
                    <p className="font-normal text-m3-on-surface-variant text-sm md:text-base leading-relaxed">
                      {content}
                    </p>
                  </div>
                ))}

                {/* Render Tech Stack Tags if present */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3.5 mt-2 border-t border-m3-outline-variant/60">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full bg-m3-primary-container/50 text-m3-on-primary-container text-[11px] font-mono border border-m3-primary/20 font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* M3 Expressive Vertical Wavy Scroll Fill Line */}
        {height > 0 && (
          <div
            className="absolute -left-[10px] top-0 w-5 pointer-events-none overflow-hidden"
            style={{ height: `${height}px` }}
          >
            {/* Tonal Background Wavy Track */}
            <svg
              width="20"
              height={height}
              viewBox={`0 0 20 ${height}`}
              className="absolute top-0 left-0 w-full h-full overflow-hidden"
            >
              <path
                d={verticalWavyPath}
                fill="none"
                stroke="var(--md-sys-color-outline-variant)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Active M3 Gradient Wavy Fill Line (Smooth physics spring fill) */}
            <motion.div
              className="absolute top-0 left-0 w-full overflow-hidden"
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
            >
              <svg
                width="20"
                height={height}
                viewBox={`0 0 20 ${height}`}
                className="w-full overflow-hidden"
              >
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--md-sys-color-primary)" />
                    <stop offset="50%" stopColor="var(--md-sys-color-secondary)" />
                    <stop offset="100%" stopColor="var(--md-sys-color-tertiary)" />
                  </linearGradient>

                  <filter id={filterId} x="-50%" y="-10%" width="200%" height="120%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d={verticalWavyPath}
                  fill="none"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`url(#${filterId})`}
                />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
