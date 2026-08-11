import React from "react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle({ className = "", compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-all duration-300 rounded-full m3-interactive ${
        compact ? "p-2.5 w-9 h-9" : "px-3.5 py-2 min-w-[38px] h-9"
      } ${
        isDark
          ? "bg-slate-800/80 text-amber-300 border border-slate-700/80 hover:bg-slate-700/80 hover:border-amber-400/50 shadow-md"
          : "bg-amber-100/90 text-amber-700 border border-amber-300/80 hover:bg-amber-200/90 hover:border-amber-500/50 shadow-md"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode (Material 3 Expressive)`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.05, 0.7, 0.1, 1] }}
        className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold"
      >
        <span className="text-base leading-none">
          {isDark ? "🌙" : "☀️"}
        </span>
        {!compact && (
          <span className="text-[11px] font-mono tracking-wider font-extrabold uppercase">
            {isDark ? "Dark" : "Light"}
          </span>
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
