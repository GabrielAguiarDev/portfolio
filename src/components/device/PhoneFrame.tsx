import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export const SCREEN_WIDTH = 320
export const SCREEN_HEIGHT = 692

type PhoneFrameProps = {
  children?: ReactNode
  screenshot?: string
  alt?: string
  className?: string
  lit?: boolean
  overlay?: ReactNode
}

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
              className="absolute left-0 top-0"
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                visibility: width ? "visible" : "hidden",
              }}
            >
              {children}
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
            style={{
              top: `${1.3}%`,
              width: `${26}%`,
              height: `${3.6}%`,
            }}
          />

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
