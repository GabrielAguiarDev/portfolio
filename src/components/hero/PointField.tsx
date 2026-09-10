import { useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, prefersReducedMotion } from "@/animation"
import { pointFieldIntroPlays } from "@/components/hero/pointFieldIntro"
import { cn } from "@/lib/utils"

/**
 * The object behind the hero.
 *
 * `</>` — the tag every developer reads without being told — built out of
 * points, projected in real perspective, swaying slowly on its own axis. It
 * leans toward the pointer and the points nearest the cursor are shoved
 * outward, then spring back, so the field reads as something physically there
 * rather than a looping background video.
 *
 * It is a solid, not a logo: five bars with a square cross-section, extruded
 * along z, with points scattered over their surface. Turning it shows real
 * side walls and the far face glows faintly through the near one — the same
 * trick that made the sphere it replaces read as an object rather than a
 * sticker.
 *
 * Why canvas 2D and not WebGL/three.js: a couple of thousand points is nowhere
 * near needing a GPU pipeline, and three.js would add ~150kB gzip to a page
 * whose entire argument is that its author knows what a bundle costs. The
 * whole effect is a few hundred lines and no dependency.
 *
 * It is decorative, so it is aria-hidden and pointer-events-none. It never
 * intercepts a click meant for the buttons sitting on top of it.
 */

type Point = {
  /** Position in glyph space, roughly -1..1 across. */
  ux: number
  uy: number
  uz: number
  /** Screen-space displacement from the cursor shove, and its velocity. */
  ox: number
  oy: number
  vx: number
  vy: number
  /** Unit direction this point scatters along, its reach, and its head start. */
  dx: number
  dy: number
  dmag: number
  ddelay: number
}

/** Half-extents of the built glyph, used to fit and to normalise depth. */
type Extent = { x: number; y: number; z: number }

/**
 * Scatter points over the surface of the glyph.
 *
 * Each bar is a box: a length, a half-thickness across the page, a
 * half-depth into it. Points land on the four lateral walls and the two end
 * caps, never inside — a shell, so the far wall shows through the near one.
 * Bars get points in proportion to their surface area, which is what keeps the
 * slash from reading thinner than the chevrons just because it is longer.
 */
function buildGlyph(count: number): { points: Point[]; extent: Extent } {
  const { bars, thickness: t, depth: h } = animation.pointField.glyph

  // Perimeter of the 2t x 2h cross-section, and the area of one end cap.
  const perimeter = 4 * (t + h)
  const capArea = 4 * t * h

  const shapes = bars.map((bar) => {
    const vx = bar.bx - bar.ax
    const vy = bar.by - bar.ay
    const length = Math.hypot(vx, vy) || 1

    return {
      ax: bar.ax,
      ay: bar.ay,
      length,
      // Along the bar, and across it in the plane of the page.
      dx: vx / length,
      dy: vy / length,
      nx: -vy / length,
      ny: vx / length,
      area: length * perimeter + 2 * capArea,
    }
  })

  const total = shapes.reduce((sum, shape) => sum + shape.area, 0)
  const points: Point[] = []
  const extent: Extent = { x: 0, y: 0, z: 0 }

  shapes.forEach((shape, index) => {
    // The last bar takes whatever rounding left over, so the total is exact.
    const share =
      index === shapes.length - 1
        ? count - points.length
        : Math.round((shape.area / total) * count)

    const capChance = (2 * capArea) / shape.area

    for (let i = 0; i < share; i += 1) {
      let along: number
      let across: number
      let z: number

      if (Math.random() < capChance) {
        // An end cap: a filled rectangle at one end of the bar.
        along = Math.random() < 0.5 ? 0 : shape.length
        across = (Math.random() * 2 - 1) * t
        z = (Math.random() * 2 - 1) * h
      } else {
        // A lateral wall. Walk the cross-section's perimeter and read off
        // which of the four sides `p` landed on.
        along = Math.random() * shape.length
        const p = Math.random() * perimeter

        if (p < 2 * t) {
          across = p - t
          z = h
        } else if (p < 2 * t + 2 * h) {
          across = t
          z = h - (p - 2 * t)
        } else if (p < 4 * t + 2 * h) {
          across = t - (p - 2 * t - 2 * h)
          z = -h
        } else {
          across = -t
          z = -h + (p - 4 * t - 2 * h)
        }
      }

      const ux = shape.ax + shape.dx * along + shape.nx * across
      const uy = shape.ay + shape.dy * along + shape.ny * across

      extent.x = Math.max(extent.x, Math.abs(ux))
      extent.y = Math.max(extent.y, Math.abs(uy))
      extent.z = Math.max(extent.z, Math.abs(z))

      points.push({
        ux,
        uy,
        uz: z,
        ox: 0,
        oy: 0,
        vx: 0,
        vy: 0,
        dx: 0,
        dy: 0,
        dmag: 0.45 + Math.random() * 0.95,
        ddelay: Math.random() * animation.pointField.disperse.stagger,
      })
    }
  })

  // Scatter directions, once the extents are known so "outward" means outward
  // from the glyph's own box rather than from a circle it does not fill.
  for (const point of points) {
    // Mostly random, with a bias straight out from the centre. Pure randomness
    // sends half the points inward first and the scatter reads as mush; pure
    // outward reads as a firework. The blend looks like something coming apart.
    const outX = point.ux / (extent.x || 1)
    const outY = point.uy / (extent.y || 1)
    const angle = Math.random() * Math.PI * 2
    const r = animation.pointField.disperse.randomness
    const dx = Math.cos(angle) * r + outX * (1 - r)
    const dy = Math.sin(angle) * r + outY * (1 - r)
    const length = Math.hypot(dx, dy) || 1
    point.dx = dx / length
    point.dy = dy / length
  }

  return { points, extent }
}

type PointFieldProps = {
  className?: string
  /**
   * Called once the glyph is there, so the hero can bring its copy in on top
   * of it — either because the entrance has just built it, or straight away
   * because there was no entrance to wait for.
   */
  onFormed?: () => void
}

const PointField = ({ className, onFormed }: PointFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // The draw loop is set up once and outlives any number of renders, so it
  // reads the callback through a ref rather than closing over the first one.
  const onFormedRef = useRef(onFormed)
  onFormedRef.current = onFormed

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !animation.enabled.pointField) return

    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return

    const config = animation.pointField
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
    const reduced = prefersReducedMotion()

    const built = buildGlyph(isMobile ? config.count.mobile : config.count.desktop)
    const dotSize = isMobile ? config.dotSize.mobile : config.dotSize.desktop
    const disperseSpan = isMobile
      ? config.disperse.span.mobile
      : config.disperse.span.desktop
    const extent = built.extent
    let points = built.points
    let width = 0
    let height = 0
    let dpr = 1

    // `phase` accumulates forever and drives the sway; the pointer lean is a
    // separate offset added on top, so leaning never fights or resets it.
    let phase = 0
    let yawOffset = 0
    let pitchOffset = 0
    let targetYawOffset = 0
    let targetPitch = 0

    // Cursor lives in CSS pixels relative to the canvas. `active` is false
    // until the pointer actually arrives, so nothing is disturbed on load.
    let pointerX = 0
    let pointerY = 0
    let pointerActive = false

    // 0 while the hero is at rest, 1 once the field has fully scattered.
    // Derived from scroll position every frame rather than animated, so it
    // runs backwards on its own when the visitor scrolls back up.
    let scrollScatter = 0
    let heroTop = 0
    let heroHeight = 1

    // ── The entrance ──────────────────────────────────────────────────────
    // The gather runs on wall-clock time, not on frames, so it takes the same
    // 1.4s on a 120Hz phone as on a throttled one. `introElapsed` is
    // accumulated per frame with a clamped delta rather than measured from a
    // start stamp: the loop is paused whenever the hero is off screen or the
    // tab is hidden, and a stamp would let that pause count as progress and
    // snap the glyph together the instant the visitor came back.
    const intro = config.intro
    const playIntro = pointFieldIntroPlays()
    // 0 at the scrambled opening frame, 1 once the glyph is whole. Pinned at 1
    // when there is no entrance to play, which takes every branch below out of
    // the draw loop for good.
    let introProgress = playIntro ? 0 : 1
    let introFade = playIntro ? 0 : 1
    let introElapsed = 0
    let lastTime = -1
    let formed = !playIntro

    // The hero takes the same decision one render earlier, and a restored
    // scroll position is applied in a layout effect *between* the two — so the
    // two can disagree, in the direction where the hero is holding copy for an
    // entrance that is never going to run. Saying so here rather than staying
    // silent closes that window to a single tick; the hero's own ceiling is
    // then only ever needed for a field that failed outright.
    if (formed) onFormedRef.current?.()

    // Alpha is quantised into buckets so the whole field draws in a handful of
    // fills instead of one state change per point. Two inks, ten steps each.
    const BUCKETS = 10
    const inkPath: Path2D[] = []
    const emberPath: Path2D[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      dpr = Math.min(window.devicePixelRatio || 1, config.dprMax)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Cached here so the scroll handler and the draw loop never have to read
      // layout, which would force a reflow on every frame of every scroll.
      heroTop = rect.top + window.scrollY
      heroHeight = rect.height || 1
      readScroll()
    }

    const readScroll = () => {
      const span = heroHeight * disperseSpan
      const raw = (window.scrollY - heroTop) / (span || 1)
      scrollScatter = raw < 0 ? 0 : raw > 1 ? 1 : raw
    }

    const draw = () => {
      if (!width || !height) return

      context.clearRect(0, 0, width, height)

      const cx = width * (isMobile ? config.center.mobile : config.center.desktop)
      const cy = height / 2

      // One glyph unit in px. The configured fraction is only a ceiling: the
      // glyph is nearly twice as wide as it is tall and it is parked off to one
      // side, so it is also fitted to the room actually left to the right of it
      // and above the fold, minus the margin it is not allowed to spend.
      // Smallest of the three wins.
      const unit = Math.min(
        Math.min(width, height) * config.radius,
        (width - cx - width * config.margin) / (extent.x || 1),
        (height / 2 - height * config.margin) / (extent.y || 1),
      )

      const spread = Math.max(width, height) * config.disperse.distance

      // Scrolling away and the entrance are the same move in opposite
      // directions, so they resolve to one number here. Whichever is asking
      // for more scatter wins: scrolling *during* the gather takes the field
      // straight back apart from wherever it had got to, with no jump and no
      // second animation to cancel.
      const introScatter = intro.from * (1 - intro.ease(introProgress))
      const scatter = Math.max(scrollScatter, introScatter)
      // The same displacement, dimmed very differently: scrolling away should
      // leave nothing behind, where the gather's loose points ARE the picture.
      // Blended by how much of the current scatter the entrance is responsible
      // for, rather than switched at the crossover — a switch steps the
      // brightness of the whole field in one frame, in the middle of the one
      // interaction this shared value exists to keep seamless. With no
      // entrance running the share is 0 and this is exactly `disperse.fade`.
      const introShare = scatter > 0 ? introScatter / scatter : 0
      const scatterFade =
        config.disperse.fade + (intro.fade - config.disperse.fade) * introShare

      // The sway, plus the pointer's lean on top of it.
      const yaw = Math.sin(phase) * config.sway.swing + yawOffset
      const pitch = config.basePitch + Math.sin(phase * 0.63) * config.sway.bob + pitchOffset

      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosX = Math.cos(pitch)
      const sinX = Math.sin(pitch)

      // How far the glyph currently reaches toward and away from the viewer.
      // Depth shading is normalised against this rather than against a fixed
      // range: face-on the whole glyph is only ~0.23 units deep, and a fixed
      // range would flatten the near and far faces into the same grey. This
      // keeps the front bright and the back ghosted at every angle, and it
      // moves smoothly with the sway, so nothing pops.
      const zExtent = Math.max(
        0.05,
        extent.y * Math.abs(sinX) +
          (extent.z * Math.abs(cosY) + extent.x * Math.abs(sinY)) * Math.abs(cosX),
      )

      for (let i = 0; i < BUCKETS; i += 1) {
        inkPath[i] = new Path2D()
        emberPath[i] = new Path2D()
      }

      for (const point of points) {
        // Rotate around Y, then X.
        const x1 = point.ux * cosY + point.uz * sinY
        const z1 = point.uz * cosY - point.ux * sinY
        const y2 = point.uy * cosX - z1 * sinX
        const z2 = point.uy * sinX + z1 * cosX

        // Perspective divide. Points on the near face are larger and brighter
        // than the ones showing through from the far one.
        const scale = config.perspective / (config.perspective - z2)
        const baseX = cx + x1 * unit * scale
        const baseY = cy + y2 * unit * scale
        const raw = 0.5 + z2 / (zExtent * 2)
        const depth = raw < 0 ? 0 : raw > 1 ? 1 : raw

        let heat = 0

        if (pointerActive && !reduced) {
          const dx = baseX + point.ox - pointerX
          const dy = baseY + point.oy - pointerY
          const distanceSq = dx * dx + dy * dy
          const r = config.cursorRadius

          if (distanceSq < r * r) {
            const distance = Math.sqrt(distanceSq) || 1
            const falloff = 1 - distance / r
            heat = falloff
            const force = (falloff * falloff * config.cursorForce) / distance
            point.vx += dx * force
            point.vy += dy * force
          }
        }

        if (!reduced) {
          // Critically-damped-ish return to the projected position.
          point.vx -= point.ox * config.springBack
          point.vy -= point.oy * config.springBack
          point.vx *= config.damping
          point.vy *= config.damping
          point.ox += point.vx
          point.oy += point.vy
        }

        let screenX = baseX + point.ox
        let screenY = baseY + point.oy
        let alpha = (0.16 + depth * 0.84) * (0.75 + heat * 0.9)

        if (scatter > 0) {
          // Each point starts moving at its own moment, so the glyph comes
          // apart in a cascade instead of every point leaving at once — and,
          // run backwards by the entrance, arrives in one.
          const local = (scatter - point.ddelay) / (1 - point.ddelay)

          if (local > 0) {
            const eased = local > 1 ? 1 : local * local
            const travel = eased * point.dmag * spread
            screenX += point.dx * travel
            screenY += point.dy * travel
            alpha *= 1 - eased * scatterFade
          }
        }

        // Dissolve into the canvas's bottom edge instead of being cut off by
        // it. Scaled by the scroll-driven scatter alone, so the resting glyph
        // is untouched — and so is the entrance, which is asking for the
        // opposite: points arriving from beyond the fold should be visible on
        // their way in, not held back until they clear an invisible line.
        if (scrollScatter > 0) {
          const fadeHeight = height * config.disperse.bottomFade * scrollScatter
          const fadeStart = height - fadeHeight

          if (fadeHeight > 0 && screenY > fadeStart) {
            const into = (screenY - fadeStart) / fadeHeight
            alpha *= into > 1 ? 0 : 1 - into * into
          }
        }

        // Nothing worth drawing: fully faded, or flung past the canvas.
        if (alpha < 0.012) continue
        if (screenX < -8 || screenX > width + 8 || screenY < -8 || screenY > height + 8) continue

        const size = dotSize * (0.42 + depth * 0.95) * scale * 0.62
        const bucket = Math.min(BUCKETS - 1, Math.max(0, Math.round(alpha * (BUCKETS - 1))))

        // The accent is spent only on the points the visitor is actually
        // touching, which is what keeps it feeling like a reaction rather
        // than a colour scheme.
        const path = heat > config.emberThreshold ? emberPath[bucket] : inkPath[bucket]
        path.moveTo(screenX + size, screenY)
        path.arc(screenX, screenY, size, 0, Math.PI * 2)
      }

      // The whole field's fade up out of nothing on load. 1 at every other
      // moment in the page's life, so this is the resting state too.
      context.globalAlpha = introFade

      for (let i = 0; i < BUCKETS; i += 1) {
        const a = ((i / (BUCKETS - 1)) * config.opacity).toFixed(3)
        context.fillStyle = `rgba(247, 245, 241, ${a})`
        context.fill(inkPath[i])
        // The accent only ever appears where the visitor is touching the field.
        context.fillStyle = `rgba(248, 107, 39, ${a})`
        context.fill(emberPath[i])
      }
    }

    // ── Loop, paused whenever it cannot be seen ────────────────────────────
    let frame = 0
    let running = false
    const swaySpeed = isMobile ? config.sway.speed.mobile : config.sway.speed.desktop

    const tick = (now: number) => {
      phase += swaySpeed

      // Both values are driven off the same clock, and either one can be the
      // last to finish — `fadeInMs` is short today, but it is a config dial and
      // a longer one must not leave the field permanently half-transparent.
      if (introProgress < 1 || introFade < 1) {
        introElapsed += lastTime < 0 ? 0 : Math.min(now - lastTime, intro.maxFrameMs)
        lastTime = now

        const gather = (introElapsed - intro.holdMs) / intro.durationMs
        introProgress = gather < 0 ? 0 : gather > 1 ? 1 : gather
        introFade = Math.min(1, introElapsed / intro.fadeInMs)

        // The glyph is there. Hand the screen over to the copy, once.
        if (!formed && introProgress >= intro.revealAt) {
          formed = true
          onFormedRef.current?.()
        }
      }

      pitchOffset += (targetPitch - pitchOffset) * config.tiltEase
      yawOffset += (targetYawOffset - yawOffset) * config.tiltEase
      draw()
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      // Nothing has elapsed between a pause and its resume, as far as the
      // gather is concerned. See the note on `introElapsed`.
      lastTime = -1
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
      pointerActive =
        pointerX > -config.cursorRadius &&
        pointerX < rect.width + config.cursorRadius &&
        pointerY > -config.cursorRadius &&
        pointerY < rect.height + config.cursorRadius

      // The whole field leans a little toward the pointer — the parallax that
      // makes it read as an object with a far side.
      targetPitch = ((pointerY / rect.height) * 2 - 1) * config.tilt
      targetYawOffset = ((pointerX / rect.width) * 2 - 1) * config.tilt
    }

    const onPointerLeave = () => {
      pointerActive = false
      targetPitch = 0
      targetYawOffset = 0
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }

    let visible = true
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting
              // Scrolling past the hero stops the loop for the entire rest of
              // the page, which is most of the page.
              if (visible && !document.hidden) start()
              else stop()
            },
            { threshold: 0 },
          )
        : null

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize()
            if (reduced) draw()
          })
        : null

    resize()
    draw()

    if (reduced) {
      // One static frame. No loop, no listeners, nothing to pause.
      resizeObserver?.observe(canvas)
      return () => resizeObserver?.disconnect()
    }

    observer?.observe(canvas)
    resizeObserver?.observe(canvas)
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("scroll", readScroll, { passive: true })

    // Pointer interaction is a desktop affordance. On touch there is no hover,
    // and running hit-tests against every point on every touchmove would cost
    // battery for an effect nobody asked for.
    if (!isMobile && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      document.addEventListener("pointerleave", onPointerLeave)
    }

    if (!observer) start()

    return () => {
      stop()
      observer?.disconnect()
      resizeObserver?.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("scroll", readScroll)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
      points = []
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  )
}

export default PointField
