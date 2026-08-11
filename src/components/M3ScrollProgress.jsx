import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Official Material Design 3 Expressive Wavy Page Scroll Progress Indicator
 * Strictly tracks viewport scroll percentage with pixel-perfect resolution independence.
 */
export function M3ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smooth physics spring for scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const gradientId = React.useId();
  const filterId = React.useId();

  // Generate a smooth cubic Bezier sine wave across a 1000px viewport
  const buildWavyPath = () => {
    const totalWidth = 1000;
    const cy = 10;
    const amplitude = 3.5;
    const wavelength = 24;

    const halfWaves = Math.max(2, Math.floor(totalWidth / (wavelength / 2)));
    const actualHalfWavelength = totalWidth / halfWaves;

    let path = `M 0 ${cy.toFixed(2)}`;

    for (let i = 0; i < halfWaves; i++) {
      const x0 = i * actualHalfWavelength;
      const x1 = (i + 1) * actualHalfWavelength;
      const direction = i % 2 === 0 ? 1 : -1;

      const cp1x = x0 + actualHalfWavelength / 3;
      const cp1y = cy + direction * amplitude * 1.33;
      const cp2x = x0 + (2 * actualHalfWavelength) / 3;
      const cp2y = cy + direction * amplitude * 1.33;

      path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${x1.toFixed(2)} ${cy.toFixed(2)}`;
    }

    return path;
  };

  const wavyPath = buildWavyPath();

  return (
    <div className="fixed top-0 inset-x-0 z-50 h-5 pointer-events-none overflow-hidden">
      {/* Background Tonal Track across 100% Viewport */}
      <svg
        width="100%"
        height="20"
        viewBox="0 0 1000 20"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
      >
        <path
          d={wavyPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Active M3 Expressive Gradient Wavy Line Clipped to Exact Scroll Progress */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full origin-left overflow-hidden"
        style={{ scaleX }}
      >
        <svg
          width="100%"
          height="20"
          viewBox="0 0 1000 20"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>

            <filter id={filterId} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={wavyPath}
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
  );
}

export default M3ScrollProgress;
