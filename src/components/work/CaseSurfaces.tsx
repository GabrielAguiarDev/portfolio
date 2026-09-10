import { gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import type { Project, Surface } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The system, laid out as its parts.
 *
 * This is the section that makes a case study honest. Every product here is
 * several pieces serving several different people: a panel the staff work in
 * all day, an app the customer holds, a second app for the people serving that
 * customer, an admin nobody outside the company ever opens. A composition of
 * two phones shows one of those and implies the product is the phone.
 *
 * The badge and the name are what a skim picks up. `audience` is what makes it
 * mean anything: two management panels look identical in a screenshot and are
 * entirely different products once you know one belongs to a shop owner and the
 * other to the person running the platform they are on.
 *
 * Rendered uniformly for every project rather than folded into each bespoke
 * composition. The compositions exist to give each product its own character;
 * this is structure, and structure the reader is comparing across projects
 * should not change shape between them.
 */

const SurfaceCell = ({
  surface,
  project,
  index,
}: {
  surface: Surface
  project: Project
  index: number
}) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })

  const badge = surface.platforms ?? [surface.kind === "web" ? "Web" : "Mobile"]

  return (
    <li
      {...revealProps}
      className={cn(
        revealProps.className,
        "flex flex-col border-b border-r border-border p-6 md:p-7",
      )}
    >
      <span
        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
        style={{ color: project.brand.from }}
      >
        {badge.join(" · ")}
      </span>

      <h3 className="display-sm mt-4 text-balance text-foreground">{pick(surface.name)}</h3>

      <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        {pick(surface.purpose)}
      </p>

      <p className="mt-5 border-t border-border pt-3.5 text-[0.8125rem] tracking-tight text-foreground/85">
        <span className="text-muted-foreground">{pick(COPY.work.surfaceAudience)} </span>
        {pick(surface.audience)}
      </p>
    </li>
  )
}

const CaseSurfaces = ({ project }: { project: Project }) => {
  const { pick } = useLocale()
  const header = useReveal<HTMLDivElement>()

  if (!project.surfaces.length) return null

  return (
    <section className="container pb-20 md:pb-28">
      <div {...header.revealProps} className={cn(header.revealProps.className, "max-w-[52ch]")}>
        <p className="eyebrow">
          {pick(COPY.work.surfaces)}
          <span className="text-muted-foreground/60">
            {" · "}
            {project.surfaces.length} {pick(COPY.work.surfaceCount)}
          </span>
        </p>

        <h2 className="display-sm mt-4 text-balance text-foreground">
          {pick(COPY.work.surfacesTitle)}
        </h2>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
          {pick(COPY.work.surfacesLead)}
        </p>
      </div>

      {/* Same rule grid as the work index: cells draw the bottom and right
          edges, the list draws the top and left, so a last row that does not
          fill simply ends. */}
      <ul className="mt-12 grid border-l border-t border-border sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {project.surfaces.map((surface, index) => (
          <SurfaceCell
            key={surface.name.en}
            surface={surface}
            project={project}
            index={index}
          />
        ))}
      </ul>
    </section>
  )
}

export default CaseSurfaces
