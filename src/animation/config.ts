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
    /** Scrubbed drift and tilt on device mockups. */
    deviceFloat: true,
    /** The interactive point field behind the hero. */
    pointField: true,
    /** The process track scrolling sideways while its section is pinned. */
    horizontalTrack: true,
    /** Impact figures counting up the first time they are seen. */
    counters: true,
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
    portrait: { desktop: 48, mobile: 14 },
    caseDevice: { desktop: 72, mobile: 20 },
    caseDeviceLead: { desktop: 44, mobile: 14 },
    caseCard: { desktop: 96, mobile: 24 },
  },

  /**
   * Scrubbed tilt on device mockups, in degrees, applied on top of the resting
   * rotation set in the markup. Total travel across the viewport, centred.
   */
  tilt: {
    device: { desktop: 4, mobile: 0 },
  },

  /**
   * The pinned horizontal track. `overscroll` is how much extra vertical
   * scroll, as a multiple of viewport height, the pin consumes beyond the
   * track's own width.
   */
  track: {
    overscroll: 0.35,
    /** Below this width the track is a native horizontal scroller instead. */
    pinFrom: 1024,
  },

  /**
   * The hero's point field — a sphere of points, projected in perspective,
   * that turns on its own and answers the pointer.
   *
   * Counts are deliberately modest. This runs every frame behind the LCP
   * element on a portfolio whose whole argument is that its author cares about
   * performance, so it is sized to disappear into a frame budget rather than
   * to look impressive in a screenshot.
   */
  pointField: {
    count: { desktop: 3000, mobile: 800 },
    /**
     * Where the sphere sits inside the canvas, as a fraction of its width.
     *
     * The canvas itself always covers the whole hero. Offsetting the sphere
     * here rather than by shrinking the canvas is what lets points scatter
     * across the full screen on scroll, instead of hitting an invisible wall
     * at the canvas edge.
     */
    center: { desktop: 0.746, mobile: 0.5 },
    /**
     * Sphere radius as a fraction of the smaller canvas dimension.
     *
     * The near hemisphere projects outward by up to `perspective / (perspective
     * - 1)` — about 1.31x here — so the drawn object is a third wider than this
     * number suggests. 0.38 is what keeps the whole sphere inside a 100svh hero
     * instead of clipping it against the navbar and the fold.
     */
    radius: 0.38,
    /**
     * Perspective distance, in radius units. Lower is more dramatic, but too
     * low and the near hemisphere's points fly so far past the silhouette that
     * the whole thing stops reading as a sphere and becomes drifting dust.
     */
    perspective: 4.2,
    /** Radians per frame of unattended rotation. A full turn takes ~90s. */
    autoYaw: { desktop: 0.0012, mobile: 0.0018 },
    /** How far the field leans toward the pointer, in radians. */
    tilt: 0.26,
    /** How quickly the lean catches up to the pointer. */
    tiltEase: 0.045,
    /** Screen-space radius, in px, within which the pointer pushes points. */
    cursorRadius: 215,
    cursorForce: 3.6,
    /**
     * How deep into the cursor's reach a point has to be before it takes the
     * accent colour, 0–1. Kept separate from `cursorRadius` on purpose: the
     * shove should stay wide and soft, while the colour stays a small, bright
     * core. Raising this shrinks the orange without weakening the interaction.
     */
    emberThreshold: 0.44,
    /** Spring pulling a pushed point back to where projection says it belongs. */
    springBack: 0.055,
    damping: 0.87,
    /** Dot radius in CSS px, before depth scaling. */
    dotSize: 1.45,
    /** Opacity of the field as a whole. It is scenery, not content. */
    opacity: 0.82,
    /** Device pixel ratio is capped — past 2 the cost is real and invisible. */
    dprMax: 2,

    /**
     * Scrolling away scatters the field; scrolling back gathers it again.
     *
     * The whole thing is a pure function of scroll position rather than an
     * animation with its own state, which is what makes it reversible for free
     * — drag the scrollbar back up and the sphere reassembles exactly.
     */
    disperse: {
      /** Fraction of the hero's height over which the field fully scatters. */
      span: 0.85,
      /** Farthest a point travels, as a fraction of the canvas's longer side. */
      distance: 0.95,
      /** Largest per-point head start, as a fraction of total progress. */
      stagger: 0.42,
      /** How much of a point's direction is random vs. straight outward. */
      randomness: 0.72,
      /**
       * Height of the soft bottom edge, as a fraction of the canvas.
       *
       * It opens up only as the field scatters. The canvas ends where the hero
       * ends, so points flying downward used to be guillotined against that
       * line; this dissolves them into it instead. At rest the sphere never
       * reaches down here, so there is nothing to fade and the falloff is off.
       */
      bottomFade: 0.38,
    },
  },

  /**
   * Impact figures counting up from zero.
   *
   * Duration scales with the figure. Counting 0→3 over a flat 1400ms shows
   * four numbers held for ~470ms each, which reads as a loading glitch rather
   * than a flourish; the same ramp over 50 needs the full time to feel smooth.
   */
  counter: {
    msPerUnit: 110,
    minDurationMs: 420,
    maxDurationMs: 1400,
    ease: (t: number) => 1 - Math.pow(1 - t, 4),
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
    /** ScrollTrigger start for the pinned horizontal track. */
    trackStart: "top top",
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
