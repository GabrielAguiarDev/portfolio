import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./texts/config.ts";
import { applyMotionVars, scheduleMotionRuntime } from "./animation";

// Sync the animation config onto CSS variables before the first paint, then
// queue the heavy motion libraries for after load.
applyMotionVars();
scheduleMotionRuntime();

createRoot(document.getElementById("root")!).render(<App />);
