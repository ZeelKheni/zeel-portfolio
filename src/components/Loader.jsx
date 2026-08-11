import { Html, useProgress } from "@react-three/drei";
import M3CircularProgress from "./M3CircularProgress";

const Loader = () => {
  const { progress } = useProgress();
  const roundedProgress = Math.round(progress);

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-[28px] bg-[#0f172a]/95 border border-cyan-500/30 shadow-2xl backdrop-blur-xl text-white min-w-[200px]">
        <M3CircularProgress progress={roundedProgress} size={72} strokeWidth={6} />
        <span className="mt-4 font-mono font-bold text-xs text-cyan-300 tracking-wider">
          LOADING 3D WORLD
        </span>
        <span className="text-[10px] text-slate-400 font-mono mt-1">
          {roundedProgress}%
        </span>
      </div>
    </Html>
  );
};

export default Loader;
