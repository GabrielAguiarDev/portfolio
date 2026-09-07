import { useEffect, useRef, useState } from "react"

import { animation } from "./config"
import { prefersReducedMotion } from "./runtime"

/**
 * Counts a figure up from zero the first time it enters the viewport.
 *
 * Runs on rAF rather than through GSAP so an impact figure animates even
 * before the motion runtime has finished loading — these sit high enough on
 * the page that waiting for the chunk would mean missing the moment.
 *
 * With reduced motion it returns the final value immediately.
 */
export function useCounter(target: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const skip = !animation.enabled.counters || prefersReducedMotion()
  const [value, setValue] = useState(() => (skip ? target : 0))

  useEffect(() => {
    if (skip) {
      setValue(target)
      return
    }

    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") {
      setValue(target)
      return
    }

    let frame = 0
    let start = 0

    const duration = Math.min(
      Math.max(Math.abs(target) * animation.counter.msPerUnit, animation.counter.minDurationMs),
      animation.counter.maxDurationMs,
    )

    const step = (now: number) => {
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(animation.counter.ease(progress) * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target, skip])

  return { ref, value }
}
