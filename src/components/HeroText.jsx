import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { RESUME_URL, LOCAL_RESUME_PATH } from "../constants";

const HeroText = () => {
  const words = ["Immersive", "High-FPS", "Multiplayer", "Unreal 5 & Unity"];
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative z-20 mt-20 md:mt-32 text-left max-w-3xl">
      {/* Status Badge */}
      <motion.div
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-m3-surface-low/90 border border-m3-primary/40 text-m3-primary text-xs font-mono mb-6 shadow-xl backdrop-blur-xl transition-colors duration-300"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
        <span className="font-bold tracking-wide">⚡ Lead Game Engineer & Technical Consultant (6+ Yrs Exp)</span>
      </motion.div>

      {/* Display Large Headline */}
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl font-black text-m3-on-surface tracking-tight leading-[1.06] font-display transition-colors duration-300"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        Hi, I'm{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 dark:from-cyan-300 dark:via-indigo-300 dark:to-pink-400">
          Zeel Kheni
        </span>
      </motion.h1>

      <motion.div
        className="mt-4 text-2xl sm:text-4xl font-bold text-m3-on-surface-variant flex flex-wrap items-center gap-x-3 font-display transition-colors duration-300"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <span>Architecting</span>
        <FlipWords words={words} className="text-m3-primary font-extrabold" />
        <span>Game Solutions</span>
      </motion.div>

      <motion.p
        className="mt-5 text-base sm:text-lg text-m3-on-surface-variant leading-relaxed max-w-xl font-normal transition-colors duration-300"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        6+ years of expertise engineering high-performance Unity & Unreal Engine 5 titles, multiplayer servers (Photon Fusion & Dedicated Servers), WebGL builds, and custom gameplay architecture.
      </motion.p>

      {/* Prominent Action Buttons */}
      <motion.div
        className="mt-9 flex flex-wrap items-center gap-3.5"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        <a
          href="#work"
          className="m3-btn-prominent m3-interactive"
        >
          <span>Play Games</span>
          <span className="text-base">🎮</span>
        </a>

        {/* Download Resume Button */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          download="Zeel_Kheni_Resume.pdf"
          className="px-6 py-3.5 rounded-full bg-m3-secondary-container hover:bg-m3-secondary hover:text-m3-on-secondary text-m3-on-secondary-container font-mono font-bold text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 border border-m3-secondary/40 cursor-pointer m3-interactive tracking-wide"
          title="Download Zeel Kheni's CV (PDF)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Resume</span>
        </a>

        <a
          href="#contact"
          className="m3-btn-secondary m3-interactive"
        >
          <span>Contact Me</span>
          <span className="text-base">✉️</span>
        </a>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div
        className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
      >
        <div className="p-4 rounded-[28px] bg-m3-primary-container/60 border border-m3-primary/30 shadow-xl backdrop-blur-md transition-all hover:scale-105">
          <p className="text-2xl sm:text-3xl font-black text-m3-primary font-mono tracking-tight">9+</p>
          <p className="text-xs text-m3-on-surface-variant font-mono mt-1 font-semibold">Playable Games</p>
        </div>
        <div className="p-4 rounded-[28px] bg-m3-secondary-container/60 border border-m3-secondary/30 shadow-xl backdrop-blur-md transition-all hover:scale-105">
          <p className="text-2xl sm:text-3xl font-black text-m3-secondary font-mono tracking-tight">6+ Yrs</p>
          <p className="text-xs text-m3-on-surface-variant font-mono mt-1 font-semibold">Game Dev Exp</p>
        </div>
        <div className="p-4 rounded-[28px] bg-m3-tertiary-container/60 border border-m3-tertiary/30 shadow-xl backdrop-blur-md transition-all hover:scale-105">
          <p className="text-2xl sm:text-3xl font-black text-m3-tertiary font-mono tracking-tight">&lt;150ms</p>
          <p className="text-xs text-m3-on-surface-variant font-mono mt-1 font-semibold">Multiplayer Sync</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroText;
