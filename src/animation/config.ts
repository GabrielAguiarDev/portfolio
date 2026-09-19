
export const MOBILE_BREAKPOINT = 768

export const animation = {
  enabled: {
    smoothScroll: true,
    headingReveal: true,
    reveal: true,
    parallax: true,
    deviceFloat: true,
    pointField: true,
    layerStack: true,
    horizontalTrack: true,
    counters: true,
  },

  easing: {
    reveal: "cubic-bezier(0.22, 1, 0.36, 1)",
    heading: "cubic-bezier(0.16, 1, 0.3, 1)",
    scrub: "none",
  },

  duration: {
    reveal: 0.7,
    heading: 0.9,
  },

  delay: {
    reveal: 0,
    heading: 0.04,
    headingWordStep: 0.05,
    gridStep: 0.06,
    gridStepMax: 0.42,
  },

  distance: {
    reveal: { desktop: 26, mobile: 14 },
  },

  parallax: {
    portrait: { desktop: 48, mobile: 14 },
    caseDevice: { desktop: 72, mobile: 20 },
    caseDeviceLead: { desktop: 44, mobile: 14 },
    caseCard: { desktop: 96, mobile: 24 },
  },

  tilt: {
    device: { desktop: 4, mobile: 0 },
  },

  track: {
    overscroll: 0.35,
    pinFrom: 1024,
  },

  pointField: {
    count: { desktop: 2000, mobile: 900 },
    glyph: {
      bars: [
        { ax: -0.6, ay: 0.47, bx: -0.99, by: 0 },
        { ax: -0.99, ay: 0, bx: -0.6, by: -0.47 },
        { ax: -0.19, ay: -0.62, bx: 0.19, by: 0.62 },
        { ax: 0.6, ay: 0.47, bx: 0.99, by: 0 },
        { ax: 0.99, ay: 0, bx: 0.6, by: -0.47 },
      ],
      thickness: 0.115,
      depth: 0.115,
    },
    center: { desktop: 0.74, mobile: 0.5 },
    radius: 0.38,
    margin: 0.05,
    perspective: 4.2,
    sway: {
      speed: { desktop: 0.0042, mobile: 0.0055 },
      swing: 0.38,
      bob: 0.1,
    },
    basePitch: -0.1,
    tilt: 0.26,
    tiltEase: 0.045,
    cursorRadius: 215,
    cursorForce: 3.6,
    emberThreshold: 0.44,
    springBack: 0.055,
    damping: 0.87,
    dotSize: { desktop: 1.45, mobile: 2.3 },
    opacity: 0.82,
    dprMax: 2,

    disperse: {
      span: { desktop: 0.85, mobile: 0.26 },
      distance: 0.95,
      stagger: 0.42,
      randomness: 0.72,
      bottomFade: { desktop: 0.38, mobile: 0 },
      fade: 0.88,
    },

    bleed: { desktop: 0, mobile: 0.2 },

    intro: {
      play: { desktop: true, mobile: true },
      holdCopy: { desktop: false, mobile: true },
      topThresholdPx: 4,
      from: 0.55,
      holdMs: 200,
      durationMs: 1400,
      fadeInMs: 420,
      maxFrameMs: 64,
      fade: 0.45,
      revealAt: 0.7,
      ceilingGraceMs: 600,
      ease: (t: number) => t * t * (3 - 2 * t),
    },
  },

  layerStack: {
    halfWidth: 1.3,
    halfDepth: 0.66,
    gap: { collapsed: 0.1, expanded: 0.56 },
    separate: { from: 0.1, to: 0.46 },
    pitch: -0.34,
    yaw: { base: -0.44, travel: 0.22 },
    perspective: 5.4,
    fill: { desktop: 0.94, mobile: 0.9 },
    grid: 5,
    alpha: { edge: 0.55, grid: 0.1, fill: 0.03, spine: 0.2, backing: 0.82 },
    spine: { inset: 0.28 },
    tilt: { yaw: 0.16, pitch: 0.07 },
    tiltEase: 0.055,
    sway: { speed: 0.156, yaw: 0.05, pitch: 0.018 },
    pulse: { period: 5.2, reach: 0.85, lift: 1.5, dotSize: 3.2, litThreshold: 0.34 },
    dprMax: 2,
  },

  counter: {
    msPerUnit: 110,
    minDurationMs: 420,
    maxDurationMs: 1400,
    ease: (t: number) => 1 - Math.pow(1 - t, 4),
  },

  trigger: {
    revealRootMargin: "0px 0px -10% 0px",
    revealThreshold: 0.1,
    parallaxStart: "top bottom",
    parallaxEnd: "bottom top",
    trackStart: "top top",
  },

  lenis: {
    lerp: 0.3,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    syncTouch: false,
  },

  loadDelayMs: 400,

  menuCloseMs: 340,
} as const

export type ResponsiveValue = { desktop: number; mobile: number }
