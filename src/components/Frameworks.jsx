import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  const skills = [
    "auth0",
    "github",
    "csharp",
    "dotnet",
    "dotnetcore",
    "git",
    "html5",
    "microsoft",
    "Miror",
    "oculous",
    "playfab",
    "proc",
    "vs"
  ];

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`${cleanBase}assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.slice().reverse().map((skill, index) => (
          <Icon key={index} src={`${cleanBase}assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" alt="tech logo" />
);
