import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { myProjects } from "../constants";
import ProjectDetails from "./ProjectDetails";
import ThemeToggle from "./ThemeToggle";

/**
 * Official Material Design 3 Expressive Extended Floating Action Button (FAB)
 * Positioned in bottom-right corner with spring hover physics and instant random game launcher.
 */
export function M3Fab() {
  const [selectedGame, setSelectedGame] = useState(null);

  const launchRandomGame = () => {
    const randomProject = myProjects[Math.floor(Math.random() * myProjects.length)];
    setSelectedGame(randomProject);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <ThemeToggle compact className="shadow-2xl h-12 w-12 border-m3-outline-variant" />

        <button
          onClick={launchRandomGame}
          className="group relative flex items-center gap-3 px-6 py-4 rounded-[28px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 text-slate-950 font-mono font-black text-xs shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 active:scale-95 cursor-pointer m3-interactive tracking-wider"
          title="Launch a Random WebGL Game"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">🎲</span>
          <span className="font-extrabold text-slate-950">PLAY RANDOM GAME</span>
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
        </button>
      </motion.div>

      {/* Render Modal Dialog if Random Game Selected */}
      {selectedGame && (
        <ProjectDetails
          {...selectedGame}
          closeModal={() => setSelectedGame(null)}
        />
      )}
    </>
  );
}

export default M3Fab;
