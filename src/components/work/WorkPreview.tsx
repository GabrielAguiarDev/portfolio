import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { prefersReducedMotion } from "@/animation"
import { COPY } from "@/content/copy"
import type { Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import PreviewSkeleton from "./PreviewSkeleton"
import { loadPreviewFigures } from "./previewLoader"

const PreviewFigure = lazy(loadPreviewFigures)

const WIDTH = 288
const OFFSET = 22
const EASE = 0.16
const MARGIN = 14
const CONTENT_HEIGHT = 40

export type Hovered = { project: Project; x: number; y: number }

const WorkPreview = ({ active }: { active: Hovered | null }) => {
  const { pick } = useLocale()
  const card = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  const [shown, setShown] = useState<Project | null>(null)

  const [ready, setReady] = useState(false)

  const origin = useRef<{ x: number; y: number } | null>(null)

  const visible = Boolean(active) && enabled

  if (active && active.project !== shown) setShown(active.project)

  useEffect(() => {
    if (!active) return
    origin.current = { x: active.x, y: active.y }
  }, [active])

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    if (prefersReducedMotion()) return

    const query = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => setEnabled(query.matches)

    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!visible) return

    const element = card.current
    if (!element) return

    const pointer = { x: origin.current?.x ?? 0, y: origin.current?.y ?? 0 }
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    let height = element.offsetHeight
    let frame = 0
    let placed = false

    const hasObserver = typeof ResizeObserver !== "undefined"

    let patience = 30
    let pendingReveal = 0

    const top = (document.querySelector("header")?.offsetHeight ?? 64) + MARGIN

    const write = () => {
      element.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
    }

    const tick = () => {
      current.x += (target.x - current.x) * EASE
      current.y += (target.y - current.y) * EASE

      if (Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1) {
        current.x = target.x
        current.y = target.y
        write()
        frame = 0
        return
      }

      write()
      frame = requestAnimationFrame(tick)
    }

    const aim = () => {
      const flipX = pointer.x + OFFSET + WIDTH > window.innerWidth - MARGIN
      const flipY = pointer.y + OFFSET + height > window.innerHeight - MARGIN

      const x = flipX ? pointer.x - OFFSET - WIDTH : pointer.x + OFFSET
      const y = flipY ? pointer.y - OFFSET - height : pointer.y + OFFSET

      const maxY = Math.max(top, window.innerHeight - height - MARGIN)
      target.x = Math.max(MARGIN, Math.min(x, window.innerWidth - WIDTH - MARGIN))
      target.y = Math.max(top, Math.min(y, maxY))

      if (placed && !frame) frame = requestAnimationFrame(tick)
    }

    const place = () => {
      current.x = target.x
      current.y = target.y
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      write()
    }

    const settle = () => {
      if (placed || pendingReveal) return

      if (!hasObserver) height = element.offsetHeight

      if (height < CONTENT_HEIGHT) {
        if (patience <= 0) return
        patience -= 1
        pendingReveal = requestAnimationFrame(() => {
          pendingReveal = 0
          settle()
        })
        return
      }

      placed = true
      aim()
      place()
      pendingReveal = requestAnimationFrame(() => {
        pendingReveal = 0
        setReady(true)
      })
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      aim()
      settle()
    }

    aim()
    settle()
    window.addEventListener("pointermove", onMove, { passive: true })

    let observer: ResizeObserver | undefined

    if (hasObserver) {
      observer = new ResizeObserver(([entry]) => {
        const measured = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
        const grew = Math.abs(measured - height) > 0.5
        height = measured
        aim()

        if (!placed) {
          settle()
          return
        }

        if (grew) place()
      })
      observer.observe(element)
    }

    return () => {
      window.removeEventListener("pointermove", onMove)
      observer?.disconnect()
      if (frame) cancelAnimationFrame(frame)
      if (pendingReveal) cancelAnimationFrame(pendingReveal)
      setReady(false)
    }
  }, [visible])

  if (!enabled) return null

  return (
    <div
      ref={card}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-40",
        visible && "will-change-transform",
      )}
      style={{ width: WIDTH }}
    >
      {shown ? (
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-border bg-card shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)] transition-[opacity,transform] duration-150 ease-out",
            visible && ready ? "scale-100 opacity-100" : "scale-95 opacity-0",
          )}
        >
          <div
            className="flex h-[13.5rem] items-center justify-center p-5"
            style={{
              background: `linear-gradient(155deg, ${shown.brand.from}26, ${shown.brand.to}14)`,
            }}
          >
            <Suspense fallback={<PreviewSkeleton project={shown} />}>
              <PreviewFigure project={shown} />
            </Suspense>
          </div>

          <div className="flex items-center gap-3 border-t border-border px-4 py-3.5">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem] font-semibold tracking-tight text-foreground">
                {shown.name}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {shown.draft ? pick(COPY.work.draft) : pick(shown.kind)}
              </span>
            </span>
            <ArrowUpRight size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default WorkPreview
