import React, { useState } from "react";
import Project from "../components/Project";
import M3Carousel from "../components/M3Carousel";
import { myProjects, gameCategories } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Games");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' | 'grid' | 'list'
  const [preview, setPreview] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 14, stiffness: 70 });
  const springY = useSpring(y, { damping: 14, stiffness: 70 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  // Filter games based on category and search query
  const filteredProjects = myProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All Games" || project.category === selectedCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Calculate category count mapping
  const getCategoryCount = (cat) => {
    if (cat === "All Games") return myProjects.length;
    return myProjects.filter((p) => p.category === cat).length;
  };

  return (
    <section
      className="c-space section-spacing py-10"
      id="work"
      onMouseMove={handleMouseMove}
    >
      {/* Section Header with M3 Expressive Pill Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-m3-surface-low border border-m3-primary/30 text-m3-primary text-xs font-mono mb-3 shadow-md transition-colors duration-300">
            <span className="w-2 h-2 rounded-full bg-m3-primary animate-pulse" />
            <span>PLAYABLE WEBGL GAMES</span>
            <span>•</span>
            <span>{myProjects.length} Interactive Builds</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-m3-on-surface tracking-tight font-display transition-colors duration-300">
            Game Showcase & Demos
          </h2>
          <p className="text-m3-on-surface-variant text-sm md:text-base mt-2 max-w-2xl font-normal transition-colors duration-300">
            Explore 9 high-performance WebGL games, metaverse worlds, and casino experiences built with Unity 6, C#, Photon, and Web Workers.
          </p>
        </div>

        {/* View Mode Switcher & M3 Surface Search Input */}
        <div className="flex flex-wrap items-center gap-3">
          {/* M3 Surface Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search games, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2.5 pl-10 text-xs font-mono bg-m3-surface-low text-m3-on-surface placeholder-m3-on-surface-variant rounded-full border border-m3-outline-variant focus:border-m3-primary focus:ring-2 focus:ring-m3-primary/20 focus:outline-none w-48 sm:w-64 transition-all shadow-inner"
            />
            <span className="absolute left-3.5 top-3 text-m3-on-surface-variant text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-2.5 text-m3-on-surface-variant hover:text-m3-on-surface text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* M3 Segmented View Mode Buttons */}
          <div className="flex items-center p-1 bg-m3-surface-low border border-m3-outline-variant rounded-full transition-colors duration-300">
            <button
              onClick={() => setViewMode("carousel")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer m3-interactive ${
                viewMode === "carousel"
                  ? "bg-m3-primary text-m3-on-primary shadow-md"
                  : "text-m3-on-surface-variant hover:text-m3-on-surface"
              }`}
              title="M3 Carousel View"
            >
              🎠 Carousel
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer m3-interactive ${
                viewMode === "grid"
                  ? "bg-m3-primary text-m3-on-primary shadow-md"
                  : "text-m3-on-surface-variant hover:text-m3-on-surface"
              }`}
              title="Grid View"
            >
              田 Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer m3-interactive ${
                viewMode === "list"
                  ? "bg-m3-primary text-m3-on-primary shadow-md"
                  : "text-m3-on-surface-variant hover:text-m3-on-surface"
              }`}
              title="List View"
            >
              ≡ List
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Bar - M3 Expressive Tonal Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar mb-8 border-b border-m3-outline-variant transition-colors duration-300">
        {gameCategories.map((cat) => {
          const count = getCategoryCount(cat);
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 m3-interactive ${
                isActive
                  ? "bg-m3-primary text-m3-on-primary shadow-xl scale-105"
                  : "bg-m3-surface-low text-m3-on-surface-variant border border-m3-outline-variant hover:bg-m3-surface-container hover:text-m3-on-surface"
              }`}
            >
              {isActive && <span className="text-m3-on-primary font-black text-xs">✓</span>}
              <span>{cat}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? "bg-m3-on-primary text-m3-primary font-black"
                    : "bg-m3-surface-container text-m3-on-surface-variant"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Game Display (Carousel vs Grid vs List) */}
      {filteredProjects.length > 0 ? (
        viewMode === "carousel" ? (
          <M3Carousel projects={filteredProjects} setPreview={setPreview} />
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
                : "flex flex-col gap-5"
            }
          >
            {filteredProjects.map((project) => (
              <Project
                key={project.id}
                {...project}
                setPreview={setPreview}
                viewMode={viewMode}
              />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 bg-m3-surface-low rounded-[32px] border border-m3-outline-variant shadow-2xl transition-colors duration-300">
          <p className="text-3xl mb-2">🎮</p>
          <h3 className="text-lg font-bold text-m3-on-surface font-display mb-1">No Games Found</h3>
          <p className="text-sm text-m3-on-surface-variant mb-5">
            No games match your search "{searchQuery}" in "{selectedCategory}".
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All Games");
              setSearchQuery("");
            }}
            className="px-7 py-3 rounded-full bg-m3-primary text-m3-on-primary font-mono font-bold text-xs hover:brightness-110 cursor-pointer shadow-lg active:scale-95 transition-all m3-interactive"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Floating Image Cursor Preview */}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover rounded-2xl shadow-2xl border-2 border-m3-primary pointer-events-none w-72 h-44 backdrop-blur-md"
          src={preview}
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
        />
      )}
    </section>
  );
};

export default Projects;
