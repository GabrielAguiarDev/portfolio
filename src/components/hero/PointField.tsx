import { useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, prefersReducedMotion } from "@/animation"
import { cn } from "@/lib/utils"

/**
 * The object behind the hero.
 *
 * A sphere of points, projected in real perspective, turning slowly on its own
 * axis. It leans toward the pointer and the points nearest the cursor are
 * shoved outward, then spring back — so the field reads as something physically
 * there rather than a looping background video.
 *
 * Why a sphere of points and not a galaxy or a formed glyph: the phones already
 * say "mobile". This has to say "engineering" without adding one more piece of
 * app iconography, and it has to be its own object rather than a nod to
 * somebody else's landing page.
 *
 * Why canvas 2D and not WebGL/three.js: 880 points is nowhere near needing a
 * GPU pipeline, and three.js would add ~150kB gzip to a page whose entire
 * argument is that its author knows what a bundle costs. The whole effect is a
 * few hundred lines and no dependency.
 *
 * It is decorative, so it is aria-hidden and pointer-events-none. It never
 * intercepts a click meant for the buttons sitting on top of it.
 */

type Point = {
  /** Position on the unit sphere. */
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

/**
 * Fibonacci sphere: the cheapest way to scatter points over a sphere without
 * the clumping at the poles that naive lat/long sampling produces.
 */
function buildSphere(count: number): Point[] {
  const points: Point[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i += 1) {
    const uy = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(Math.max(1 - uy * uy, 0))
    const theta = golden * i

    const ux = Math.cos(theta) * ring
    const uz = Math.sin(theta) * ring

    // Mostly random, with a bias straight out from the centre. Pure randomness
    // sends half the points inward first and the scatter reads as mush; pure
    // outward reads as a firework. The blend looks like something coming apart.
    const angle = Math.random() * Math.PI * 2
    const r = animation.pointField.disperse.randomness
    let dx = Math.cos(angle) * r + ux * (1 - r)
    let dy = Math.sin(angle) * r + uy * (1 - r)
    const length = Math.hypot(dx, dy) || 1
    dx /= length
    dy /= length

    points.push({
      ux,
      uy,
      uz,
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      dx,
      dy,
      dmag: 0.45 + Math.random() * 0.95,
      ddelay: Math.random() * animation.pointField.disperse.stagger,
    })
  }

  return points
}

const PointField = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !animation.enabled.pointField) return

    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return

    const config = animation.pointField
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
    const reduced = prefersReducedMotion()

    let points = buildSphere(isMobile ? config.count.mobile : config.count.desktop)
    let width = 0
    let height = 0
    let dpr = 1

    // `yaw` accumulates the unattended rotation forever. The pointer lean is a
    // separate offset added on top, so leaning never fights or resets the spin.
    let yaw = 0.6
    let yawOffset = 0
    let pitch = -0.12
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
    let scatter = 0
    let heroTop = 0
    let heroHeight = 1

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
      const span = heroHeight * config.disperse.span
      const raw = (window.scrollY - heroTop) / (span || 1)
      scatter = raw < 0 ? 0 : raw > 1 ? 1 : raw
    }

    const draw = () => {
      if (!width || !height) return

      context.clearRect(0, 0, width, height)

      const cx = width * (isMobile ? config.center.mobile : config.center.desktop)
      const cy = height / 2
      const radius = Math.min(width, height) * config.radius
      const spread = Math.max(width, height) * config.disperse.distance
      const cosY = Math.cos(yaw + yawOffset)
      const sinY = Math.sin(yaw + yawOffset)
      const cosX = Math.cos(pitch)
      const sinX = Math.sin(pitch)

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

        // Perspective divide. Points at the front of the sphere are larger and
        // brighter than the ones showing through from the back.
        const scale = config.perspective / (config.perspective - z2)
        const baseX = cx + x1 * radius * scale
        const baseY = cy + y2 * radius * scale
        const depth = (z2 + 1) / 2

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
          // Each point starts moving at its own moment, so the sphere comes
          // apart in a cascade instead of every point leaving at once.
          const local = (scatter - point.ddelay) / (1 - point.ddelay)

          if (local > 0) {
            const eased = local > 1 ? 1 : local * local
            const travel = eased * point.dmag * spread
            screenX += point.dx * travel
            screenY += point.dy * travel
            alpha *= 1 - eased * 0.88
          }
        }

        // Dissolve into the canvas's bottom edge instead of being cut off by
        // it. Scaled by `scatter`, so the resting sphere is untouched.
        if (scatter > 0) {
          const fadeHeight = height * config.disperse.bottomFade * scatter
          const fadeStart = height - fadeHeight

          if (fadeHeight > 0 && screenY > fadeStart) {
            const into = (screenY - fadeStart) / fadeHeight
            alpha *= into > 1 ? 0 : 1 - into * into
          }
        }

        // Nothing worth drawing: fully faded, or flung past the canvas.
        if (alpha < 0.012) continue
        if (screenX < -8 || screenX > width + 8 || screenY < -8 || screenY > height + 8) continue

        const size = config.dotSize * (0.42 + depth * 0.95) * scale * 0.62
        const bucket = Math.min(BUCKETS - 1, Math.max(0, Math.round(alpha * (BUCKETS - 1))))

        // The accent is spent only on the points the visitor is actually
        // touching, which is what keeps it feeling like a reaction rather
        // than a colour scheme.
        const path = heat > config.emberThreshold ? emberPath[bucket] : inkPath[bucket]
        path.moveTo(screenX + size, screenY)
        path.arc(screenX, screenY, size, 0, Math.PI * 2)
      }

      context.globalAlpha = 1

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
    const autoYaw = isMobile ? config.autoYaw.mobile : config.autoYaw.desktop

    const tick = () => {
      yaw += autoYaw
      pitch += (targetPitch - pitch) * config.tiltEase
      yawOffset += (targetYawOffset - yawOffset) * config.tiltEase
      draw()
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduced) return
      running = true
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
