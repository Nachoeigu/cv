import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" works for both user.github.io and user.github.io/repo
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
    hmr: { clientPort: Number(process.env.CBX_HMR_CLIENT_PORT || 5173) },
  },
});
