import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base path lets the build work on github pages under a repo folder.
// set deploy_base to "/repo-name/" in ci, otherwise it stays at root.
const base = process.env.DEPLOY_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
