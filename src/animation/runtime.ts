import type Lenis from "lenis"
import type { gsap as GsapNamespace } from "gsap"
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger"

import { animation } from "./config"

export type MotionRuntime = {
  gsap: typeof GsapNamespace
  ScrollTrigger: typeof ScrollTriggerType
  lenis: Lenis | null
}

let pending: Promise<MotionRuntime | null> | null = null
let current: MotionRuntime | null = null

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function getMotionRuntime(): MotionRuntime | null {
  return current
}

export function loadMotionRuntime(): Promise<MotionRuntime | null> {
  if (prefersReducedMotion()) return Promise.resolve(null)
  if (!pending) pending = init()
  return pending
}

async function init(): Promise<MotionRuntime | null> {
  try {
    const [gsapModule, scrollTriggerModule, lenisModule] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      animation.enabled.smoothScroll ? import("lenis") : Promise.resolve(null),
    ])

    const gsap = gsapModule.gsap
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    let lenis: Lenis | null = null

    if (lenisModule) {
      const LenisCtor = lenisModule.default
      lenis = new LenisCtor({
        lerp: animation.lenis.lerp,
        wheelMultiplier: animation.lenis.wheelMultiplier,
        touchMultiplier: animation.lenis.touchMultiplier,
        syncTouch: animation.lenis.syncTouch,
      })

      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(lenisTick)
      gsap.ticker.lagSmoothing(0)
    }

    function lenisTick(time: number) {
      lenis?.raf(time * 1000)
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    }

    current = { gsap, ScrollTrigger, lenis }
    return current
  } catch {
    return null
  }
}

export function scheduleMotionRuntime() {
  if (prefersReducedMotion()) return

  const start = () => {
    const idle = window.requestIdleCallback
    if (typeof idle === "function") {
      idle(() => void loadMotionRuntime(), { timeout: 2000 })
    } else {
      window.setTimeout(() => void loadMotionRuntime(), animation.loadDelayMs)
    }
  }

  if (document.readyState === "complete") start()
  else window.addEventListener("load", start, { once: true })
}

export function sectionScrollTop(element: HTMLElement): number {
  const styles = getComputedStyle(element)
  const scrollMargin = Number.parseFloat(styles.scrollMarginTop)
  const paddingTop = Number.parseFloat(styles.paddingTop)

  return (
    element.getBoundingClientRect().top +
    window.scrollY +
    (Number.isNaN(paddingTop) ? 0 : paddingTop) -
    (Number.isNaN(scrollMargin) ? 0 : scrollMargin)
  )
}

export function motionScrollTo(
  target: HTMLElement | number,
  offset = 0,
  { immediate = false }: { immediate?: boolean } = {},
) {
  const runtime = getMotionRuntime()
  const top = (typeof target === "number" ? target : sectionScrollTop(target)) + offset

  if (runtime?.lenis) {
    runtime.lenis.scrollTo(top, immediate ? { immediate: true } : undefined)
    return
  }

  window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" })
}

export function refreshScrollTriggers() {
  getMotionRuntime()?.ScrollTrigger.refresh()
}

export function resizeSmoothScroll() {
  getMotionRuntime()?.lenis?.resize()
}

export function setSmoothScrollPaused(paused: boolean) {
  const lenis = getMotionRuntime()?.lenis
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
