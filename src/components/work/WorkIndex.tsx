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

/**
 * The projects, as a grid.
 *
 * Five case studies at full height ran to roughly nine viewports, which made
 * the section longer than the rest of the page put together — and every
 * project added after that made it worse. So the case studies moved to their
 * own pages and this is what the home carries instead.
 *
 * A grid rather than a list of rows because a row spends the page's full width
 * on two lines of type: three cells across carry the same five projects in a
 * third of the height, and the width they give back is what makes room for the
 * brand mark to be an object rather than a bullet.
 *
 * The rules are drawn by the cells (`border-b`, `border-r`) and the two outer
 * edges by the grid itself. Nothing is drawn in advance, so a last row that
 * does not fill simply ends — no dangling border waiting on a cell that never
 * comes, which is what a wrapper with all four edges would leave behind.
 *
 * What a grid of type still cannot do is show the products, which is most of
 * what the case studies were for. `WorkPreview` hands that back on hover.
 */

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

  // A draft is structure, not a case study. It stays visible so the section can
  // be worked on, but it must not invite a visitor into placeholder copy — so
  // in a production build the cell is inert. The page itself stays reachable by
  // URL for previewing.
  const openable = !project.draft || import.meta.env.DEV

  const body = (
    <>
      {/*
        The brand bloom.

        The same soft radial wash every case study composition puts behind its
        devices — which is the point: hovering a cell here should feel like the
        first frame of the page it opens. It sits behind the content on the
        cell's own stacking context, and being `pointer-events-none` it can
        never intercept an event that belongs to the link.
      */}
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
          // An arrow reads as "this opens something". A cell that opens nothing
          // gets a rule instead.
          <span aria-hidden="true" className="mt-2 block h-px w-4 bg-border" />
        )}
      </span>

      {/* The mark gets the cell's whole middle. It is the only object in an
          otherwise typographic layout, so it carries the recognition. */}
      <span className="flex flex-1 items-center justify-center py-9 md:py-11">
        <BrandMark
          project={project}
          className="h-14 w-14 shrink-0 rounded-2xl transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.07] md:h-16 md:w-16"
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

  // Pointer events rather than the mouse ones: they cover pen as well, and the
  // preview itself decides whether the device has a pointer worth following.
  const hover = {
    onPointerEnter: (event: PointerEvent) => onEnter(project, event),
    onPointerLeave: () => onLeave(project),
  }

  return (
    <li {...revealProps} className={cn(revealProps.className, project.draft && "opacity-60")}>
      {openable ? (
        // No aria-label: it would *replace* the name computed from the cell's
        // content, so a screen-reader user would hear the project's name and
        // lose the one-line description, the company, the year and the status —
        // the things a sighted visitor reads to decide whether to open it. The
        // cell's own text is a longer accessible name, and a true one.
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

/**
 * The last cell: the way out of the grid.
 *
 * It used to be a link under the section, which put the one destination that
 * leaves the site in the same position as a footnote. In the grid it can be a
 * cell — but it must not read as a sixth project, so it drops every device that
 * makes the others read as one:
 *
 *   - No number. The projects are a numbered sequence, 01 through 05; the
 *     absence of a number is the clearest signal available that this is not
 *     part of it, and it costs no ornament to say so.
 *   - An outlined mark, not a filled one. The five brand tiles are saturated
 *     gradients; this is a glyph on the page's own ground.
 *   - A neutral bloom on hover instead of a brand one — there is no brand here.
 *   - No status, no company, no year. It is a destination, not a case.
 */
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
          {/* Where the others carry their number. */}
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

/**
 * Drafts are visible while developing and absent from a production build.
 *
 * The structure has to be workable with all five cells in place, but a visitor
 * reading "Products that are out there" should not then meet two cells saying
 * "case study in progress" — that is a promise the page immediately breaks.
 */
const WorkIndex = () => {
  const [active, setActive] = useState<Hovered | null>(null)
  const projects = import.meta.env.DEV ? PROJECTS : PUBLISHED_PROJECTS

  /*
    Which project currently owns the pointer.

    React synthesises both handlers from one native `pointerout` and dispatches
    the leave before the enter, then batches the two updates into a single
    render — so crossing from one cell into the next already resolves to the new
    project without help, and this guard rejects nothing today.

    It stays because the ordering is React's, not the DOM's: were the leave ever
    to arrive after the enter, it would clear the project its neighbour had just
    set and the card would blink out at every boundary. One ref is cheap
    insurance against a failure that would be maddening to diagnose.
  */
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
