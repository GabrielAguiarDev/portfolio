import { memo, useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, prefersReducedMotion } from "@/animation"
import { cn } from "@/lib/utils"

/**
 * The product, drawn as what it actually is.
 *
 * A short pile of planes in real perspective, of which the screen is only the
 * top one. Scrolling into the section pulls them apart and scrolling back
 * presses them together, because the separation is a pure function of scroll
 * position rather than a timeline with its own state — the same reason the
 * hero's point field reassembles when you drag the scrollbar upward.
 *
 * A single ember pulse travels down through the layers on its own clock, and
 * reports which layer it is passing through so the index beside the diagram
 * lights up with it. That is the whole argument of the section in one object:
 * a request enters at the top and every layer below it has to be there.
 *
 * Why canvas 2D and not SVG: the planes are re-projected every frame against
 * a live scroll position and a pointer lean, which in SVG means writing forty
 * `points` attributes into the DOM per frame. Here it is one path per plane
 * and no DOM at all.
 *
 * The geometry is fitted to the box the canvas is given at every resize, and
 * the fit is measured at the extremes of every angle the draw loop can reach
 * — so no value in the config can push the diagram outside its own section.
 *
 * Decorative: the layer names are real text in the markup beside it, so this
 * carries no information a screen reader needs and is aria-hidden.
 */

type LayerStackProps = {
  /** How many planes to draw. Must match the index rendered alongside it. */
  count: number
  /** Fires when the travelling pulse moves to a different layer, or leaves. */
  onActiveLayer?: (index: number | null) => void
  className?: string
}

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value)

/**
 * How many angles across the yaw range the fit samples.
 *
 * The silhouette is widest at `atan(halfDepth / halfWidth)`, which is an
 * interior point of the range rather than one of its ends — so sampling only
 * the endpoints under-measures the width. Sampling the range is both simpler
 * than solving for that maximum and robust to anyone changing the geometry.
 */
const FIT_SAMPLES = 9

const LayerStack = ({ count, onActiveLayer, className }: LayerStackProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Held in a ref so a parent re-render never tears down the draw loop.
  const notify = useRef(onActiveLayer)
  notify.current = onActiveLayer

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !animation.enabled.layerStack) return

    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return

    const config = animation.layerStack
    const { halfWidth: hw, halfDepth: hd } = config
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
    const reduced = prefersReducedMotion()

    /** One plane's four corners, in the plane's own space. */
    const corners: [number, number][] = [
      [-hw, -hd],
      [hw, -hd],
      [hw, hd],
      [-hw, hd],
    ]

    let width = 0
    let height = 0
    let unit = 0
    let dpr = 1

    /**
     * The opaque backing that makes a near plane read as solid over the one
     * behind it, taken from the design system rather than hardcoded — a
     * literal here would leave the planes faintly tinted against the ground
     * the moment `--background` is retuned. The fallback is that token's
     * current value, for the case where the variable cannot be read.
     */
    let backing = `rgba(9, 10, 12, ${config.alpha.backing})`

    const readBacking = () => {
      const raw = getComputedStyle(canvas).getPropertyValue("--background").trim()
      if (!raw) return

      // Canvas silently keeps the previous value when it cannot parse a
      // colour, so assign a sentinel first and only accept what changed it.
      const candidate = `hsl(${raw} / ${config.alpha.backing})`
      context.fillStyle = "#000000"
      context.fillStyle = candidate
      if (context.fillStyle !== "#000000") backing = candidate
    }

    // Scroll state. `progress` is 0 as the section enters from below and 1 as
    // it leaves at the top; the separation is derived from it every frame.
    let progress = 0
    let elementTop = 0
    let elementHeight = 1

    // Idle motion and the pointer lean, kept separate so leaning never resets
    // the sway it is added on top of.
    let phase = 0
    let yawLean = 0
    let pitchLean = 0
    let targetYawLean = 0
    let targetPitchLean = 0

    let lit: number | null = null
    const startedAt = performance.now()
    let lastFrameAt = startedAt

    /** Height of plane `i` (fractional allowed) in the stack, centred on 0. */
    const planeY = (i: number, gap: number) => (i - (count - 1) / 2) * gap

    type Projected = { x: number; y: number; z: number }

    const project = (
      x: number,
      y: number,
      z: number,
      cosY: number,
      sinY: number,
      cosX: number,
      sinX: number,
      scale: number,
      originX: number,
      originY: number,
    ): Projected => {
      // Turn around Y, then tilt around X, then a perspective divide.
      const x1 = x * cosY + z * sinY
      const z1 = z * cosY - x * sinY
      const y2 = y * cosX - z1 * sinX
      const z2 = y * sinX + z1 * cosX
      const s = config.perspective / (config.perspective - z2)

      return { x: originX + x1 * scale * s, y: originY + y2 * scale * s, z: z2 }
    }

    /**
     * Scale the fully-separated stack to the canvas.
     *
     * Only the scale is decided here, and only at resize: measuring the
     * *current* pose instead would rescale the whole diagram continuously as
     * it opens, which reads as a wobble rather than as a stack coming apart.
     * The frame then centres whatever the pose happens to be at that scale, so
     * it grows out of the middle and never drifts toward one edge.
     *
     * The pose the frame draws is the base angles plus the idle sway plus the
     * pointer lean, so all three budgets are measured here. Leaving the sway
     * and the lean out of the fit is what would let a raised `tilt.pitch` clip
     * the outer planes against the canvas with nothing here to explain it.
     */
    const fit = () => {
      const pitchReach = config.sway.pitch + config.tilt.pitch
      const yawReach = config.yaw.travel + config.sway.yaw + config.tilt.yaw
      const pitches = [config.pitch - pitchReach, config.pitch + pitchReach]

      let minX = Infinity
      let maxX = -Infinity
      let minY = Infinity
      let maxY = -Infinity

      for (const pitch of pitches) {
        const cosX = Math.cos(pitch)
        const sinX = Math.sin(pitch)

        for (let sample = 0; sample < FIT_SAMPLES; sample += 1) {
          const yaw =
            config.yaw.base - yawReach + (2 * yawReach * sample) / (FIT_SAMPLES - 1)
          const cosY = Math.cos(yaw)
          const sinY = Math.sin(yaw)

          for (let i = 0; i < count; i += 1) {
            const y = planeY(i, config.gap.expanded)

            for (const [x, z] of corners) {
              const point = project(x, y, z, cosY, sinY, cosX, sinX, 1, 0, 0)
              if (point.x < minX) minX = point.x
              if (point.x > maxX) maxX = point.x
              if (point.y < minY) minY = point.y
              if (point.y > maxY) maxY = point.y
            }
          }
        }
      }

      const spanX = maxX - minX || 1
      const spanY = maxY - minY || 1
      const room = isMobile ? config.fill.mobile : config.fill.desktop

      unit = Math.min((width * room) / spanX, (height * room) / spanY)
    }

    const readScroll = () => {
      // With motion switched off the stack is simply shown fully separated,
      // which is the state that carries the information. Reading scroll here
      // would let a resize quietly drop it back to half-open.
      if (reduced) {
        progress = 1
        return
      }

      const total = elementHeight + window.innerHeight || 1
      progress = clamp01((window.scrollY + window.innerHeight - elementTop) / total)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      dpr = Math.min(window.devicePixelRatio || 1, config.dprMax)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Cached so neither the scroll handler nor the draw loop ever reads
      // layout, which would force a reflow on every frame of every scroll.
      elementTop = rect.top + window.scrollY
      elementHeight = rect.height || 1

      readBacking()
      fit()
      readScroll()
    }

    const draw = (now: number) => {
      if (!width || !height || !unit) return

      context.clearRect(0, 0, width, height)

      // ── Pose ──────────────────────────────────────────────────────────────
      const separation = clamp01(
        (progress - config.separate.from) / (config.separate.to - config.separate.from || 1),
      )
      // Smoothstep, so the planes ease apart instead of sliding linearly.
      const opened = separation * separation * (3 - 2 * separation)
      const gap = config.gap.collapsed + (config.gap.expanded - config.gap.collapsed) * opened

      const yaw =
        config.yaw.base +
        config.yaw.travel * (progress - 0.5) +
        Math.sin(phase) * config.sway.yaw +
        yawLean
      const pitch =
        config.pitch + Math.sin(phase * 0.72) * config.sway.pitch + pitchLean

      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosX = Math.cos(pitch)
      const sinX = Math.sin(pitch)

      // ── The pulse travelling down the stack ───────────────────────────────
      // It enters above the top plane and leaves below the bottom one, so the
      // first and last layers get a full pass rather than half of one.
      const reach = config.pulse.reach
      let head = -reach - 1
      let travelling = false

      if (!reduced) {
        const cycle = ((now - startedAt) / 1000 / config.pulse.period) % 1
        head = cycle * (count - 1 + reach * 2) - reach
        travelling = true
      }

      // ── Project every plane ───────────────────────────────────────────────
      // Projected around the origin first, so the pose can be measured and
      // then centred at the scale chosen on resize. Centring the pose rather
      // than a fixed bounding box is what keeps a half-open stack in the
      // middle of its box instead of parked against one edge.
      const planes = []
      let nearest = -Infinity
      let farthest = Infinity
      let minX = Infinity
      let maxX = -Infinity
      let minY = Infinity
      let maxY = -Infinity

      for (let i = 0; i < count; i += 1) {
        const y = planeY(i, gap)
        const points = corners.map(([x, z]) =>
          project(x, y, z, cosY, sinY, cosX, sinX, unit, 0, 0),
        )
        const centre = project(0, y, 0, cosY, sinY, cosX, sinX, unit, 0, 0)

        if (centre.z > nearest) nearest = centre.z
        if (centre.z < farthest) farthest = centre.z

        for (const point of points) {
          if (point.x < minX) minX = point.x
          if (point.x > maxX) maxX = point.x
          if (point.y < minY) minY = point.y
          if (point.y > maxY) maxY = point.y
        }

        const light = travelling ? Math.max(0, 1 - Math.abs(head - i) / reach) : 0
        planes.push({ i, y, points, centre, light })
      }

      const ox = width / 2 - (minX + maxX) / 2
      const oy = height / 2 - (minY + maxY) / 2

      for (const plane of planes) {
        for (const point of plane.points) {
          point.x += ox
          point.y += oy
        }
      }

      const zSpan = nearest - farthest || 1

      // The connectors between neighbouring planes.
      //
      // Drawn as a stub in the middle of each gap rather than as one line down
      // the whole stack: the full-length version is geometrically identical
      // but closes the silhouette into a box, and the diagram stops reading as
      // layers and starts reading as a shelf. Leaving each plane its own
      // clearance is what keeps them separate things that are joined.
      if (count > 1) {
        const inset = config.spine.inset

        context.lineWidth = 1
        context.strokeStyle = `rgba(247, 245, 241, ${config.alpha.spine})`
        context.beginPath()

        for (let index = 0; index < count - 1; index += 1) {
          const upper = planes[index].points
          const lower = planes[index + 1].points

          for (let c = 0; c < corners.length; c += 1) {
            const dx = lower[c].x - upper[c].x
            const dy = lower[c].y - upper[c].y
            context.moveTo(upper[c].x + dx * inset, upper[c].y + dy * inset)
            context.lineTo(lower[c].x - dx * inset, lower[c].y - dy * inset)
          }
        }

        context.stroke()
      }

      // Painted from the bottom up: the stack is seen from slightly above, so
      // the top plane is nearest the viewer and must land last.
      for (let index = planes.length - 1; index >= 0; index -= 1) {
        const plane = planes[index]
        const near = clamp01((plane.centre.z - farthest) / zSpan)
        // Depth alone, then the pulse on top of it. The floor is high on
        // purpose: the bottom plane is the furthest from the viewer, and a
        // section arguing that the foundation is what matters cannot have the
        // foundation fade to nothing.
        const depth = 0.58 + near * 0.42
        const glow = 1 + plane.light * config.pulse.lift

        context.beginPath()
        context.moveTo(plane.points[0].x, plane.points[0].y)
        for (let c = 1; c < plane.points.length; c += 1) {
          context.lineTo(plane.points[c].x, plane.points[c].y)
        }
        context.closePath()

        // A barely-lit surface, so a plane in front reads as opaque against
        // the one behind it without a shadow anywhere in the system.
        context.fillStyle = backing
        context.fill()
        context.fillStyle = `rgba(247, 245, 241, ${(config.alpha.fill * depth * glow).toFixed(4)})`
        context.fill()

        // Ruled across both axes. This is the only thing that says "surface"
        // rather than "quadrilateral".
        context.lineWidth = 1
        context.strokeStyle = `rgba(247, 245, 241, ${(config.alpha.grid * depth).toFixed(4)})`
        context.beginPath()
        for (let k = 1; k < config.grid; k += 1) {
          const f = k / config.grid
          const z = -hd + 2 * hd * f
          const x = -hw + 2 * hw * f
          const a = project(-hw, plane.y, z, cosY, sinY, cosX, sinX, unit, ox, oy)
          const b = project(hw, plane.y, z, cosY, sinY, cosX, sinX, unit, ox, oy)
          const c = project(x, plane.y, -hd, cosY, sinY, cosX, sinX, unit, ox, oy)
          const d = project(x, plane.y, hd, cosY, sinY, cosX, sinX, unit, ox, oy)
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.moveTo(c.x, c.y)
          context.lineTo(d.x, d.y)
        }
        context.stroke()

        // The edge. The lit plane takes the accent; everything else is ink.
        // The accent is only lightly attenuated by depth — the pulse is the
        // one thing on the diagram that has to be legible wherever it is.
        context.lineWidth = plane.light > 0.5 ? 1.4 : 1
        context.strokeStyle =
          plane.light > 0.02
            ? `rgba(248, 107, 39, ${Math.min(
                1,
                config.alpha.edge * (0.75 + depth * 0.25) * (0.45 + plane.light * 1.5),
              ).toFixed(4)})`
            : `rgba(247, 245, 241, ${(config.alpha.edge * depth).toFixed(4)})`
        context.beginPath()
        context.moveTo(plane.points[0].x, plane.points[0].y)
        for (let c = 1; c < plane.points.length; c += 1) {
          context.lineTo(plane.points[c].x, plane.points[c].y)
        }
        context.closePath()
        context.stroke()
      }

      // ── The pulse itself ──────────────────────────────────────────────────
      if (travelling && head > -reach && head < count - 1 + reach) {
        const clamped = Math.max(0, Math.min(count - 1, head))
        const point = project(
          0,
          planeY(clamped, gap),
          0,
          cosY,
          sinY,
          cosX,
          sinX,
          unit,
          ox,
          oy,
        )
        // Faded at both ends of its run, so it arrives and departs rather than
        // popping into existence above the stack.
        const edge = Math.min(head + reach, count - 1 + reach - head) / reach
        const alpha = clamp01(edge) * 0.9

        // A soft halo under a hard core: at this size a bare dot on a
        // near-black ground reads as a dead pixel rather than as something
        // moving through the stack.
        context.fillStyle = `rgba(248, 107, 39, ${(alpha * 0.18).toFixed(3)})`
        context.beginPath()
        context.arc(point.x, point.y, config.pulse.dotSize * 3.2, 0, Math.PI * 2)
        context.fill()

        context.fillStyle = `rgba(248, 107, 39, ${alpha.toFixed(3)})`
        context.beginPath()
        context.arc(point.x, point.y, config.pulse.dotSize, 0, Math.PI * 2)
        context.fill()
      }

      // ── Report the lit layer upward ───────────────────────────────────────
      let active: number | null = null
      let best = config.pulse.litThreshold
      for (const plane of planes) {
        if (plane.light > best) {
          best = plane.light
          active = plane.i
        }
      }
      if (active !== lit) {
        lit = active
        notify.current?.(active)
      }
    }

    // ── Loop, paused whenever it cannot be seen ──────────────────────────────
    let frame = 0
    let running = false
    let visible = true

    const tick = (now: number) => {
      // Both the sway and the lean run on wall-clock time, like the pulse
      // does. Advancing them per callback instead would make the diagram's own
      // motions run at double speed against the pulse on a 120Hz display,
      // which is the kind of drift that only ever shows up on someone else's
      // machine. The delta is capped so a backgrounded tab returning does not
      // jump the lean in a single frame.
      const delta = Math.min((now - lastFrameAt) / 1000, 0.05)
      lastFrameAt = now

      phase = ((now - startedAt) / 1000) * config.sway.speed

      const caught = 1 - Math.pow(1 - config.tiltEase, delta * 60)
      yawLean += (targetYawLean - yawLean) * caught
      pitchLean += (targetPitchLean - pitchLean) * caught

      draw(now)
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      lastFrameAt = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      // The loop is already stopped when the section cannot be seen, so a rect
      // query here would be layout read for a frame that will never be drawn —
      // and this handler is on `window`, so it fires for the whole page.
      if (!visible) return

      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) / (rect.width || 1)
      const y = (event.clientY - rect.top) / (rect.height || 1)

      // Only while the pointer is somewhere near the diagram; a lean driven by
      // a cursor on the other side of the page is noise, not a reaction.
      if (x < -0.35 || x > 1.35 || y < -0.35 || y > 1.35) {
        targetYawLean = 0
        targetPitchLean = 0
        return
      }

      targetYawLean = (x * 2 - 1) * config.tilt.yaw
      targetPitchLean = (y * 2 - 1) * config.tilt.pitch
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize()
            if (reduced) draw(performance.now())
          })
        : null

    resize()
    draw(performance.now())

    // Webfonts land after first paint and reflow every heading above this
    // section, which moves the canvas without resizing it — so the cached
    // document offset has to be taken again or the scroll mapping is off by
    // however much the page shifted.
    let cancelled = false
    document.fonts?.ready
      .then(() => {
        if (cancelled) return
        resize()
        if (reduced) draw(performance.now())
      })
      .catch(() => {})

    if (reduced) {
      // One static frame, fully separated, no pulse. Nothing to pause, and no
      // intersection observer built for a loop that will never run.
      resizeObserver?.observe(canvas)
      return () => {
        cancelled = true
        resizeObserver?.disconnect()
      }
    }

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              // The entry carries a rect the observer measured itself, so the
              // cached document offset is corrected here for free. It has to
              // be: it is first taken while this section is still under its
              // reveal transform, and switching locale reflows every paragraph
              // above it without ever changing this canvas's size — so the
              // ResizeObserver alone catches neither shift.
              elementTop = entry.boundingClientRect.top + window.scrollY
              elementHeight = entry.boundingClientRect.height || elementHeight
              readScroll()

              visible = entry.isIntersecting
              if (visible && !document.hidden) start()
              else {
                stop()
                // Leave nothing lit behind: the index beside the diagram would
                // otherwise keep a highlight on a layer nothing is touching.
                if (lit !== null) {
                  lit = null
                  notify.current?.(null)
                }
              }
            },
            { threshold: 0 },
          )
        : null

    observer?.observe(canvas)
    resizeObserver?.observe(canvas)
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("scroll", readScroll, { passive: true })

    // Pointer lean is a desktop affordance: on touch there is no hover, and
    // the diagram already answers the scroll.
    if (!isMobile && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
    }

    if (!observer) start()

    return () => {
      cancelled = true
      stop()
      observer?.disconnect()
      resizeObserver?.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("scroll", readScroll)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  )
}

/**
 * Memoised because its only live consumer re-renders roughly once a second:
 * the parent owns the layer the pulse is passing through, and this component's
 * props never change once mounted. Without it every reported layer would
 * reconcile the canvas element again for nothing.
 */
export default memo(LayerStack)
