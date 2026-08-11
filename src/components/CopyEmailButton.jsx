import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import M3CircularProgress from "./M3CircularProgress";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "Khenizeel87@gmail.com";

  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-7 py-4 text-xs font-mono font-black rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-xl shadow-cyan-400/30 cursor-pointer overflow-hidden inline-flex items-center justify-center min-w-[14rem] tracking-wide m3-interactive"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <M3CircularProgress progress={100} size={18} strokeWidth={2.5} showGlow={false} />
            <span>Email Copied!</span>
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <img src={`${cleanBase}assets/copy.svg`} className="w-4 h-4" alt="copy" />
            <span>Copy Email Address</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
