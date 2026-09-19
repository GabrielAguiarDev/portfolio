import { animation, MOBILE_BREAKPOINT, prefersReducedMotion } from "@/animation"

export function pointFieldIntroPlays(): boolean {
  return introRuns("play")
}

export function pointFieldIntroHoldsCopy(): boolean {
  return introRuns("holdCopy")
}

function introRuns(dial: "play" | "holdCopy"): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false
  if (!animation.enabled.pointField || prefersReducedMotion()) return false

  const intro = animation.pointField.intro
  const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
  const breakpoint = isMobile ? "mobile" : "desktop"

  if (!intro.play[breakpoint]) return false
  if (!intro[dial][breakpoint]) return false

  if (document.hidden) return false

  return window.scrollY < intro.topThresholdPx
}
