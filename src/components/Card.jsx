import { motion } from "motion/react";

const Card = ({ style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
      className="absolute w-12 h-12 p-2 rounded-2xl bg-[#152033]/90 border border-pink-400/40 shadow-lg cursor-grab object-contain backdrop-blur-md"
      src={image}
      style={style}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.8}
    />
  ) : (
    <motion.div
      className="absolute px-4 py-2 text-xs font-mono font-bold text-center rounded-full bg-[#152033] text-cyan-300 border border-cyan-400/30 shadow-lg shadow-black/40 cursor-grab backdrop-blur-md select-none whitespace-nowrap"
      style={style}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.8}
    >
      {text}
    </motion.div>
  );
};

export default Card;
