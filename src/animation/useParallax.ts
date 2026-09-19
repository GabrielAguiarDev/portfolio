import { useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, type ResponsiveValue } from "./config"
import { loadMotionRuntime } from "./runtime"

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
  }, [])

  return ref
}
