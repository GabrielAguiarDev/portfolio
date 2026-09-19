import { animation, MOBILE_BREAKPOINT } from "./config"

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
