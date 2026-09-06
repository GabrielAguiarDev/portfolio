import { useEffect, useRef, useState, type CSSProperties } from "react"

import { animation } from "./config"
import { prefersReducedMotion } from "./runtime"

type RevealOptions = {
  /** Extra delay in seconds, e.g. the stagger index of a grid cell. */
  delay?: number
}

/**
 * Fade-and-rise reveal driven by a native IntersectionObserver and a CSS
 * transition — no animation library involved, so it works from the very first
 * paint and costs nothing in bundle size.
 *
 * Falls back to "already revealed" whenever motion is unwanted or unsupported,
 * so the content is never left invisible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  delay = 0,
}: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(
    () => !animation.enabled.reveal || prefersReducedMotion(),
  )

  useEffect(() => {
    if (revealed) return

    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      {
        threshold: animation.trigger.revealThreshold,
        rootMargin: animation.trigger.revealRootMargin,
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [revealed])

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}s` } : undefined

  return {
    ref,
    revealed,
    /** Spread onto the element you want to reveal. */
    revealProps: {
      ref,
      className: revealed ? "reveal is-revealed" : "reveal",
      style,
    },
  }
}

/** Stagger delay for the nth cell of a grid, capped by `delay.gridStepMax`. */
export function gridDelay(index: number): number {
  return Math.min(index * animation.delay.gridStep, animation.delay.gridStepMax)
}
