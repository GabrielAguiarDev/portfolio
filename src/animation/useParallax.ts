import { useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, type ResponsiveValue } from "./config"
import { loadMotionRuntime } from "./runtime"

/**
 * Scroll-linked parallax on a single element.
 *
 * The element travels `amount` pixels in total, centred on its natural
 * position, using `translate3d` only. Amplitude is smaller on mobile, and
 * GSAP's matchMedia re-runs the setup when the breakpoint is crossed.
 *
 * Until (and unless) the motion runtime loads, the element simply sits where
 * the layout put it — no placeholder transform, so nothing can shift.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(amount: ResponsiveValue) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!animation.enabled.parallax) return

    let disposed = false
    let cleanup: (() => void) | undefined

    loadMotionRuntime().then((runtime) => {
      const element = ref.current
      if (!runtime || disposed || !element) return

      const mm = runtime.gsap.matchMedia()

      mm.add(
        {
          isMobile: `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
          isDesktop: `(min-width: ${MOBILE_BREAKPOINT}px)`,
        },
        (context) => {
          const travel = context.conditions?.isMobile ? amount.mobile : amount.desktop

          runtime.gsap.fromTo(
            element,
            { y: -travel / 2 },
            {
              y: travel / 2,
              ease: animation.easing.scrub,
              force3D: true,
              scrollTrigger: {
                trigger: element,
                start: animation.trigger.parallaxStart,
                end: animation.trigger.parallaxEnd,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        },
      )

      cleanup = () => mm.revert()
    })

    return () => {
      disposed = true
      cleanup?.()
    }
    // `amount` comes from the frozen config object, so it is stable by construction.
  }, [])

  return ref
}
