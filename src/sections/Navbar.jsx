import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ThemeToggle from "../components/ThemeToggle";
import { RESUME_URL } from "../constants";

const navLinks = [
  { name: "Home", href: "#home", icon: "🏠" },
  { name: "Games (9)", href: "#work", icon: "🎮" },
  { name: "About", href: "#about", icon: "👨‍💻" },
  { name: "Experience", href: "#experience", icon: "💼" },
  { name: "Contact", href: "#contact", icon: "✉️" },
];

function FloatingToolbar({ activeSection, onSelect }) {
  return (
    <ul className="flex flex-col md:flex-row items-center gap-1.5 bg-m3-surface-container/90 p-1.5 rounded-full border border-m3-outline-variant shadow-2xl backdrop-blur-2xl transition-colors duration-300">
      {navLinks.map((link) => {
        const isActive = activeSection === link.href.substring(1);
        return (
          <li key={link.name} className="w-full md:w-auto">
            <a
              href={link.href}
              onClick={() => onSelect && onSelect()}
              className={`relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-bold tracking-wide rounded-full transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-m3-primary text-m3-on-primary shadow-lg scale-105"
                  : "text-m3-on-surface-variant hover:text-m3-on-surface hover:bg-m3-surface-high/50"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 py-3 ${
        isScrolled ? "bg-m3-surface/90 backdrop-blur-xl border-b border-m3-outline-variant shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between px-5 py-2.5 rounded-full bg-m3-surface-low/90 border border-m3-outline-variant backdrop-blur-2xl shadow-2xl transition-colors duration-300">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-0.5 shadow-lg transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-[14px] bg-m3-surface flex items-center justify-center font-bold text-xs font-mono text-m3-primary transition-colors">
                ZK
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-m3-on-surface font-display group-hover:text-m3-primary transition-colors">
                Zeel Kheni
              </span>
              <span className="text-[10px] font-mono text-m3-primary font-semibold -mt-0.5">
                Lead Game Engineer & Consultant
              </span>
            </div>
          </a>

          {/* Navigation Floating Toolbar */}
          <nav className="hidden md:flex">
            <FloatingToolbar activeSection={activeSection} />
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="#work"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-m3-primary text-m3-on-primary font-black text-xs font-mono shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer tracking-wide"
            >
              <span>Play Games</span>
              <span className="text-sm">🎮</span>
            </a>

            {/* Resume Download Button */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="Zeel_Kheni_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-m3-secondary-container hover:bg-m3-secondary hover:text-m3-on-secondary text-m3-on-secondary-container font-mono font-bold text-xs shadow-lg active:scale-95 transition-all cursor-pointer border border-m3-secondary/40"
              title="Download Resume (PDF)"
            >
              <span>Resume</span>
              <span>📄</span>
            </a>

            {/* Material 3 Expressive Theme Switcher Toggle */}
            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer text-m3-on-surface hover:text-m3-primary focus:outline-none md:hidden p-2 rounded-full bg-m3-surface-high/50 border border-m3-outline-variant"
              aria-label="Toggle menu"
            >
              <span className="text-lg">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Toolbar Drawer */}
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center md:hidden mt-2 mx-4 p-4 rounded-[28px] bg-m3-surface-low/95 border border-m3-outline-variant shadow-2xl backdrop-blur-2xl transition-colors duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col gap-3">
            <FloatingToolbar activeSection={activeSection} onSelect={() => setIsOpen(false)} />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="Zeel_Kheni_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-m3-secondary-container text-m3-on-secondary-container font-mono font-bold text-xs border border-m3-secondary/40 shadow-md active:scale-95 transition-all"
            >
              <span>📄 Download Resume (PDF)</span>
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
