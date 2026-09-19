import { useEffect, useRef, useState, type CSSProperties } from "react"

import { animation } from "./config"
import { prefersReducedMotion } from "./runtime"

type RevealOptions = {
  delay?: number
  hold?: boolean
}

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  delay = 0,
  hold = false,
}: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(
    () => !animation.enabled.reveal || prefersReducedMotion(),
  )

  useEffect(() => {
    if (revealed || hold) return

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
  }, [revealed, hold])

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}s` } : undefined

  return {
    ref,
    revealed,
    revealProps: {
      ref,
      className: revealed ? "reveal is-revealed" : "reveal",
      style,
    },
  }
}

export function gridDelay(index: number): number {
  return Math.min(index * animation.delay.gridStep, animation.delay.gridStepMax)
}
