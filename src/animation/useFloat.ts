import { useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, type ResponsiveValue } from "./config"
import { loadMotionRuntime } from "./runtime"

type FloatOptions = {
  /** Total vertical travel in px across the viewport, centred on rest. */
  y: ResponsiveValue
  /** Total tilt in degrees across the viewport, centred on rest. */
  tilt?: ResponsiveValue
  /** Resting rotation the scrub is applied on top of. */
  rotate?: number
}

/**
 * Scroll-linked drift and tilt for a device mockup.
 *
 * A superset of `useParallax`: it also scrubs rotation, so two phones in the
 * same composition can move at different rates AND lean by different amounts,
 * which is what stops a group of mockups reading as one flat sticker.
 *
 * The resting rotation is owned here rather than in a CSS class, because GSAP
 * takes over the whole `transform` — a `rotate-*` utility would be wiped the
 * moment the runtime loads.
 *
 * Until (and unless) the runtime loads, the element sits at its resting
 * rotation with no drift. Nothing can shift, and nothing is invisible.
 */
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
    // Amplitudes come from the frozen config; `rotate` is a literal per call site.
  }, [rotate])

  return ref
}
