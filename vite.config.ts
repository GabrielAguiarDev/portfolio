import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * The libraries already on the critical path — everything statically reachable
 * from main.tsx — pulled into one chunk of their own.
 *
 * Why a chunk at all: without this, React, the router and i18next are inlined
 * into the same `index-[hash].js` as every line of src/. That file's hash
 * changes on every commit, so editing one word of copy made every returning
 * visitor re-download React along with it. Split out, a deploy invalidates
 * only the app chunk and the vendor chunk keeps its hash until a dependency
 * version actually moves — held for a year by the immutable cache header in
 * vercel.json.
 *
 * Why ONE chunk and not one per library. Splitting these apart looks tidier
 * and does not work: `react-i18next` reads `React.createContext` at module
 * scope, and across a chunk boundary Rollup's CommonJS interop left it
 * evaluating before the React chunk had initialised. The built site threw
 * `Cannot read properties of undefined (reading 'createContext')` before
 * mounting and rendered a blank page — a failure `vite build` cannot see, as
 * it reports chunk sizes and exit code 0 either way. Libraries that touch each
 * other at module scope stay in one chunk.
 *
 * Why an allowlist and not `id.includes("node_modules")`. That catch-all is
 * the usual recipe and it is wrong here: GSAP, ScrollTrigger and Lenis are
 * deliberately NOT on the critical path — `src/animation/runtime.ts` imports
 * them dynamically after first paint — and a blanket rule hoists them into the
 * eager vendor chunk, taking initial JS from ~119kB to ~177kB gzip. Same for
 * the lucide icons belonging to the lazily-loaded project screens. Only what
 * is already eager is named here; the rest is left to Rollup, which is already
 * chunking it correctly.
 *
 * Changing this list means re-checking the built site in a browser, not just
 * reading the build output.
 */
const CRITICAL_VENDOR =
  /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|react-i18next|i18next|i18next-browser-languagedetector|@remix-run)[\\/]/;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
}));
