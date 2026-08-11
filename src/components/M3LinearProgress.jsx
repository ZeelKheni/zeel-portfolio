import React, { useEffect, useState, useRef } from "react";

/**
 * Official Material Design 3 Expressive Wavy Linear Progress Indicator
 * Uses a fixed smooth sine wave path masked by SVG stroke-dasharray for 100% perfect alignment.
 */
export function M3LinearProgress({
  progress = null, // null for indeterminate, 0..100 for determinate
  width = "100%",
  height = 24,
  strokeWidth = 4,
  amplitude = 3,
  wavelength = 24,
  variant = "wavy", // "wavy" | "flat"
  className = "",
}) {
  const isIndeterminate = progress === null || progress === undefined;
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(300);

  const safeProgress = isIndeterminate ? 70 : Math.max(0, Math.min(100, progress || 0));
  const gradientId = React.useId();

  /**
   * Generates the complete 100% width smooth cubic Bezier sine wave path.
   */
  const buildFullLinearPath = () => {
    const totalWidth = 300;
    const cy = height / 2;

    const halfWaves = Math.max(2, Math.floor(totalWidth / (wavelength / 2)));
    const actualHalfWavelength = totalWidth / halfWaves;

    let path = `M 0 ${cy.toFixed(2)}`;

    for (let i = 0; i < halfWaves; i++) {
      const x0 = i * actualHalfWavelength;
      const x1 = (i + 1) * actualHalfWavelength;
      const direction = i % 2 === 0 ? 1 : -1;

      if (variant === "wavy") {
        const cp1x = x0 + actualHalfWavelength / 3;
        const cp1y = cy + direction * amplitude * 1.33;
        const cp2x = x0 + (2 * actualHalfWavelength) / 3;
        const cp2y = cy + direction * amplitude * 1.33;
        const endY = cy;

        path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${x1.toFixed(2)} ${endY.toFixed(2)}`;
      } else {
        path += ` L ${x1.toFixed(2)} ${cy.toFixed(2)}`;
      }
    }

    return path;
  };

  const fullLinearPath = buildFullLinearPath();

  // Measure exact path length for stroke-dasharray
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) setPathLength(len);
    }
  }, [width, height, amplitude, wavelength, variant]);

  const strokeDashoffset = isIndeterminate
    ? pathLength * 0.3
    : pathLength * (1 - safeProgress / 100);

  return (
    <div className={`w-full ${className}`} style={{ width }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 300 ${height}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>

        {/* Hidden Reference Path */}
        <path ref={pathRef} d={fullLinearPath} fill="none" stroke="none" />

        {/* Tonal Background Track */}
        <path
          d={fullLinearPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active Wavy Line (Identical Path, Masked by Stroke-Dash) */}
        <path
          d={fullLinearPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-400 ease-out"
        />
      </svg>
    </div>
  );
}

export default M3LinearProgress;
