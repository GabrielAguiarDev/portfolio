import { useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, type ResponsiveValue } from "./config"
import { loadMotionRuntime } from "./runtime"

type FloatOptions = {
  y: ResponsiveValue
  tilt?: ResponsiveValue
  rotate?: number
}

export function useFloat<T extends HTMLElement = HTMLDivElement>({
  y,
  tilt = animation.tilt.device,
  rotate = 0,
}: FloatOptions) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!animation.enabled.deviceFloat) return

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
          const isMobile = Boolean(context.conditions?.isMobile)
          const travel = isMobile ? y.mobile : y.desktop
          const lean = isMobile ? tilt.mobile : tilt.desktop

          runtime.gsap.fromTo(
            element,
            { y: -travel / 2, rotate: rotate - lean / 2 },
            {
              y: travel / 2,
              rotate: rotate + lean / 2,
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
  }, [rotate])

  return ref
}
