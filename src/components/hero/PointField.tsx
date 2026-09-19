import { useEffect, useRef } from "react"

import { animation, MOBILE_BREAKPOINT, prefersReducedMotion } from "@/animation"
import { pointFieldIntroPlays } from "@/components/hero/pointFieldIntro"
import { cn } from "@/lib/utils"


type Point = {
  ux: number
  uy: number
  uz: number
  ox: number
  oy: number
  vx: number
  vy: number
  dx: number
  dy: number
  dmag: number
  ddelay: number
}

type Extent = { x: number; y: number; z: number }

function buildGlyph(count: number): { points: Point[]; extent: Extent } {
  const { bars, thickness: t, depth: h } = animation.pointField.glyph

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
        along = Math.random() < 0.5 ? 0 : shape.length
        across = (Math.random() * 2 - 1) * t
        z = (Math.random() * 2 - 1) * h
      } else {
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

  for (const point of points) {
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
  onFormed?: () => void
}

const PointField = ({ className, onFormed }: PointFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const bottomFade = isMobile
      ? config.disperse.bottomFade.mobile
      : config.disperse.bottomFade.desktop
    const extent = built.extent
    let points = built.points
    let width = 0
    let height = 0
    let dpr = 1

    let phase = 0
    let yawOffset = 0
    let pitchOffset = 0
    let targetYawOffset = 0
    let targetPitch = 0

    let pointerX = 0
    let pointerY = 0
    let pointerActive = false

    let scrollScatter = 0
    let heroTop = 0
    let heroHeight = 1

    const intro = config.intro
    const playIntro = pointFieldIntroPlays()
    let introProgress = playIntro ? 0 : 1
    let introFade = playIntro ? 0 : 1
    let introElapsed = 0
    let lastTime = -1
    let formed = !playIntro

    if (formed) onFormedRef.current?.()

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

      const host = canvas.offsetParent ?? canvas
      const hostRect = host.getBoundingClientRect()
      heroTop = hostRect.top + window.scrollY
      heroHeight = hostRect.height || 1
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

      const unit = Math.min(
        Math.min(width, height) * config.radius,
        (width - cx - width * config.margin) / (extent.x || 1),
        (height / 2 - height * config.margin) / (extent.y || 1),
      )

      const spread = Math.max(width, height) * config.disperse.distance

      const introScatter = intro.from * (1 - intro.ease(introProgress))
      const scatter = Math.max(scrollScatter, introScatter)
      const introShare = scatter > 0 ? introScatter / scatter : 0
      const scatterFade =
        config.disperse.fade + (intro.fade - config.disperse.fade) * introShare

      const yaw = Math.sin(phase) * config.sway.swing + yawOffset
      const pitch = config.basePitch + Math.sin(phase * 0.63) * config.sway.bob + pitchOffset

      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosX = Math.cos(pitch)
      const sinX = Math.sin(pitch)

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
        const x1 = point.ux * cosY + point.uz * sinY
        const z1 = point.uz * cosY - point.ux * sinY
        const y2 = point.uy * cosX - z1 * sinX
        const z2 = point.uy * sinX + z1 * cosX

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
          const local = (scatter - point.ddelay) / (1 - point.ddelay)

          if (local > 0) {
            const eased = local > 1 ? 1 : local * local
            const travel = eased * point.dmag * spread
            screenX += point.dx * travel
            screenY += point.dy * travel
            alpha *= 1 - eased * scatterFade
          }
        }

        if (scrollScatter > 0) {
          const fadeHeight = height * bottomFade * scrollScatter
          const fadeStart = height - fadeHeight

          if (fadeHeight > 0 && screenY > fadeStart) {
            const into = (screenY - fadeStart) / fadeHeight
            alpha *= into > 1 ? 0 : 1 - into * into
          }
        }

        if (alpha < 0.012) continue
        if (screenX < -8 || screenX > width + 8 || screenY < -8 || screenY > height + 8) continue

        const size = dotSize * (0.42 + depth * 0.95) * scale * 0.62
        const bucket = Math.min(BUCKETS - 1, Math.max(0, Math.round(alpha * (BUCKETS - 1))))

        const path = heat > config.emberThreshold ? emberPath[bucket] : inkPath[bucket]
        path.moveTo(screenX + size, screenY)
        path.arc(screenX, screenY, size, 0, Math.PI * 2)
      }

      context.globalAlpha = introFade

      for (let i = 0; i < BUCKETS; i += 1) {
        const a = ((i / (BUCKETS - 1)) * config.opacity).toFixed(3)
        context.fillStyle = `rgba(247, 245, 241, ${a})`
        context.fill(inkPath[i])
        context.fillStyle = `rgba(248, 107, 39, ${a})`
        context.fill(emberPath[i])
      }
    }

    let frame = 0
    let running = false
    const swaySpeed = isMobile ? config.sway.speed.mobile : config.sway.speed.desktop

    const tick = (now: number) => {
      phase += swaySpeed

      if (introProgress < 1 || introFade < 1) {
        introElapsed += lastTime < 0 ? 0 : Math.min(now - lastTime, intro.maxFrameMs)
        lastTime = now

        const gather = (introElapsed - intro.holdMs) / intro.durationMs
        introProgress = gather < 0 ? 0 : gather > 1 ? 1 : gather
        introFade = Math.min(1, introElapsed / intro.fadeInMs)

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
      resizeObserver?.observe(canvas)
      return () => resizeObserver?.disconnect()
    }

    observer?.observe(canvas)
    resizeObserver?.observe(canvas)
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("scroll", readScroll, { passive: true })

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
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-full w-full", className)}
    />
  )
}

export default PointField
