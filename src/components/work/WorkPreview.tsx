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

/** Card width, in px. Fixed, so the edge-flip can be resolved before layout. */
const WIDTH = 288
/** Gap between the pointer and the card's near corner. */
const OFFSET = 22
/** Fraction of the remaining distance closed each frame — the trail. */
const EASE = 0.16
/** Clearance kept from the viewport edge. */
const MARGIN = 14
/** Below this, the card is a shell with no figure in it yet. */
const CONTENT_HEIGHT = 40

/** A row claiming the pointer, and where the pointer was when it did. */
export type Hovered = { project: Project; x: number; y: number }

/**
 * The floating preview that follows the pointer across the work index.
 *
 * The index trades the case studies' device compositions for five lines of
 * type. That is the right trade for the page's length and the wrong one for
 * everything those compositions were doing — a visitor scanning the list has
 * no idea what any of these products actually look like. This gives that back
 * without spending a pixel of layout on it.
 *
 * Three things it deliberately is not:
 *
 *   - Not keyboard-reachable. It is anchored to a pointer position and there is
 *     no pointer in a keyboard interaction. The row already carries every fact
 *     the card repeats, so this is `aria-hidden` rather than focus-driven and a
 *     keyboard user loses nothing.
 *   - Not present on touch. `(hover: hover) and (pointer: fine)` gates it, so a
 *     phone neither renders it nor downloads the interfaces behind it.
 *   - Not shown under reduced motion. A card that teleports from row to row is
 *     worse than no card; the row's own wash still marks what is hovered.
 */
const WorkPreview = ({ active }: { active: Hovered | null }) => {
  const { pick } = useLocale()
  const card = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  // Held one render longer than `active` so the card keeps its contents while
  // it fades out, instead of emptying and then disappearing.
  const [shown, setShown] = useState<Project | null>(null)

  // Where to place the card the moment it appears. Without it the card would
  // sit at the viewport's origin until the first `pointermove` — and a pointer
  // that entered a row by scrolling, rather than by moving, never sends one.
  const origin = useRef<{ x: number; y: number } | null>(null)

  const visible = Boolean(active) && enabled

  useEffect(() => {
    if (!active) return
    origin.current = { x: active.x, y: active.y }
    setShown(active.project)
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

  /*
    Pointer tracking and the follow loop.

    The position is written straight to the node's transform rather than held
    in state: it changes every frame, and re-rendering a subtree that contains
    a scaled-down product interface sixty times a second would be an absurd way
    to move a box four pixels.
  */
  useEffect(() => {
    if (!visible) return

    const element = card.current
    if (!element) return

    const pointer = { x: origin.current?.x ?? 0, y: origin.current?.y ?? 0 }
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    // Cached rather than read on every move: `offsetHeight` forces a layout
    // flush, and this runs on a page where GSAP and Lenis already write styles
    // on a shared ticker every frame. The observer below keeps it honest.
    let height = element.offsetHeight
    let frame = 0
    let placed = false

    // The navbar is fixed, opaque once the page has scrolled, and painted above
    // this card. Clamping to `MARGIN` would slide a flipped-up card underneath
    // it in a short window.
    const top = (document.querySelector("header")?.offsetHeight ?? 64) + MARGIN

    const write = () => {
      element.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
    }

    const tick = () => {
      current.x += (target.x - current.x) * EASE
      current.y += (target.y - current.y) * EASE

      // Snap and stop once the gap is invisible, rather than burning a frame
      // every 16ms for as long as the pointer rests on a row.
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
      // Sit to the pointer's lower right, flipping on whichever axis runs out
      // of room — so the card never leaves the viewport and never lands on top
      // of the row being pointed at.
      const flipX = pointer.x + OFFSET + WIDTH > window.innerWidth - MARGIN
      const flipY = pointer.y + OFFSET + height > window.innerHeight - MARGIN

      const x = flipX ? pointer.x - OFFSET - WIDTH : pointer.x + OFFSET
      const y = flipY ? pointer.y - OFFSET - height : pointer.y + OFFSET

      const maxY = Math.max(top, window.innerHeight - height - MARGIN)
      target.x = Math.max(MARGIN, Math.min(x, window.innerWidth - WIDTH - MARGIN))
      target.y = Math.max(top, Math.min(y, maxY))

      if (!frame) frame = requestAnimationFrame(tick)
    }

    // The card appears where the pointer already is; it does not fly in from
    // wherever the last hover left it. Held until it has a figure inside it,
    // because the flip depends on a height an empty shell does not have yet.
    const settle = () => {
      if (placed || height < CONTENT_HEIGHT) return
      placed = true
      current.x = target.x
      current.y = target.y
      write()
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

    /*
      The card's height is not a constant: roughly 215px as a skeleton, 290px
      around a browser window, 360px around a phone. It changes without any
      pointer move in two ordinary cases — when the lazy chunk resolves under a
      stationary pointer, and when the pointer crosses from a phone project to
      a web one, which never re-runs this effect because `visible` stays true
      throughout. Either would leave the card aimed for the wrong size, hanging
      off the bottom of the viewport until the pointer happened to move again.
    */
    let observer: ResizeObserver | undefined

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(([entry]) => {
        height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
        aim()
        settle()
      })
      observer.observe(element)
    }

    return () => {
      window.removeEventListener("pointermove", onMove)
      observer?.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [visible])

  /*
    Rendered as soon as the device qualifies, with or without contents.

    Gating the whole element on `shown` meant that on the first hover of a
    session the follow effect ran one commit *before* the node existed: it
    found a null ref, bailed, and — because `visible` had already flipped true
    — never ran again, since its only dependency never changed. The card then
    mounted with no transform ever written to it and sat in the viewport's
    top-left corner, fully opaque, under the navbar, for the whole hover. The
    ref has to exist before the effect goes looking for it.
  */
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
            // No `visibility` toggle here: hiding the card outright in the same
            // commit that starts the fade would cut the transition this class
            // exists to run. `pointer-events-none` and `aria-hidden` already
            // make an opacity-0 card inert for pointers and assistive tech.
            "overflow-hidden rounded-xl border border-border bg-card shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)] transition-[opacity,transform] duration-300 ease-out",
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
          )}
        >
          <div
            className="flex min-h-[8.5rem] items-center justify-center p-5"
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
