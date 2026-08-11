import { mySocials, RESUME_URL } from "../constants";
import { getAssetUrl } from "../utils";

const Footer = () => {
  return (
    <footer className="w-full bg-m3-surface-low border-t border-m3-outline-variant py-10 mt-28 relative transition-colors duration-300" id="contact">
      <div className="c-space max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-sm text-m3-on-surface-variant">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-m3-surface flex items-center justify-center font-bold text-[10px] font-mono text-m3-primary transition-colors">
              ZK
            </div>
          </div>
          <p className="font-mono text-xs text-m3-on-surface-variant">
            © {new Date().getFullYear()} Zeel Kheni. All rights reserved. • Lead Game Engineer & Consultant
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="Zeel_Kheni_Resume.pdf"
            className="px-4 py-2 rounded-full bg-m3-primary text-m3-on-primary border border-m3-primary/40 active:scale-95 transition-all flex items-center gap-2 text-xs font-mono font-bold shadow-md hover:brightness-110 cursor-pointer m3-interactive"
            title="Download Resume (PDF)"
          >
            <span>📄 Download Resume</span>
          </a>

          {mySocials.map((social, index) => (
            <a
              href={social.href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-m3-surface-container hover:bg-m3-primary hover:text-m3-on-primary border border-m3-outline-variant text-m3-on-surface active:scale-95 transition-all flex items-center gap-2 text-xs font-mono font-bold shadow-sm m3-interactive"
            >
              <img src={getAssetUrl(social.icon)} className="w-4 h-4 rounded" alt={social.name} />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
