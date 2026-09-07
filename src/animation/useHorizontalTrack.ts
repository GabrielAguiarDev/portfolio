import { useEffect, useRef } from "react"

import { animation } from "./config"
import { loadMotionRuntime } from "./runtime"

/**
 * Turns vertical scroll into horizontal movement across a pinned section.
 *
 * Desktop only, by design. Below `track.pinFrom` the same markup stays a plain
 * native horizontal scroller with snap points — which is the better interaction
 * on a touch screen anyway, and costs no JavaScript at all. Hijacking scroll on
 * a phone is exactly the kind of effect that ruins a mobile experience.
 *
 * Returns two refs:
 *  - `sectionRef` — the element that gets pinned.
 *  - `trackRef`   — the row that slides. Must be wider than the viewport.
 */
export function useHorizontalTrack<
  S extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement,
>() {
  const sectionRef = useRef<S>(null)
  const trackRef = useRef<T>(null)

  useEffect(() => {
    if (!animation.enabled.horizontalTrack) return

    let disposed = false
    let cleanup: (() => void) | undefined

    loadMotionRuntime().then((runtime) => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!runtime || disposed || !section || !track) return

      const mm = runtime.gsap.matchMedia()

      mm.add(`(min-width: ${animation.track.pinFrom}px)`, () => {
        // Measured inside a function so ScrollTrigger re-reads it on refresh,
        // after fonts and images have settled the track's real width.
        const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0)

        const tween = runtime.gsap.to(track, {
          x: () => -distance(),
          ease: animation.easing.scrub,
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: animation.trigger.trackStart,
            end: () => `+=${distance() + window.innerHeight * animation.track.overscroll}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          runtime.gsap.set(track, { clearProps: "transform" })
        }
      })

      cleanup = () => mm.revert()
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return { sectionRef, trackRef }
}
