import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    test: {
    environment: "jsdom",                
    setupFiles: "./src/setupTests.ts",    // auto-loaded before tests
    globals: true,                        // use test()/expect() without imports
    css: true,                            // allow importing CSS in components
    },
}));

