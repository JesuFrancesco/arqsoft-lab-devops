/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/arqsoft-lab-devops/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vite-env.d.ts",
  },
});
