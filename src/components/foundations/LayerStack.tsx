import { memo, useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, prefersReducedMotion } from "@/animation"
import { cn } from "@/lib/utils"


type LayerStackProps = {
  count: number
  onActiveLayer?: (index: number | null) => void
  className?: string
}

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value)

const FIT_SAMPLES = 9

const LayerStack = ({ count, onActiveLayer, className }: LayerStackProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    let backing = `rgba(9, 10, 12, ${config.alpha.backing})`

    const readBacking = () => {
      const raw = getComputedStyle(canvas).getPropertyValue("--background").trim()
      if (!raw) return

      const candidate = `hsl(${raw} / ${config.alpha.backing})`
      context.fillStyle = "#000000"
      context.fillStyle = candidate
      if (context.fillStyle !== "#000000") backing = candidate
    }

    let progress = 0
    let elementTop = 0
    let elementHeight = 1

    let phase = 0
    let yawLean = 0
    let pitchLean = 0
    let targetYawLean = 0
    let targetPitchLean = 0

    let lit: number | null = null
    const startedAt = performance.now()
    let lastFrameAt = startedAt

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
      const x1 = x * cosY + z * sinY
      const z1 = z * cosY - x * sinY
      const y2 = y * cosX - z1 * sinX
      const z2 = y * sinX + z1 * cosX
      const s = config.perspective / (config.perspective - z2)

      return { x: originX + x1 * scale * s, y: originY + y2 * scale * s, z: z2 }
    }

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

      elementTop = rect.top + window.scrollY
      elementHeight = rect.height || 1

      readBacking()
      fit()
      readScroll()
    }

    const draw = (now: number) => {
      if (!width || !height || !unit) return

      context.clearRect(0, 0, width, height)

      const separation = clamp01(
        (progress - config.separate.from) / (config.separate.to - config.separate.from || 1),
      )
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

      const reach = config.pulse.reach
      let head = -reach - 1
      let travelling = false

      if (!reduced) {
        const cycle = ((now - startedAt) / 1000 / config.pulse.period) % 1
        head = cycle * (count - 1 + reach * 2) - reach
        travelling = true
      }

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

      for (let index = planes.length - 1; index >= 0; index -= 1) {
        const plane = planes[index]
        const near = clamp01((plane.centre.z - farthest) / zSpan)
        const depth = 0.58 + near * 0.42
        const glow = 1 + plane.light * config.pulse.lift

        context.beginPath()
        context.moveTo(plane.points[0].x, plane.points[0].y)
        for (let c = 1; c < plane.points.length; c += 1) {
          context.lineTo(plane.points[c].x, plane.points[c].y)
        }
        context.closePath()

        context.fillStyle = backing
        context.fill()
        context.fillStyle = `rgba(247, 245, 241, ${(config.alpha.fill * depth * glow).toFixed(4)})`
        context.fill()

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
        const edge = Math.min(head + reach, count - 1 + reach - head) / reach
        const alpha = clamp01(edge) * 0.9

        context.fillStyle = `rgba(248, 107, 39, ${(alpha * 0.18).toFixed(3)})`
        context.beginPath()
        context.arc(point.x, point.y, config.pulse.dotSize * 3.2, 0, Math.PI * 2)
        context.fill()

        context.fillStyle = `rgba(248, 107, 39, ${alpha.toFixed(3)})`
        context.beginPath()
        context.arc(point.x, point.y, config.pulse.dotSize, 0, Math.PI * 2)
        context.fill()
      }

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

    let frame = 0
    let running = false
    let visible = true

    const tick = (now: number) => {
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
      if (!visible) return

      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) / (rect.width || 1)
      const y = (event.clientY - rect.top) / (rect.height || 1)

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

    let cancelled = false
    document.fonts?.ready
      .then(() => {
        if (cancelled) return
        resize()
        if (reduced) draw(performance.now())
      })
      .catch(() => {})

    if (reduced) {
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
              elementTop = entry.boundingClientRect.top + window.scrollY
              elementHeight = entry.boundingClientRect.height || elementHeight
              readScroll()

              visible = entry.isIntersecting
              if (visible && !document.hidden) start()
              else {
                stop()
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

export default memo(LayerStack)
