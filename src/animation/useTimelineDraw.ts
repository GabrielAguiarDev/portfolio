import { useEffect, useRef } from "react"

import { animation } from "./config"
import { loadMotionRuntime } from "./runtime"

/**
 * Draws the experience timeline's rail as the section scrolls past.
 *
 * The rail is laid out at full height and full opacity, then scaled down to
 * zero by GSAP the moment the runtime is ready and scrubbed back up. That
 * order matters: if the runtime never loads, the rail is simply there.
 */
export function useTimelineDraw<
  Container extends HTMLElement = HTMLDivElement,
  Rail extends HTMLElement = HTMLDivElement,
>() {
  const containerRef = useRef<Container>(null)
  const railRef = useRef<Rail>(null)

  useEffect(() => {
    if (!animation.enabled.timelineDraw) return

    let disposed = false
    let cleanup: (() => void) | undefined

    loadMotionRuntime().then((runtime) => {
      const container = containerRef.current
      const rail = railRef.current
      if (!runtime || disposed || !container || !rail) return

      const context = runtime.gsap.context(() => {
        runtime.gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: animation.easing.scrub,
            force3D: true,
            scrollTrigger: {
              trigger: container,
              start: animation.trigger.timelineStart,
              end: animation.trigger.timelineEnd,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      }, container)

      cleanup = () => context.revert()
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return { containerRef, railRef }
}
