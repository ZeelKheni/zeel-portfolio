import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Official Material Design 3 Rich Tooltip Component
 * Renders a tonal surface container tooltip with technical breakdown on hover.
 */
export function M3Tooltip({ title, text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 px-4 py-2.5 rounded-2xl bg-[#080c14] border border-cyan-500/40 text-white shadow-2xl backdrop-blur-xl min-w-[160px] max-w-[220px] pointer-events-none"
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ duration: 0.15 }}
          >
            {title && (
              <p className="font-mono font-bold text-xs text-cyan-300 mb-0.5 tracking-wide">
                {title}
              </p>
            )}
            {text && <p className="text-[11px] text-slate-300 leading-snug font-normal">{text}</p>}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#080c14]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default M3Tooltip;
