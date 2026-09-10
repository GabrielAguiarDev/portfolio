import { useEffect, useRef, useState, type ReactNode } from "react"

import PhoneFrame from "@/components/device/PhoneFrame"
import { ShoppingHome } from "@/components/screens/Shopping"
import { BrowserFrame, StudioDashboard } from "@/components/screens/Studio"
import { YagoBooking } from "@/components/screens/Yago"
import type { Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"

import PreviewSkeleton from "./PreviewSkeleton"

/**
 * The interfaces the hover preview shows, and the only place they are named.
 *
 * This module is loaded lazily, on the first hover over the work index. That
 * matters: it pulls in the phone frame, the browser frame and three products'
 * screens — the same weight that was deliberately split out of the home page
 * when the case studies moved to their own routes. Paying for it when someone
 * reaches for a project is fine; paying for it on every first paint is not.
 *
 * Each project names its own preview rather than deriving one from `platforms`,
 * because the right screen to lead with is an editorial choice: Yago opens on
 * its one transactional moment, Y-Studio on the module rail that is the whole
 * argument of the product, Shopping on the storefront.
 */

/** Logical width the Y-Studio dashboard is authored against. */
const DESKTOP_WIDTH = 820

/**
 * Renders a desktop layout at its authoring width and scales the result down.
 *
 * Letting the dashboard reflow into a 260px box instead would be worse than
 * small — its module rail is behind a `sm:` breakpoint that reads the
 * *viewport*, not this container, so at preview size it would keep a 152px rail
 * inside 260px and read as broken rather than as miniature.
 *
 * This mitigates that rather than solving it: the screens are still authored
 * against viewport breakpoints, so a mouse-driven browser window under 640px
 * wide loses the rail here too. That window is narrow enough that the preview
 * is the least of it, and the alternative is container queries through every
 * screen in the project.
 */
const Miniature = ({ width, children }: { width: number; children: ReactNode }) => {
  const box = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const outer = box.current
    const inner = content.current
    if (!outer || !inner) return

    const measure = () => {
      const factor = outer.getBoundingClientRect().width / width
      setScale(factor)
      // The box takes its height from what is actually inside it. A fixed
      // aspect ratio would be unrelated to the content: too tall and the
      // browser window sits above a band of dead chrome, too short and the
      // dashboard is cropped — and which one it is would change silently every
      // time the screen it wraps grew a row.
      setHeight(inner.offsetHeight * factor)
    }

    if (typeof ResizeObserver === "undefined") {
      measure()
      return
    }

    const observer = new ResizeObserver(measure)
    observer.observe(outer)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [width])

  return (
    <div ref={box} className="w-full overflow-hidden" style={{ height: height || undefined }}>
      <div
        ref={content}
        style={{
          width,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  )
}

const FIGURES: Record<string, ReactNode> = {
  yago: (
    <div className="mx-auto w-[7.5rem]">
      <PhoneFrame lit={false}>
        <YagoBooking />
      </PhoneFrame>
    </div>
  ),
  "y-studio": (
    <BrowserFrame url="app.y-studio.com/booking">
      <Miniature width={DESKTOP_WIDTH}>
        <StudioDashboard />
      </Miniature>
    </BrowserFrame>
  ),
  "porto-seguro-shopping": (
    <div className="mx-auto w-[7.5rem]">
      <PhoneFrame lit={false}>
        <ShoppingHome />
      </PhoneFrame>
    </div>
  ),
}

/**
 * A real capture always wins over the drawn screen — the moment a project has
 * one, the preview should show the product rather than the illustration of it.
 *
 * The capture's own `frame` decides what is drawn around it, the same way
 * `CaseGallery` reads it. Assuming a phone here would put the first desktop
 * capture anyone drops into `/public/screens` inside a 120px handset — a trap
 * laid directly across the workflow `content/work.ts` documents.
 */
const PreviewFigure = ({ project }: { project: Project }) => {
  const { pick } = useLocale()
  const capture = project.figures?.[0]

  if (capture?.src) {
    const alt = capture.alt ? pick(capture.alt) : project.name

    return capture.frame === "browser" ? (
      <BrowserFrame url={capture.url ?? ""} screenshot={capture.src} alt={alt} />
    ) : (
      <div className="mx-auto w-[7.5rem]">
        <PhoneFrame lit={false} screenshot={capture.src} alt={alt} />
      </div>
    )
  }

  return <>{FIGURES[project.id] ?? <PreviewSkeleton project={project} />}</>
}

export default PreviewFigure
