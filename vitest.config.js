import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Needed for DOM testing
    globals: true, // So you can use `test`, `expect` without importing
    setupFiles: "./src/setupTests.js", // Optional
  },
});
