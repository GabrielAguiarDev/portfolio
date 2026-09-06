import type Lenis from "lenis"
import type { gsap as GsapNamespace } from "gsap"
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger"

import { animation } from "./config"

/**
 * Lazily-loaded motion runtime.
 *
 * GSAP, ScrollTrigger and Lenis are code-split into their own chunk and only
 * fetched during idle time after `load`, so they never compete with the LCP.
 * Every consumer must tolerate `null` (reduced motion, or a failed fetch) and
 * fall back to a static, readable layout.
 */
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

/** The runtime, if it has already finished loading. Never triggers a load. */
export function getMotionRuntime(): MotionRuntime | null {
  return current
}

/**
 * Loads (or returns the in-flight load of) the motion runtime.
 * Resolves to `null` when motion is disabled or the chunk fails to load.
 */
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

      // One shared RAF loop for Lenis and GSAP, as recommended by both.
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(lenisTick)
      gsap.ticker.lagSmoothing(0)
    }

    function lenisTick(time: number) {
      lenis?.raf(time * 1000)
    }

    // Late-loading images and webfonts change the page height; re-measure once
    // everything has settled so scroll-linked positions stay correct.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    }

    current = { gsap, ScrollTrigger, lenis }
    return current
  } catch {
    // Motion is a progressive enhancement: a failed chunk must not break the page.
    return null
  }
}

/**
 * Schedules the runtime load for after the page has loaded and the main thread
 * is idle. Safe to call more than once.
 */
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

/**
 * Scrolls to an element or offset, routed through Lenis when it is available
 * and falling back to native smooth scrolling when it is not.
 *
 * Clearance under the fixed navbar comes from the target's `scroll-margin-top`
 * (the `scroll-mt-*` on each section), which is the one place it is defined.
 * Lenis subtracts it natively; the fallback below does the same so both paths
 * land in the same spot.
 */
export function motionScrollTo(target: HTMLElement | number, offset = 0) {
  const runtime = getMotionRuntime()

  if (runtime?.lenis) {
    runtime.lenis.scrollTo(target, { offset })
    return
  }

  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth"

  if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior })
    return
  }

  const scrollMargin = Number.parseFloat(getComputedStyle(target).scrollMarginTop)
  const top =
    target.getBoundingClientRect().top +
    window.scrollY +
    offset -
    (Number.isNaN(scrollMargin) ? 0 : scrollMargin)

  window.scrollTo({ top, behavior })
}

/** Pauses or resumes smooth scrolling — used while the mobile menu is open. */
export function setSmoothScrollPaused(paused: boolean) {
  const lenis = getMotionRuntime()?.lenis
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
