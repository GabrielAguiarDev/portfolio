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
    /** The exploded layer stack in the Foundations section. */
    layerStack: true,
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
   * The hero's point field — a `</>` built out of points, projected in
   * perspective, swaying on its own and answering the pointer.
   *
   * Counts are deliberately modest. This runs every frame behind the LCP
   * element on a portfolio whose whole argument is that its author cares about
   * performance, so it is sized to disappear into a frame budget rather than
   * to look impressive in a screenshot.
   */
  pointField: {
    count: { desktop: 2000, mobile: 650 },
    /**
     * The object itself: `</>` built out of thick 3D bars.
     *
     * `bars` are the centre lines of the glyph in a normalised space where it
     * spans roughly -1..1 horizontally. `thickness` is each bar's half-width in
     * that same space and `depth` its half-extrusion along z — equal by
     * default, so every bar has a square cross-section and turning the glyph
     * reveals a real side wall rather than a paper edge.
     *
     * Points are scattered over the *surface* of those bars, not through their
     * volume, for the same reason the field used to be a sphere shell: a hollow
     * shell shows its far side through its near side, which is most of what
     * makes a cloud of dots read as a solid.
     */
    glyph: {
      bars: [
        // "<"
        { ax: -0.6, ay: 0.47, bx: -0.99, by: 0 },
        { ax: -0.99, ay: 0, bx: -0.6, by: -0.47 },
        // "/"
        { ax: -0.19, ay: -0.62, bx: 0.19, by: 0.62 },
        // ">"
        { ax: 0.6, ay: 0.47, bx: 0.99, by: 0 },
        { ax: 0.99, ay: 0, bx: 0.6, by: -0.47 },
      ],
      thickness: 0.115,
      depth: 0.115,
    },
    /**
     * Where the glyph sits inside the canvas, as a fraction of its width.
     *
     * The canvas itself always covers the whole hero. Offsetting the glyph
     * here rather than by shrinking the canvas is what lets points scatter
     * across the full screen on scroll, instead of hitting an invisible wall
     * at the canvas edge.
     */
    center: { desktop: 0.74, mobile: 0.5 },
    /**
     * One normalised glyph unit, as a fraction of the smaller canvas dimension.
     *
     * This is only the ceiling. The glyph is nearly twice as wide as it is tall
     * and it is parked off-centre, so the draw loop also fits it to whatever
     * room is actually left to the right of the type and above the fold, and
     * takes whichever of the three is smallest. That keeps `</>` whole on a
     * phone and on an ultrawide without a breakpoint for either.
     */
    radius: 0.38,
    /**
     * Clear space kept around the glyph, as a fraction of the canvas.
     *
     * The fit above would otherwise let it grow until it touched the edge of
     * the viewport and the last line of the headline. It is the subject of the
     * hero, but the headline is the LCP element and the one that has to be read
     * first, so the glyph is given a margin rather than every pixel that is
     * technically free.
     */
    margin: 0.05,
    /**
     * Perspective distance, in glyph units. Lower is more dramatic, but too
     * low and the near face's points fly so far past the silhouette that the
     * bars stop reading as bars and become drifting dust.
     */
    perspective: 4.2,
    /**
     * The unattended motion.
     *
     * A sphere could turn forever because every angle of it looks the same. A
     * glyph cannot: a quarter turn puts it edge-on and `</>` stops being
     * readable at all. So it sways instead of spinning — `speed` is radians of
     * phase per frame, `swing` the peak yaw it reaches, `bob` a nod on the
     * other axis running at a different rate so the pair never repeats on a
     * beat you can count. ~25s per sway at 60fps.
     */
    sway: {
      speed: { desktop: 0.0042, mobile: 0.0055 },
      swing: 0.38,
      bob: 0.1,
    },
    /** Resting pitch, in radians, before the bob and the pointer lean. */
    basePitch: -0.1,
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
     * — drag the scrollbar back up and the glyph reassembles exactly.
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
       * line; this dissolves them into it instead. At rest the glyph never
       * reaches down here, so there is nothing to fade and the falloff is off.
       */
      bottomFade: 0.38,
    },
  },

  /**
   * The exploded layer stack behind the engineering argument.
   *
   * A product drawn as what it actually is: a short pile of planes, of which
   * the screen is only the top one. Scrolling into the section pulls them
   * apart, scrolling back presses them together again — and, like the hero's
   * point field, the whole thing is a pure function of scroll position rather
   * than a timeline with its own state, so it runs backwards for free.
   *
   * Angles are radians, distances are in plane units (one plane is 2 units
   * wide), and the on-screen size is fitted to the canvas at every resize —
   * nothing here is a pixel value that could overflow a viewport.
   */
  layerStack: {
    /**
     * Half-extents of one plane: wider across the page than into it.
     *
     * An exploded stack of five is naturally about as tall as it is wide, and
     * a plane can only ever contribute `halfWidth * cos(yaw) + halfDepth *
     * sin(yaw)` to the silhouette — so widening the planes is the only way to
     * stop the composition being a narrow column in a landscape box.
     */
    halfWidth: 1.3,
    halfDepth: 0.66,
    /**
     * Vertical distance between neighbouring planes, pressed together and
     * fully apart. `collapsed` is deliberately not 0 — a stack with a visible
     * seam reads as layers waiting to separate, where a single slab reads as
     * a mistake.
     */
    gap: { collapsed: 0.1, expanded: 0.56 },
    /**
     * The window, as a fraction of the section's travel across the viewport,
     * over which the planes separate.
     *
     * 0.5 is the point where the diagram is dead centre in the viewport, so
     * the separation has to be complete a little before that — otherwise the
     * stack is still opening at the moment it is being read, and is only ever
     * seen fully apart on the way out.
     */
    separate: { from: 0.1, to: 0.46 },
    /**
     * How far the scene is tilted toward the viewer. Small values look
     * edge-on with wide gaps; large values look top-down with none. This sits
     * where each plane still reads as a surface without swallowing its
     * neighbour.
     */
    pitch: -0.34,
    /** Resting turn, and how much more of it the scroll adds. */
    yaw: { base: -0.44, travel: 0.22 },
    /** Perspective distance, in plane units. */
    perspective: 5.4,
    /** Fraction of the canvas the fitted stack is allowed to fill. */
    fill: { desktop: 0.94, mobile: 0.9 },
    /** Grid divisions ruled across each plane, per axis. */
    grid: 5,
    /**
     * Inks, as alpha at full brightness. Everything else scales off these.
     *
     * `backing` is the opacity of the ground colour painted under each plane,
     * which is what makes a near plane read as solid over the one behind it.
     * The colour itself is read from `--background` at runtime rather than
     * written here, so the two can never drift apart.
     */
    alpha: { edge: 0.55, grid: 0.1, fill: 0.03, spine: 0.2, backing: 0.82 },
    /**
     * The connectors between neighbouring planes, as the fraction of each gap
     * left clear at either end. 0 draws one unbroken line down the stack,
     * which closes the silhouette into a box; this leaves each plane its own
     * clearance so the connector reads as a joint.
     */
    spine: { inset: 0.28 },
    /** Pointer lean, in radians, and how fast it catches up. */
    tilt: { yaw: 0.16, pitch: 0.07 },
    tiltEase: 0.055,
    /**
     * Unattended sway, so a stationary reader is not shown a still image.
     * `speed` is radians of phase per SECOND, not per frame — the pulse below
     * runs on wall-clock time and the two have to share a clock, or the sway
     * runs at double speed against it on a 120Hz display.
     */
    sway: { speed: 0.156, yaw: 0.05, pitch: 0.018 },
    /**
     * A request travelling down through the layers.
     *
     * `period` is one full pass in seconds; `reach` is how many layers either
     * side of the pulse pick up any of its light, which is what turns four
     * separate flashes into one continuous move. The layer it is passing
     * through is reported upward so the label beside the diagram can light up
     * with it — the diagram and its index are the same object, not two.
     *
     * `litThreshold` is how much of that light a layer needs before it is the
     * one reported. It reads as an ink level but it is not: it decides which
     * row of the written index highlights, and it is coupled to `reach` —
     * together they resolve to "within `reach * (1 - litThreshold)` layers of
     * the pulse". Raise it and the highlight becomes brief and definite; lower
     * it and two rows are lit at once through the handover.
     */
    pulse: { period: 5.2, reach: 0.85, lift: 1.5, dotSize: 3.2, litThreshold: 0.34 },
    /** Device pixel ratio is capped — past 2 the cost is real and invisible. */
    dprMax: 2,
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
   *
   * ── THE DIAL FOR HOW HEAVY SCROLLING FEELS ──────────────────────────────
   *
   * `lerp` is the one that matters. It is the fraction of the remaining
   * distance the page covers each frame, so it sets how long the page keeps
   * gliding after the wheel stops:
   *
   *   0.06 – 0.09   very heavy, long glide (cinematic, easy to overshoot)
   *   0.10 – 0.13   smooth but noticeably weighted
   *   0.14 – 0.18   light — still eased, tracks the wheel closely  ← here
   *   0.20 – 0.30   nearly native, the smoothing is barely perceptible
   *   1.0           identical to native scrolling
   *
   * `wheelMultiplier` scales how much distance one wheel notch asks for. Raise
   * it if the page feels slow to cross rather than slow to settle; it does not
   * change the glide, only the reach. Leave it at 1 unless the travel itself
   * is the complaint — above ~1.3 it starts to feel like the page is slipping.
   *
   * If you would rather have no smoothing at all, set
   * `enabled.smoothScroll: false` above: Lenis is then never even downloaded
   * and the browser's own scrolling takes over.
   */
  lenis: {
    lerp: 0.15,
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
