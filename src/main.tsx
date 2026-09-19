import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config.ts";
import { applyMotionVars, scheduleMotionRuntime } from "./animation";

applyMotionVars();
scheduleMotionRuntime();

createRoot(document.getElementById("root")!).render(<App />);
