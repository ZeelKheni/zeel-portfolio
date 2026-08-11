export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  // Strip leading slash or prefix if already present
  let cleanPath = path;
  if (cleanPath.startsWith("/zeel-portfolio/")) {
    cleanPath = cleanPath.replace("/zeel-portfolio/", "");
  } else if (cleanPath.startsWith("/")) {
    cleanPath = cleanPath.slice(1);
  }

  return `${cleanBase}${cleanPath}`;
};
