import { animation, useFloat, useReveal, type ResponsiveValue } from "@/animation"
import PhoneFrame from "@/components/device/PhoneFrame"
import { BrowserFrame } from "@/components/screens/Studio"
import { COPY } from "@/content/copy"
import type { Figure, Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { CaseBeats, CaseFacts, CaseTitle } from "./parts"

/**
 * Composition four — the one that is driven entirely by data.
 *
 * The other three are bespoke: each imports the screens of one specific
 * product and is tuned to exactly the devices that product needs. That is the
 * argument the section makes, and it is worth the cost — but it means a
 * project cannot exist until someone has drawn its interface in code.
 *
 * This one takes whatever `figures` it is handed, in whatever number, and
 * arranges them. It is the honest home for a project whose screens are real
 * captures rather than drawings, and the place a project starts before it has
 * earned a composition of its own. Promoting one later is a one-word change to
 * `layout` in work.ts.
 *
 * With no figures at all it renders the typography alone — which is a complete
 * and truthful case study page, just a quiet one.
 */

const Gallery = ({ project }: { project: Project }) => {
  const { pick } = useLocale()

  // Amplitudes alternate rather than being unique per index, so the group
  // reads as having depth at any count instead of only at three.
  const drifts = [
    animation.parallax.caseDeviceLead,
    animation.parallax.caseDevice,
    animation.parallax.caseCard,
  ]

  const figures = project.figures ?? []
  const phones = figures.every((figure) => (figure.frame ?? "phone") === "phone")

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${project.brand.from}1F, ${project.brand.to}12 55%, transparent 78%)`,
        }}
      />

      <ul
        className={cn(
          // A row of phones is a row; anything with a browser in it needs the
          // full width per item or the window becomes unreadable.
          phones
            ? "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 lg:gap-10"
            : "grid gap-10 md:gap-14",
        )}
      >
        {figures.map((figure, index) => (
          <GalleryFigure
            // Positional: two figures can legitimately point at the same
            // capture in different frames, which would collide on `src`.
            key={index}
            figure={figure}
            project={project}
            drift={drifts[index % drifts.length]}
            wide={!phones}
            lead={index === 0}
          />
        ))}
      </ul>

      {figures.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          {pick(COPY.work.noFigures)}
        </p>
      ) : null}
    </div>
  )
}

const GalleryFigure = ({
  figure,
  project,
  drift,
  wide,
  lead,
}: {
  figure: Figure
  project: Project
  drift: ResponsiveValue
  wide: boolean
  lead: boolean
}) => {
  const { pick } = useLocale()
  const ref = useFloat<HTMLDivElement>({ y: drift, rotate: 0 })
  const alt = figure.alt ? pick(figure.alt) : project.name

  return (
    <li
      className={cn(
        "flex flex-col items-center",
        wide ? "w-full" : "w-[62%] shrink-0 snap-center sm:w-auto",
      )}
    >
      <div ref={ref} className={cn("w-full", wide ? "" : "mx-auto max-w-[14rem]")}>
        {(figure.frame ?? "phone") === "browser" ? (
          <BrowserFrame
            url={figure.url ?? ""}
            screenshot={figure.src}
            alt={alt}
            className="shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
          />
        ) : (
          <PhoneFrame lit={lead} screenshot={figure.src} alt={alt} />
        )}
      </div>

      {figure.caption ? (
        <p className="mt-6 text-center text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {pick(figure.caption)}
        </p>
      ) : null}
    </li>
  )
}

const CaseGallery = ({ project, index }: { project: Project; index: number }) => {
  const gallery = useReveal<HTMLDivElement>({ delay: 0.08 })
  const hasFigures = (project.figures?.length ?? 0) > 0

  return (
    <article className="container pb-20 pt-10 md:pb-28 md:pt-12 lg:pb-32 lg:pt-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <CaseTitle project={project} index={index} className="lg:col-span-6" />
        <CaseBeats
          project={project}
          className="lg:col-span-5 lg:col-start-8 lg:pt-14"
          delay={0.12}
        />
      </div>

      <div
        {...gallery.revealProps}
        className={cn(gallery.revealProps.className, hasFigures ? "mt-16 md:mt-20" : "mt-12")}
      >
        <Gallery project={project} />
      </div>

      <CaseFacts
        project={project}
        className="mt-16 max-w-3xl border-t border-border pt-8 md:mt-20"
        delay={0.06}
      />
    </article>
  )
}

export default CaseGallery
