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
 * Where the page has to sit for a section to read as "you are at its top".
 *
 * Two separate amounts stack above a section's first line of text, and only
 * one of them belongs to navigation:
 *
 *   `scroll-margin-top`  clearance under the fixed navbar — a navigation
 *                        concern, and the one thing a jump should respect.
 *   `padding-top`        the section's own air, up to 9rem on a wide screen —
 *                        a layout concern. It exists so that *scrolling*
 *                        through the page has room to breathe between
 *                        sections, and it has no business deciding where a
 *                        click in the navbar lands.
 *
 * Landing on the section's box put both of them above the content: nearly
 * 240px of empty page, which reads as having arrived somewhere between two
 * sections rather than at the top of one. Adding the padding back here
 * cancels it, so the first line always arrives exactly `scroll-margin-top`
 * below the viewport's top edge, whatever the section's padding happens to be
 * at that breakpoint.
 *
 * This is why every section carries its top padding on the element that holds
 * the `id` — see the note in Work, the one section where it used to sit on a
 * container inside.
 */
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

/**
 * Scrolls to an element or offset, routed through Lenis when it is available
 * and falling back to native smooth scrolling when it is not.
 *
 * The destination is resolved here, to a number, for both paths. Lenis can
 * take an element and work out `scroll-margin-top` itself, but it knows
 * nothing about the padding correction above — so letting it resolve the
 * target would mean two subtly different landings depending on whether the
 * motion chunk had finished loading yet.
 *
 * `immediate` jumps without animating. A route change needs it: arriving at a
 * new page should feel like arriving, not like being scrolled there.
 */
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

/**
 * Re-measures every scroll-linked position.
 *
 * ScrollTrigger measures the document once, when a trigger is created, and
 * again on `document.fonts.ready` (see `init`). A route change replaces the
 * entire document body and changes its height by thousands of pixels without
 * either of those firing, which leaves triggers created before the swap
 * anchored to a page that no longer exists. No-ops until the runtime loads.
 */
export function refreshScrollTriggers() {
  getMotionRuntime()?.ScrollTrigger.refresh()
}

/**
 * Forces the smooth-scroll runtime to re-measure the document.
 *
 * Lenis clamps every scroll target against a cached limit, and that cache is
 * refreshed by a ResizeObserver debounced by 250ms. A route change replaces the
 * document in a single frame, so for a quarter of a second afterwards Lenis
 * still believes the *previous* page's height — and a restore past that height
 * is silently clamped down to it. Anything that jumps immediately after
 * swapping the document has to re-measure first.
 */
export function resizeSmoothScroll() {
  getMotionRuntime()?.lenis?.resize()
}

/** Pauses or resumes smooth scrolling — used while the mobile menu is open. */
export function setSmoothScrollPaused(paused: boolean) {
  const lenis = getMotionRuntime()?.lenis
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
