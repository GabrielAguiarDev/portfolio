import { animation, MOBILE_BREAKPOINT } from "./config"

/**
 * Mirrors the timing half of the animation config onto CSS custom properties,
 * so CSS-driven reveals and GSAP-driven motion read from the same source.
 *
 * Called from main.tsx before React renders, i.e. before first paint, so the
 * values are in place for the very first reveal.
 */
export function applyMotionVars(root: HTMLElement = document.documentElement) {
  const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches

  const vars: Record<string, string> = {
    "--motion-reveal-duration": `${animation.duration.reveal}s`,
    "--motion-reveal-delay": `${animation.delay.reveal}s`,
    "--motion-reveal-ease": animation.easing.reveal,
    "--motion-reveal-distance": `${
      isMobile ? animation.distance.reveal.mobile : animation.distance.reveal.desktop
    }px`,
    "--motion-heading-duration": `${animation.duration.heading}s`,
    "--motion-heading-ease": animation.easing.heading,
  }

  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value)
  }
}
