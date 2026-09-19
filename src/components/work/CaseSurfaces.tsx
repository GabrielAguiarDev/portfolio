import { gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import type { Project, Surface } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"


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
