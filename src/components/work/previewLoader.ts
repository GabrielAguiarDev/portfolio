import { prefersReducedMotion } from "@/animation"

import PreviewSkeleton from "./PreviewSkeleton"

export const loadPreviewFigures = () =>
  import("./previewFigures").catch(() => ({ default: PreviewSkeleton }))

export const prefetchPreview = () => {
  if (prefersReducedMotion()) return
  if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return
  void loadPreviewFigures()
}
