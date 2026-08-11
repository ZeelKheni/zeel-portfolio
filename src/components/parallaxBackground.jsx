import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { getAssetUrl } from "../utils";

const ParallaxBackground = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 90 });

  const skyY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const mountain2Y = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const mountain3Y = useTransform(smoothProgress, [0, 1], ["0%", "45%"]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
    >
      <div className="relative w-full h-full">
        {/* Background Sky Layer */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundImage: `url(${getAssetUrl("assets/Hero/bg.jpg")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            y: skyY,
          }}
        />

        {/* Mountain Layer 2 (Horror Train Midground) */}
        <motion.div
          className="absolute inset-0 w-full h-full z-1"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            backgroundImage: `url(${getAssetUrl("assets/Hero/HorrorTrain_1.png")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            y: mountain2Y,
          }}
        />

        {/* Mountain Layer 1 (Horror Avatar Foreground) */}
        <motion.div
          className="absolute inset-0 w-full h-full z-2"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            backgroundImage: `url(${getAssetUrl("assets/Hero/HorrorAVATAR.png")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            y: mountain3Y,
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;
