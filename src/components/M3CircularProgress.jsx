import React from "react";

/**
 * Official Material Design 3 Circular Progress Indicator
 * Strictly follows Google M3 component specs (https://m3.material.io/components/progress-indicators).
 * Renders a perfectly round circular ring with M3 dynamic gradient roles and smooth stroke-dash animations.
 */
export function M3CircularProgress({
  progress = null, // null for indeterminate, 0..100 for determinate
  size = 96,
  strokeWidth = 5,
  className = "",
  label = null,
  showGlow = true,
  children = null,
}) {
  const isIndeterminate = progress === null || progress === undefined;

  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - strokeWidth - 8) / 2; // Leave room for glow
  const circumference = 2 * Math.PI * radius;
  const safeProgress = isIndeterminate ? 70 : Math.max(0, Math.min(100, progress || 0));

  const strokeDashoffset = isIndeterminate
    ? circumference * 0.3
    : circumference * (1 - safeProgress / 100);

  const gradientId = React.useId();
  const filterId = React.useId();

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`transform -rotate-90 ${isIndeterminate ? "animate-spin" : ""}`}
        style={{
          animationDuration: isIndeterminate ? "2s" : undefined,
          animationTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <defs>
          {/* M3 Expressive Multi-Tone Dynamic Gradient */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>

          {/* Soft M3 Glow Filter */}
          {showGlow && (
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Perfect Circle Tonal Background Track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth={strokeWidth}
        />

        {/* Active Perfect Circle Progress Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          filter={showGlow ? `url(#${filterId})` : undefined}
          style={{
            transition: isIndeterminate
              ? "none"
              : "stroke-dashoffset 400ms cubic-bezier(0.05, 0.7, 0.1, 1)",
          }}
        />
      </svg>

      {/* Center Percentage / Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {children ? (
          children
        ) : label !== null ? (
          <span className="font-mono font-black text-xs text-white">{label}</span>
        ) : !isIndeterminate ? (
          <div className="flex flex-col items-center">
            <span className="font-mono font-black text-base text-cyan-300 tracking-tight drop-shadow-md">
              {Math.round(safeProgress)}%
            </span>
          </div>
        ) : (
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        )}
      </div>
    </div>
  );
}

export default M3CircularProgress;
