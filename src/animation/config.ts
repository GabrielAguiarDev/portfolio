/**
 * Central animation config.
 *
 * Every duration, easing, delay, travel distance and scroll trigger point used
 * by the site lives here. Nothing else in the codebase should hardcode a
 * timing value — tune the site's feel by editing this file alone.
 *
 * Values in `duration` and `delay` are in SECONDS (they feed both GSAP and CSS
 * transitions). Values in `distance` and `parallax` are in PIXELS.
 *
 * Anything with a `{ desktop, mobile }` shape is resolved against
 * `MOBILE_BREAKPOINT`: mobile is the primary target, so its amplitudes are
 * deliberately smaller.
 */

/** Width (px) below which the mobile variant of every value is used. */
export const MOBILE_BREAKPOINT = 768

export const animation = {
  /**
   * Master switches. Flip any of these to `false` to disable that whole
   * family of motion; the site stays fully readable and navigable without it.
   */
  enabled: {
    /** Lenis inertial smooth scroll. Off = native browser scrolling. */
    smoothScroll: true,
    /** Word-by-word masked reveal on headings. Off = plain static headings. */
    headingReveal: true,
    /** Fade + rise reveal on sections, cards and grid cells. */
    reveal: true,
    /** Scroll-linked parallax on the hero portrait and project images. */
    parallax: true,
    /** The experience timeline rail drawing itself as you scroll. */
    timelineDraw: true,
  },

  easing: {
    /** CSS easing for reveals (IntersectionObserver-driven, no library). */
    reveal: "cubic-bezier(0.22, 1, 0.36, 1)",
    /** CSS easing for the heading word masks. */
    heading: "cubic-bezier(0.16, 1, 0.3, 1)",
    /** GSAP easing for scroll-scrubbed motion. Keep linear so it tracks scroll. */
    scrub: "none",
  },

  duration: {
    /** A section, card or grid cell fading in. */
    reveal: 0.7,
    /** A single word sliding out from behind its mask. */
    heading: 0.9,
  },

  delay: {
    /** Added before every reveal starts. */
    reveal: 0,
    /** Added before a heading's first word starts. */
    heading: 0.04,
    /** Gap between consecutive words in a heading. */
    headingWordStep: 0.05,
    /** Gap between consecutive cells in a staggered grid. */
    gridStep: 0.06,
    /** Cap on total stagger, so long grids don't crawl. */
    gridStepMax: 0.42,
  },

  /** How far elements travel while revealing. */
  distance: {
    reveal: { desktop: 26, mobile: 14 },
  },

  /**
   * Total scroll-linked travel, in px, from the moment an element enters the
   * viewport to the moment it leaves. The element moves from `-amount / 2` to
   * `+amount / 2`, so its resting position stays centred.
   */
  parallax: {
    heroPortrait: { desktop: 56, mobile: 16 },
    heroHalo: { desktop: 96, mobile: 24 },
    projectImage: { desktop: 40, mobile: 12 },
  },

  /** Where in the viewport things start and stop animating. */
  trigger: {
    /** IntersectionObserver rootMargin for reveals. */
    revealRootMargin: "0px 0px -10% 0px",
    /** IntersectionObserver threshold for reveals. */
    revealThreshold: 0.1,
    /** ScrollTrigger start/end for parallax. */
    parallaxStart: "top bottom",
    parallaxEnd: "bottom top",
    /** ScrollTrigger start/end for the timeline rail draw. */
    timelineStart: "top 78%",
    timelineEnd: "bottom 65%",
  },

  /**
   * Lenis smooth scroll. `syncTouch: false` leaves touch scrolling native,
   * which is both faster and the expected feel on a phone.
   */
  lenis: {
    lerp: 0.11,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    syncTouch: false,
  },

  /**
   * How long after the page has loaded before GSAP/Lenis are fetched. They are
   * code-split and requested during idle time so they never compete with LCP.
   */
  loadDelayMs: 400,

  /**
   * How long the mobile menu takes to animate out. Radix keeps the body
   * scroll-locked for the whole exit, so a scroll requested from inside the
   * menu has to wait this long. Keep it in step with the sheet's
   * `data-[state=closed]:duration-300` in components/ui/sheet.tsx.
   */
  menuCloseMs: 340,
} as const

export type ResponsiveValue = { desktop: number; mobile: number }
