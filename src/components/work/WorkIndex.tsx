import { useCallback, useRef, useState, type PointerEvent } from "react"
import { ArrowUpRight, Github } from "lucide-react"
import { Link } from "react-router-dom"

import { gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { LINKS } from "@/content/profile"
import { PROJECTS, PUBLISHED_PROJECTS, type Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { BrandMark, CaseIndex, StatusPill } from "./parts"
import { prefetchPreview } from "./previewLoader"
import WorkPreview, { type Hovered } from "./WorkPreview"


const Cell = ({
  project,
  index,
  onEnter,
  onLeave,
}: {
  project: Project
  index: number
  onEnter: (project: Project, event: PointerEvent) => void
  onLeave: (project: Project) => void
}) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })

  const meta = [project.context.company, project.year].filter(Boolean)

  const openable = !project.draft || import.meta.env.DEV

  const body = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background: `radial-gradient(closest-side, ${project.brand.from}3D, ${project.brand.to}1F 55%, transparent 78%)`,
        }}
      />

      <span className="flex items-start justify-between">
        <CaseIndex index={index} />
        {openable ? (
          <ArrowUpRight
            size={17}
            strokeWidth={1.5}
            className="text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        ) : (
          <span aria-hidden="true" className="mt-2 block h-px w-4 bg-border" />
        )}
      </span>

      <span className="relative flex flex-1 items-center justify-center py-9 md:py-11">
        <span
          aria-hidden="true"
          className="absolute h-20 w-20 rounded-full opacity-25 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-50 group-focus-visible:scale-125 group-focus-visible:opacity-50 md:h-24 md:w-24"
          style={{ background: project.brand.from }}
        />
        <BrandMark
          project={project}
          className="relative h-20 w-20 shrink-0 rounded-[1.375rem] shadow-[0_18px_45px_-22px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.05] md:h-24 md:w-24 md:rounded-[1.625rem]"
        />
      </span>

      <span className="block">
        <span className="display-sm rule-link text-foreground">{project.name}</span>

        <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
          {project.draft ? pick(COPY.work.draft) : pick(project.kind)}
        </span>
      </span>

      <span className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-3.5">
        <span className="truncate font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground">
          {meta.join(" · ")}
        </span>
        {project.draft ? null : (
          <span className="shrink-0">
            <StatusPill status={project.status} />
          </span>
        )}
      </span>
    </>
  )

  const shared =
    "work-cell group relative isolate flex h-full flex-col border-b border-r border-border p-6 md:p-7"

  const hover = {
    onPointerEnter: (event: PointerEvent) => onEnter(project, event),
    onPointerLeave: () => onLeave(project),
  }

  return (
    <li {...revealProps} className={cn(revealProps.className, project.draft && "opacity-60")}>
      {openable ? (
        <Link to={`/work/${project.id}`} {...hover} className={shared}>
          {body}
        </Link>
      ) : (
        <div {...hover} className={shared}>
          {body}
        </div>
      )}
    </li>
  )
}

const GithubCell = () => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(2) })

  return (
    <li {...revealProps}>
      <a
        href={`${LINKS.github}?tab=repositories`}
        target="_blank"
        rel="noreferrer noopener"
        className="work-cell group relative isolate flex h-full flex-col border-b border-r border-border bg-foreground/[0.015] p-6 md:p-7"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.08),transparent_76%)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
        />

        <span className="flex items-start justify-between">
          <span
            aria-hidden="true"
            className="font-mono text-[0.6875rem] tracking-[0.1em] text-muted-foreground"
          >
            +
          </span>
          <ArrowUpRight
            size={17}
            strokeWidth={1.5}
            className="text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        </span>

        <span className="flex flex-1 items-center justify-center py-9 md:py-11">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border text-muted-foreground transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.07] group-hover:border-foreground/25 group-hover:text-foreground md:h-16 md:w-16">
            <Github size={26} strokeWidth={1.25} aria-hidden="true" />
          </span>
        </span>

        <span className="block">
          <span className="display-sm rule-link text-foreground">{pick(COPY.work.more)}</span>

          <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
            {pick(COPY.work.moreKind)}
          </span>
        </span>

        <span className="mt-5 block border-t border-border pt-3.5">
          <span className="truncate font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground">
            {LINKS.github.replace("https://", "")}
          </span>
        </span>
      </a>
    </li>
  )
}

const WorkIndex = () => {
  const [active, setActive] = useState<Hovered | null>(null)
  const projects = import.meta.env.DEV ? PROJECTS : PUBLISHED_PROJECTS

  const owner = useRef<string | null>(null)

  const onEnter = useCallback((project: Project, event: PointerEvent) => {
    owner.current = project.id
    setActive({ project, x: event.clientX, y: event.clientY })
  }, [])

  const onLeave = useCallback((project: Project) => {
    if (owner.current !== project.id) return
    owner.current = null
    setActive(null)
  }, [])

  return (
    <>
      <ul
        className="mt-14 grid border-l border-t border-border sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
        onPointerEnter={prefetchPreview}
      >
        {projects.map((project, index) => (
          <Cell
            key={project.id}
            project={project}
            index={index}
            onEnter={onEnter}
            onLeave={onLeave}
          />
        ))}

        <GithubCell />
      </ul>

      <WorkPreview active={active} />
    </>
  )
}

export default WorkIndex
