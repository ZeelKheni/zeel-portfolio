export const gameCategories = [
  "All Games",
  "3D & Racing",
  "Action & Survival",
  "Metaverse & Multiplayer",
  "Casino & Cards",
  "Puzzle"
];

export const myProjects = [
  {
    id: "arrow",
    title: "Arrow",
    category: "Puzzle",
    orientation: "portrait",
    description:
      "A high-speed precision reaction game built with compressed Unity WebGL. Players navigate speeding arrow hazards through tightening corridors with frame-perfect input response.",
    subDescription: [
      "Frame-perfect input latency for ultra-responsive control.",
      "Compressed Unity WebGL build for low-bandwidth environments.",
      "Dynamic obstacle generation and speed scaling.",
      "Clean WebWorker preloader for sub-second restart times."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Arrow.png",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Arrow/Build",
    appName: "Arrow",
    isCompressed: true,
    width: "100%",
    height: "100%",
    controls: [
      { key: "Space / Tap", action: "Dodge / Pivot Direction" },
      { key: "Esc", action: "Pause Game" }
    ],
    tags: [
      {
        id: 1,
        name: "Unity 6",
        path: "/zeel-portfolio/assets/logos/unity6.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "WebGL",
        path: "/zeel-portfolio/assets/logos/vs.svg",
      },
    ],
  },
  {
    id: "dopatti",
    title: "Do Patti Casino Showdown",
    category: "Casino & Cards",
    orientation: "landscape",
    description:
      "A traditional two-card betting game engineered with low-latency card drawing state machines, secure RNG calculation, and smooth table UI animations.",
    subDescription: [
      "Modular state machine for rapid, fair card draws.",
      "Smooth UI micro-animations optimized for mobile and desktop web.",
      "Lightweight memory footprint preventing crashes or frame drops.",
      "Real-time win/loss calculation engine."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Do_Patti.png",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/DoPatti/Build",
    appName: "DoPatti",
    width: "100%",
    height: "100%",
    controls: [
      { key: "Mouse / Tap", action: "Select Card / Place Bet" }
    ],
    tags: [
      {
        id: 1,
        name: "Unity 6",
        path: "/zeel-portfolio/assets/logos/unity6.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "Casino Logic",
        path: "/zeel-portfolio/assets/logos/dotnet.svg",
      },
    ],
  },
  {
    id: "race3d",
    title: "Parkore Race 3D",
    category: "3D & Racing",
    orientation: "portrait",
    description:
      "High-octane 3D racing simulator featuring custom vehicle physics, dynamic camera tracking, physics-driven obstacle courses, and nitro boosts.",
    subDescription: [
      "Custom wheel collider and torque physics system.",
      "Dynamic camera tracking with smooth dampening.",
      "Optimized URP shaders for high FPS WebGL rendering.",
      "Obstacle courses and time-attack leaderboard modes."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/ParkoreRace.png",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Race 3D/Build",
    appName: "Race 3D",
    width: "100%",
    height: "100%",
    controls: [
      { key: "W / Up Arrow", action: "Accelerate Vehicle" },
      { key: "S / Down Arrow", action: "Brake / Reverse" },
      { key: "A / D or Left / Right", action: "Steer Left / Right" },
      { key: "Space", action: "Handbrake / Drift" }
    ],
    tags: [
      {
        id: 1,
        name: "Unity 6",
        path: "/zeel-portfolio/assets/logos/unity6.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "URP 3D",
        path: "/zeel-portfolio/assets/logos/vs.svg",
      },
    ],
  },
  {
    id: "tsunami",
    title: "Tsunami Escape Runner",
    category: "Action & Survival",
    orientation: "portrait",
    description:
      "A thrilling endless escape runner where players outrun a colossal tsunami wave through procedurally generated obstacle terrain with dynamic water shaders.",
    subDescription: [
      "Procedural track chunk generator with zero garbage allocation.",
      "Dynamic vertex-based ocean wave shader.",
      "Addressables asset streaming for lightweight initial download.",
      "Responsive touch and keyboard parkour controls."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/TsunamiEscape.png",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Tsunami Escape/Build",
    appName: "Tsunami Escape",
    streamingUrl: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Tsunami Escape/StreamingAssets",
    width: "100%",
    height: "100%",
    controls: [
      { key: "WASD / Arrows", action: "Run & Dodge Obstacles" },
      { key: "Space", action: "Jump Over Debris" }
    ],
    tags: [
      {
        id: 1,
        name: "Unity 6",
        path: "/zeel-portfolio/assets/logos/unity6.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "Addressables",
        path: "/zeel-portfolio/assets/logos/vs.svg",
      },
    ],
  },
  {
    id: "stickman",
    title: "Stickman Race",
    category: "3D & Racing",
    orientation: "portrait",
    description:
      "Fast-paced stickman parkour racing challenge featuring active ragdoll physics, obstacle climbing, momentum mechanics, and wall running.",
    subDescription: [
      "Active ragdoll physics and dynamic animation blending.",
      "Obstacle vaulting, sliding, and wall-run mechanics.",
      "Lightweight collision detection optimized for WebGL.",
      "Multiple AI opponents with procedural navigation mesh paths."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/StickmanRace.png",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/stickManRace/Build",
    appName: "stickManRace",
    width: "100%",
    height: "100%",
    controls: [
      { key: "WASD / Arrows", action: "Move Character" },
      { key: "Space", action: "Jump & Wall Run" }
    ],
    tags: [
      {
        id: 1,
        name: "Unity 6",
        path: "/zeel-portfolio/assets/logos/unity6.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "Physics Engine",
        path: "/zeel-portfolio/assets/logos/vs.svg",
      },
    ],
  },
  {
    id: "vaikunth",
    title: "Vaikunth Metaverse",
    category: "Metaverse & Multiplayer",
    orientation: "landscape",
    description:
      "A real-time multiplayer metaverse built with Unity, powered by Photon for fast and reliable networking, and Addressables for dynamic content streaming. Players explore persistent worlds, customize avatars, socialize, and interact across modular environments.",
    subDescription: [
      "Photon networking for real-time multiplayer sync.",
      "Addressables for dynamic asset streaming.",
      "Additive scenes for seamless world loading.",
      "Synced avatars with stable cross-device performance.",
      "Optimized systems for scalable metaverse expansion."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/vaikunth.png",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Vaikunth/Build",
    streamingUrl: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Vaikunth/StreamingAssets",
    appName: "Vaikunth",
    width: "100%",
    height: "100%",
    controls: [
      { key: "WASD", action: "Move Avatar" },
      { key: "Mouse", action: "Rotate Camera" },
      { key: "Space", action: "Jump" },
      { key: "Enter", action: "Multiplayer Chat" }
    ],
    tags: [
      {
        id: 1,
        name: "NodeJs",
        path: "/zeel-portfolio/assets/logos/nodejs-1-logo-svgrepo-com.svg",
      },
      {
        id: 2,
        name: "Visual Studio",
        path: "/zeel-portfolio/assets/logos/vs.svg",
      },
      {
        id: 3,
        name: "GitHub",
        path: "/zeel-portfolio/assets/logos/github-octocat-svgrepo-com.svg",
      },
      {
        id: 4,
        name: "Unity 6",
        path: "/zeel-portfolio/assets/logos/unity6.svg",
      },
      {
        id: 5,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
    ],
  },
  {
    id: "dubai",
    title: "MetaVerse Dubai",
    category: "Metaverse & Multiplayer",
    orientation: "landscape",
    description:
      "A fully interactive metaverse experience where players explore connected worlds, customize avatars, and engage with dynamic environments.",
    subDescription: [
      "Built with Unity’s modular architecture for smooth world exploration.",
      "Addressables used for streaming large environments efficiently.",
      "Additive scene loading enables seamless open-world transitions.",
      "Optimized lighting, shaders, and assets for stable performance.",
      "Designed for offline and single-player metaverse experiences."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/dubai.jpg",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Multiverse Dubai/Build",
    appName: "Multiverse Dubai",
    width: "100%",
    height: "100%",
    controls: [
      { key: "WASD", action: "Explore Environment" },
      { key: "Mouse", action: "Camera Orbit" }
    ],
    tags: [
      {
        id: 1,
        name: "Unity 6",
        path: "/zeel-portfolio/assets/logos/unity6.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "Git",
        path: "/zeel-portfolio/assets/logos/github-octocat-svgrepo-com.svg",
      },
    ],
  },
  {
    id: "anderbhar",
    title: "Gambling Game Ander Bhar",
    category: "Casino & Cards",
    orientation: "landscape",
    description:
      "Ander Bhar is a fast, lightweight Unity-based card betting game built for quick rounds, smooth performance, and an engaging player loop.",
    subDescription: [
      "Modular Unity logic for fast, fair card draws.",
      "Secure RNG ensures unbiased outcomes.",
      "Smooth UI and animations optimized for all devices.",
      "Lightweight state machine for stable round flow.",
      "Low memory usage prevents crashes or lag."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/anderbhar.jpg",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Ander Bhar/Build",
    appName: "Ander Bhar",
    width: "100%",
    height: "100%",
    controls: [
      { key: "Mouse Click", action: "Betting Actions & Card Flip" }
    ],
    tags: [
      {
        id: 1,
        name: "C#",
        path: "/zeel-portfolio/assets/logos/csharp.svg",
      },
      {
        id: 2,
        name: ".Net",
        path: "/zeel-portfolio/assets/logos/dotnet.svg",
      },
      {
        id: 3,
        name: "NodeJs",
        path: "/zeel-portfolio/assets/logos/nodejs-1-logo-svgrepo-com.svg",
      },
    ],
  },
  {
    id: "linecrash",
    title: "Line Crash Reaction Runner",
    category: "Action & Survival",
    orientation: "portrait",
    description:
      "LINE CRASH is a fast-paced reaction and precision game built in Unity, where players navigate a speeding line through dynamic obstacles.",
    subDescription: [
      "Ultra-responsive controls built for fast reactions.",
      "Precise collision detection for accurate gameplay.",
      "Optimized movement system with zero input delay.",
      "Dynamic obstacle generation for endless runs.",
      "Lightweight design ensuring crash-free performance."
    ],
    href: "",
    logo: "",
    image: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/linecrash.png",
    URL: "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/LineCrash/Build",
    appName: "LineCrash",
    width: "100%",
    height: "100%",
    controls: [
      { key: "Space / Click", action: "Pivot Direction" }
    ],
    tags: [
      {
        id: 1,
        name: "NodeJs",
        path: "/zeel-portfolio/assets/logos/nodejs-1-logo-svgrepo-com.svg",
      },
      {
        id: 2,
        name: "Visual Studio",
        path: "/zeel-portfolio/assets/logos/vs.svg",
      },
      {
        id: 3,
        name: "GitHub",
        path: "/zeel-portfolio/assets/logos/github-octocat-svgrepo-com.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/+917433037910",
    icon: "/zeel-portfolio/assets/socials/whatsApp.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/zeel-kheni/",
    icon: "/zeel-portfolio/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/the_kheni_zeel/",
    icon: "/zeel-portfolio/assets/socials/instagram.svg",
  },
];

export const RESUME_URL = "https://pub-62b37c6b4e274edf9d0707b11b89ca50.r2.dev/projects/Zeel%20Resume.pdf";
export const LOCAL_RESUME_PATH = "/Zeel Resume.pdf";

export const personalInfo = {
  name: "Zeel Kheni",
  role: "Lead Game Engineer & Technical Consultant",
  experienceYears: "6+",
  location: "Surat, Gujarat, India",
  email: "khenizeel87@gmail.com",
  phone: "+91-7433037910",
  linkedin: "https://www.linkedin.com/in/zeel-kheni/",
  portfolio: "https://zeelkheni.dev",
  summary:
    "Game developer with 6+ years of experience across Unity and Unreal Engine 5, spanning mobile, multiplayer, VR, and WebGL titles. Comfortable owning features end-to-end, from technical design through optimization and release. Core strengths include performance optimization on resource-constrained hardware (iOS & Android), multiplayer networking (Photon Fusion & UE5 Dedicated Servers), and applying SOLID principles and dependency injection (Zenject/Extenject).",
};

export const education = [
  {
    degree: "Bachelor of Engineering, Information Technology",
    institution: "Gujarat Technological University",
    year: "2022",
  },
  {
    degree: "Diploma, Information Technology",
    institution: "Gujarat Technological University",
    year: "2019",
  },
];

export const coreSkills = [
  {
    category: "Game Engines",
    skills: ["Unity (Expert)", "Unreal Engine 4/5 (Advanced)"],
  },
  {
    category: "Programming & Architecture",
    skills: ["C#", "C++", "Blueprints", "HLSL", "JavaScript", "OOP & SOLID", "Zenject / Extenject"],
  },
  {
    category: "Multiplayer & Networking",
    skills: ["Photon Fusion", "Photon PUN", "Mirror", "UE Dedicated Servers", "Lag Compensation"],
  },
  {
    category: "Graphics & Rendering",
    skills: ["URP & HDRP", "Lumen & Nanite", "Shader Graph", "Niagara", "Occlusion Culling"],
  },
  {
    category: "Gameplay & Feel",
    skills: ["Gameplay Ability System (GAS)", "Finite State Machines", "Object Pooling", "Audio/Rhythm-Sync"],
  },
  {
    category: "Platforms & DevOps",
    skills: ["WebGL & WebWorkers", "iOS & Android", "VR/XR Interaction", "Git & GitHub Actions", "AI-Assisted Tools"],
  },
];

export const experiences = [
  {
    title: "Lead Game Engineer & Technical Consultant",
    job: "Freelance",
    location: "Remote",
    date: "Dec 2025 – Present",
    tags: ["Unreal Engine 5", "Unity 6", "Photon Fusion", "YouTube Playables", "Zenject", "Node.js", "iOS & Android"],
    contents: [
      "Take end-to-end ownership of complex gameplay and multiplayer features across UE5 and Unity client projects, from technical design through implementation, optimization, and release.",
      "Architect scalable multiplayer systems using Photon Fusion and UE5 dedicated servers, with lag compensation and client-server state disagreement as core recurring technical challenges.",
      "Apply SOLID principles and dependency injection patterns (Zenject/Extenject) to build modular, maintainable gameplay architecture for digital twin and metaverse client projects, including MetaHuman integration for runtime believability.",
      "Delivered Snap Orbit (Unity WebGL) for YouTube Playables, engineering aggressive asset streaming to hit sub-5-second load times on mobile browsers.",
      "Extend delivery to iOS builds alongside Android, optimizing performance and memory usage for Apple hardware as part of cross-platform mobile delivery.",
      "Use AI-assisted tools as part of the regular build and iteration workflow, from prototyping through debugging.",
      "Own game server infrastructure (Node.js, MongoDB, Oracle Cloud/Ubuntu), balancing uptime with cost efficiency.",
      "Built custom Unity and UE5 editor tools that measurably reduced artist time spent on asset ingestion and lighting bakes."
    ],
  },
  {
    title: "Senior Unity Developer",
    job: "Noborder.z Innovations",
    location: "Indore, India",
    date: "Jun 2024 – Dec 2025",
    tags: ["Unreal Engine 5", "Nanite & Lumen", "C++ & Blueprints", "Unity WebGL", "XR Interaction Toolkit"],
    contents: [
      "Led migration of core metaverse platform architecture from Unity to Unreal Engine 5, leveraging Nanite and Lumen to significantly improve visual fidelity.",
      "Designed and implemented multiplayer logic for amusement park ride systems in UE5 (C++, Blueprints), solving multi-client physics synchronization through iterative architectural refinement.",
      "Diagnosed and resolved slow WebGL first-load performance by restructuring Addressables and deferring upfront asset loading, cutting load times by 30%.",
      "Built VR systems using the XR Interaction Toolkit, profiling and optimizing the render pipeline to hold performance across varied hardware."
    ],
  },
  {
    title: "Senior Unity Developer",
    job: "Technomancy Private Limited",
    location: "Indore, India",
    date: "Oct 2022 – Jun 2024",
    tags: ["Unity 3D", "Photon Networking", "Moralis Web3", "URP Shaders", "CI/CD Pipelines"],
    contents: [
      "Architected the multiplayer backbone for Stardust Metaverse on Photon, engineering persistent session state management under continuous player join/leave activity.",
      "Resolved recurring desync issues by reworking RPC batching and interpolation logic, measurably improving stability and reducing user complaints.",
      "Integrated Web3 functionality (Moralis, ChainSafe): wallet authentication, NFT rendering, contract event listeners, closing the gap between demo and production reliability.",
      "Developed custom URP shaders and lighting pipelines, maintaining performance through continuous profiling.",
      "Implemented GitHub Actions and Jenkins CI/CD pipelines, automating builds and reducing manual sprint overhead."
    ],
  },
  {
    title: "Senior Unity Developer",
    job: "InfoOyster Technologies",
    location: "Bhavnagar, India",
    date: "Jun 2022 – Oct 2022",
    tags: ["Photon & Mirror", "Smart Contracts", "RenderDoc", "Unity Profiler"],
    contents: [
      "Built a hybrid Photon/Mirror multiplayer pipeline, reducing sync conflicts by approximately 30%.",
      "Implemented blockchain wallet login and smart contract support for a decentralized game client.",
      "Used Unity Profiler and RenderDoc to isolate and resolve CPU spikes, converting vague frame-timing complaints into fixable, documented issues."
    ],
  },
  {
    title: "Unity Developer",
    job: "InfoOyster Technologies",
    location: "Bhavnagar, India",
    date: "Mar 2021 – Jun 2022",
    tags: ["Object Pooling", "Finite State Machines", "Memory Optimization", "C# Architecture"],
    contents: [
      "Rebuilt the character controller and customization system using object pooling, improving runtime performance by approximately 50%.",
      "Reduced memory usage by 20% through deliberate scene and asset lifecycle management.",
      "Rewrote animation logic with finite state machines (FSMs) and Animator state machines, simplifying multiplayer edge-case handling through predictable state transitions."
    ],
  },
  {
    title: "Unity Developer",
    job: "Freelance",
    location: "Surat, India",
    date: "May 2020 – Mar 2021",
    tags: ["Android Delivery", "ProBuilder 3D", "UI & Animation", "Low-Poly Optimization"],
    contents: [
      "Independently built and shipped Android games end-to-end (UI, animation, gameplay), maintaining a 99% crash-free rate across releases.",
      "Built and optimized 3D environments in ProBuilder for mobile GPU constraints, prioritizing draw-call reduction over polygon count."
    ],
  }
];

export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://robohash.org/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://robohash.org/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://robohash.org/john",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "This is hands down the best thing I've experienced. Highly recommend!",
    img: "https://robohash.org/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Incredible work! The attention to detail is phenomenal.",
    img: "https://robohash.org/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "This exceeded all my expectations. Absolutely stunning!",
    img: "https://robohash.org/charlie",
  },
  {
    name: "Dave",
    username: "@dave",
    body: "Simply breathtaking. The best decision I've made in a while.",
    img: "https://robohash.org/dave",
  },
  {
    name: "Eve",
    username: "@eve",
    body: "So glad I found this. It has changed the game for me.",
    img: "https://robohash.org/eve",
  },
];
