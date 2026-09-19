import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const CRITICAL_VENDOR =
  /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|react-i18next|i18next|i18next-browser-languagedetector|@remix-run)[\\/]/;

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => (CRITICAL_VENDOR.test(id) ? "vendor" : undefined),
      },
    },
  },
});
