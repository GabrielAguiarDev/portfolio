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

  /*
    Whether the card has been placed, and may therefore be seen.

    Separate from `visible` because the two answer different questions: whether
    a row wants a card, and whether that card is standing where it belongs yet.
    Driving the opacity off `visible` alone is why the card never actually
    faded in — the inner element mounted with the visible class already on it,
    and a CSS transition does not run on mount. It simply appeared, which after
    a placement delay reads as a stutter rather than as an entrance.
  */
  const [ready, setReady] = useState(false)

  // Where to place the card the moment it appears. Without it the card would
  // sit at the viewport's origin until the first `pointermove` — and a pointer
  // that entered a row by scrolling, rather than by moving, never sends one.
  const origin = useRef<{ x: number; y: number } | null>(null)

  const visible = Boolean(active) && enabled

  /*
    Derived during render, not in an effect.

    It used to be assigned from `useEffect([active])`, which cost a whole commit
    before the card had any contents — and the placement effect, which runs in
    the commit where `visible` flips, therefore measured an empty box and had to
    wait a frame for a real height. Adjusting the state during render is the
    supported way to do this: React re-renders immediately, without painting the
    intermediate result, so the card arrives already holding a project and the
    placement can happen straight away.
  */
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

    const hasObserver = typeof ResizeObserver !== "undefined"

    // Frames to wait for the card to have contents at all. It needs one in the
    // ordinary case; the budget is for the pathological one.
    let patience = 30
    let pendingReveal = 0

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

      // The trail is only ever a response to pointer movement. Before the card
      // has been placed there is nothing to trail *from* — easing out of
      // whatever transform the element happens to be carrying is how it flies
      // in from the corner.
      if (placed && !frame) frame = requestAnimationFrame(tick)
    }

    /** Put the card on its target now, with no interpolation. */
    const place = () => {
      current.x = target.x
      current.y = target.y
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      write()
    }

    // The card appears where the pointer already is; it does not fly in from
    // wherever the last hover left it. Held until it has a figure inside it,
    // because the flip depends on a height an empty shell does not have yet —
    // and hidden until then, so the one frame it might spend at a stale
    // transform is a frame nobody sees.
    /**
     * Show the card, once, in the right place.
     *
     * One frame of patience, and only because the card has no content in the
     * commit that starts this effect — `shown` is set from an effect, so the
     * first pass measures an empty box. The frame after that, the box is its
     * full and final height, because the figure lives in a fixed-size well:
     * whatever is inside can measure and scale itself for as long as it likes
     * without the card around it ever changing size.
     *
     * That is what makes the placement trustworthy on the first try. The
     * flip above or below the pointer is computed against a height that is
     * already correct, so there is no correction to chase afterwards — which
     * is the difference between a card that appears and a card that appears
     * and then tidies itself up.
     */
    const settle = () => {
      if (placed || pendingReveal) return

      // The observer is the only thing that keeps `height` current, so without
      // one this has to read the box itself — otherwise the card would never
      // clear `CONTENT_HEIGHT` and would stay hidden for good.
      if (!hasObserver) height = element.offsetHeight

      if (height < CONTENT_HEIGHT) {
        // No contents yet. Come back next frame; the budget is for the
        // pathological case, since the ordinary one resolves on the first try.
        if (patience <= 0) return
        patience -= 1
        pendingReveal = requestAnimationFrame(() => {
          pendingReveal = 0
          settle()
        })
        return
      }

      // Positioned immediately, revealed one frame later — deliberately. The
      // transition needs a painted frame at `opacity-0` to transition *from*;
      // flipping both in the same commit is how the card ends up appearing
      // rather than arriving.
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

        /*
          Already placed, and the box changed size under a pointer that did not
          move. `aim()` has just written a new target — often a *long* way from
          the old one, because crossing `CONTENT_HEIGHT` or swapping a browser
          card for a phone card can flip the whole thing to the other side of
          the pointer, some 400px up.

          Easing that is the bug: the trail exists to make the card feel
          attached to the pointer, and there is no pointer gesture here to be
          attached to. What the eye reads instead is the card sitting in the
          wrong place and then hurriedly correcting itself. A correction the
          visitor did not ask for should be instantaneous.
        */
        if (grew) place()
      })
      observer.observe(element)
    }

    return () => {
      window.removeEventListener("pointermove", onMove)
      observer?.disconnect()
      if (frame) cancelAnimationFrame(frame)
      if (pendingReveal) cancelAnimationFrame(pendingReveal)
      // Back to unplaced: the next hover starts somewhere else and has to earn
      // its position again before it is allowed to be seen.
      setReady(false)
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
            "overflow-hidden rounded-xl border border-border bg-card shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)] transition-[opacity,transform] duration-150 ease-out",
            visible && ready ? "scale-100 opacity-100" : "scale-95 opacity-0",
          )}
        >
          <div
            /*
              Fixed, not `min-h`. The card's height used to be whatever the
              figure inside it turned out to be — which is a number that only
              exists after the figure has measured its own container and scaled
              itself, two frames later, and which differs by ~40px between a
              bare browser window and one with a phone hanging off it.

              Everything unpleasant about this card came from that: the flip
              above/below the pointer was computed against a height that was
              still wrong, the correction had to be chased afterwards, and
              crossing from one project to another resized the card under a
              stationary pointer. A constant box removes the whole class of
              problem — the position is right on the first frame, and there is
              nothing left to correct.
            */
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
