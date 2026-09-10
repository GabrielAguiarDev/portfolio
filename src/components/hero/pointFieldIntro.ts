import { animation, MOBILE_BREAKPOINT, prefersReducedMotion } from "@/animation"

/**
 * Whether the point field's assemble-on-load entrance is going to play.
 *
 * Its own module because two components have to agree on it: the field runs
 * the entrance, and the hero holds its copy back for it — one render earlier,
 * before the canvas exists. Both take the decision from the same inputs here
 * rather than passing a flag between them, which could only ever be a second
 * source of truth to keep in step.
 *
 * See the note on `pointField.intro` in the animation config.
 */
export function pointFieldIntroPlays(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false
  if (!animation.enabled.pointField || prefersReducedMotion()) return false

  const intro = animation.pointField.intro
  const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
  if (!intro.play[isMobile ? "mobile" : "desktop"]) return false

  // A page opened into a background tab runs no frames at all: the draw loop
  // is paused until the tab is looked at. The entrance would then start from
  // scratch minutes later, behind copy that had long since arrived — so it is
  // dropped here instead, deliberately, rather than played out of order.
  if (document.hidden) return false

  // Only for a visitor who actually arrived at the top of the page. A restored
  // scroll position lands mid-document with the hero already behind the fold:
  // there is nothing there worth assembling, and holding the copy back for it
  // would hold it back for a screen nobody is looking at.
  return window.scrollY < intro.topThresholdPx
}
