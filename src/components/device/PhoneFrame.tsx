import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * The logical width every app screen is authored against.
 *
 * Screens are written once at this width and scaled to whatever size the frame
 * ends up, so a phone in the hero and a phone in a case study render the exact
 * same interface at different sizes — no duplicated markup, no font sizes that
 * drift out of proportion.
 */
export const SCREEN_WIDTH = 320
export const SCREEN_HEIGHT = 692

type PhoneFrameProps = {
  children: ReactNode
  /** Screenshot path. When set it replaces the coded screen entirely. */
  screenshot?: string
  alt?: string
  className?: string
  /** Lifts the frame with a soft bloom. Off for phones sitting behind others. */
  lit?: boolean
  /** Rendered above the screen — a floating badge, a caption. */
  overlay?: ReactNode
}

/**
 * A phone rendered in CSS, not an image.
 *
 * Reasons it is drawn rather than dropped in as a PNG: it stays sharp at any
 * size and on any density, it costs a few hundred bytes instead of a few
 * hundred kilobytes, and the screen inside is live DOM — so the interface can
 * be localised, themed per project, and read by a screen reader.
 *
 * The frame is fluid: it fills its container's width, measures the result, and
 * scales the fixed-size screen to match.
 */
const PhoneFrame = ({
  children,
  screenshot,
  alt,
  className,
  lit = true,
  overlay,
}: PhoneFrameProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // ResizeObserver rather than a media query: the frame is sized by its
    // parent's layout, which no breakpoint can predict on its own.
    if (typeof ResizeObserver === "undefined") {
      setWidth(element.getBoundingClientRect().width)
      return
    }

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Bezel scales with the frame so a small phone doesn't look chunky.
  const bezel = Math.max(width * 0.022, 2)
  const screenWidth = Math.max(width - bezel * 2, 0)
  const scale = screenWidth / SCREEN_WIDTH

  return (
    <div
      ref={ref}
      className={cn("relative isolate w-full select-none", className)}
      style={{ aspectRatio: `${SCREEN_WIDTH} / ${SCREEN_HEIGHT}` }}
    >
      {lit ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[18%] -inset-y-[8%] -z-10 rounded-[50%] bg-foreground/[0.06] blur-3xl"
        />
      ) : null}

      {/* Titanium edge. A two-stop gradient reads as a machined rail without
          costing a single extra element. */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[13%/6%] bg-gradient-to-br from-[#3A3D45] via-[#0E1013] to-[#2A2D34]"
        style={{ padding: bezel }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[12%/5.6%] bg-black">
          {screenshot ? (
            <img
              src={screenshot}
              alt={alt ?? ""}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              // Absolute, not in flow. A transform does not affect layout, so
              // an in-flow 320px screen would report a 320px min-content width
              // to every ancestor — enough to blow out a grid column on a
              // 390px phone, which `overflow-x: hidden` would then quietly
              // clip rather than reveal. Out of flow, it contributes nothing.
              className="absolute left-0 top-0"
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                // Hidden until measured, so the screen never flashes at 1:1.
                visibility: width ? "visible" : "hidden",
              }}
            >
              {children}
            </div>
          )}

          {/* Dynamic island. Sits above the screen content, inside the glass. */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
            style={{
              top: `${1.3}%`,
              width: `${26}%`,
              height: `${3.6}%`,
            }}
          />

          {/* A single diagonal sheen. The only thing selling it as glass. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent"
          />
        </div>
      </div>

      {overlay}
    </div>
  )
}

export default PhoneFrame
