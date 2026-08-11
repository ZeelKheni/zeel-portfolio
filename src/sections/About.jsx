import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import { RESUME_URL, education } from "../constants";

const About = () => {
  const grid2Container = useRef();
  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return (
    <section className="c-space section-spacing" id="about">
      {/* Section Header with M3 Expressive Containment Badge */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-m3-surface-low border border-m3-primary/30 text-m3-primary text-xs font-mono mb-3 shadow-md transition-colors duration-300">
          <span>💡 DEVELOPER PROFILE</span>
          <span>•</span>
          <span>6+ Years Experience</span>
        </div>
        <h2 className="text-heading">About Me & Craft</h2>
        <p className="subtext mt-2 max-w-xl font-normal">
          Lead Game Engineer & Technical Consultant crafting production-grade Unity & UE5 titles with low-latency multiplayer sync and optimized C# / C++ architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[19rem]">
        {/* Grid 1 - Primary Surface Container Card */}
        <div className="flex items-end grid-default-color grid-1 m3-interactive">
          <img
            src={`${cleanBase}assets/coding-pov.png`}
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] opacity-90"
            alt="coding pov"
          />
          <div className="z-10 bg-m3-surface-low/90 p-5 rounded-[24px] border border-m3-outline-variant backdrop-blur-xl transition-colors duration-300">
            <p className="headtext">Hi, I'm Zeel Kheni</p>
            <p className="subtext mt-1">
              With 6+ years of experience across Unity and Unreal Engine 5, I build high-performance WebGL titles, multiplayer metaverse platforms, and custom gameplay systems.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-m3-surface-low/80" />
        </div>

        {/* Grid 2 - Interactive Craft Badges Container */}
        <div className="grid-default-color grid-2 m3-interactive">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full select-none relative"
          >
            <p className="flex items-end text-3xl sm:text-4xl font-black text-m3-on-surface/20 font-display tracking-widest transition-colors duration-300">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "15deg", top: "25%", left: "18%" }}
              text="Photon Fusion"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-10deg", top: "58%", left: "42%" }}
              text="Unreal Engine 5"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "12deg", bottom: "25%", left: "68%" }}
              text="SOLID Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-15deg", top: "50%", left: "2%" }}
              text="WebGL Asset Streaming"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "8deg", top: "12%", left: "38%" }}
              text="Zenject / Extenject"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-8deg", top: "62%", left: "28%" }}
              text="MetaHuman & VR"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "15deg", top: "65%", left: "75%" }}
              image={`${cleanBase}assets/logos/csharp-pink.png`}
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-20deg", top: "68%", left: "20%" }}
              image={`${cleanBase}assets/logos/dotnet-pink.png`}
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-15deg", top: "8%", left: "8%" }}
              image={`${cleanBase}assets/logos/blazor-pink.png`}
              containerRef={grid2Container}
            />
          </div>
        </div>

        {/* Grid 3 - Timezone Secondary Container */}
        <div className="grid-black-color grid-3 m3-interactive">
          <div className="z-10 w-[55%]">
            <span className="px-3.5 py-1 rounded-full bg-m3-secondary-container/90 text-m3-on-secondary-container text-[10px] font-mono border border-m3-secondary/40 font-bold shadow-md transition-colors duration-300">
              UTC +5:30 IST
            </span>
            <p className="headtext mt-2">Timezone & Remote</p>
            <p className="subtext mt-1">
              Based in India, highly adaptable to global timezones, and open for remote roles worldwide.
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>

        {/* Grid 4 - Start a Project Tertiary Container with Resume Download */}
        <div className="grid-special-color grid-4 m3-interactive flex flex-col justify-between p-6">
          <div className="flex flex-col items-center justify-center gap-3 size-full text-center">
            <p className="headtext font-display text-lg">
              Want to build an awesome game or WebGL project together?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              <CopyEmailButton />
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="Zeel_Kheni_Resume.pdf"
                className="px-4 py-2 rounded-full bg-m3-surface-low hover:bg-m3-primary hover:text-m3-on-primary text-m3-on-surface font-mono font-bold text-xs border border-m3-outline-variant shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Download CV"
              >
                <span>📄 CV PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Grid 5 - Tech Stack Container */}
        <div className="grid-default-color grid-5 m3-interactive">
          <div className="z-10 w-[50%]">
            <span className="px-3.5 py-1 rounded-full bg-m3-primary-container/90 text-m3-on-primary-container text-[10px] font-mono border border-m3-primary/40 font-bold shadow-md transition-colors duration-300">
              FRAMEWORKS & ENGINES
            </span>
            <p className="headtext mt-2">Core Tech Stack</p>
            <p className="subtext mt-1">
              Specialized in Unity 6, Unreal Engine 5, C#, C++, Photon Fusion, URP/Lumen rendering, and WebGL asset pipelines.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
