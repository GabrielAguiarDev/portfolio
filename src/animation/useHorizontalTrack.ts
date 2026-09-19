import { useEffect, useRef } from "react"

import { animation } from "./config"
import { loadMotionRuntime } from "./runtime"

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
