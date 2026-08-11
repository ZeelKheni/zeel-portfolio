import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "brotli-headers",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith(".br")) {
            res.setHeader("Content-Encoding", "br");
            if (req.url.endsWith(".wasm.br")) {
              res.setHeader("Content-Type", "application/wasm");
            } else if (req.url.endsWith(".js.br") || req.url.endsWith(".framework.js.br")) {
              res.setHeader("Content-Type", "application/javascript");
            } else if (req.url.endsWith(".data.br")) {
              res.setHeader("Content-Type", "application/octet-stream");
            }
          }
          next();
        });
      },
    },
  ],
  base: "/zeel-portfolio",
});
