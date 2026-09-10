import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { refreshScrollTriggers } from "@/animation"
import PageShell from "@/components/layout/PageShell"
import CaseConstellation from "@/components/work/CaseConstellation"
import CaseGallery from "@/components/work/CaseGallery"
import CaseImmersive from "@/components/work/CaseImmersive"
import { CaseNavNext, CaseNavTop } from "@/components/work/CaseNav"
import CaseSurfaces from "@/components/work/CaseSurfaces"
import CaseShowcase from "@/components/work/CaseShowcase"
import { COPY } from "@/content/copy"
import { PROJECTS, findProject, type Layout, type Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

import NotFound from "./NotFound"

/**
 * One project, one page.
 *
 * Each project still picks its own composition — repeating one layout five
 * times would turn a portfolio of products back into a grid of cards, which is
 * the one thing this section exists to avoid. `gallery` is the exception: it is
 * driven by data rather than tuned by hand, and it is where a project lives
 * before it has earned a composition of its own.
 */
const LAYOUTS: Record<Layout, (props: { project: Project; index: number }) => JSX.Element> = {
  showcase: CaseShowcase,
  immersive: CaseImmersive,
  constellation: CaseConstellation,
  gallery: CaseGallery,
}

/** The banner a case study carries while it is structure rather than content. */
const DraftNotice = () => {
  const { pick } = useLocale()

  return (
    <div className="container mt-8">
      <div className="rounded-2xl border border-dashed border-border bg-card/40 px-5 py-4">
        <p className="eyebrow">{pick(COPY.work.draft)}</p>
        <p className="mt-2 max-w-[62ch] text-pretty text-sm leading-relaxed text-muted-foreground">
          {pick(COPY.work.draftBody)}
        </p>
      </div>
    </div>
  )
}

const WorkDetail = () => {
  const { id } = useParams()
  const { pick } = useLocale()
  const project = findProject(id)

  // Every hook has to run before the 404 branch, so the metadata falls back to
  // values that are correct for a missing project rather than being skipped.
  const title = project ? `${project.name} — Gabriel Aguiar` : "Gabriel Aguiar"
  const description = project && !project.draft ? pick(project.summary) : ""

  useDocumentMeta({
    title,
    description,
    // Self-canonical when the project is unknown. Pointing a noindex page's
    // canonical at the home page asks Google to treat the two as the same URL
    // *and* to drop it — a combination that can carry the noindex across to the
    // target, which here is the site's most important page.
    path: project ? `/work/${project.id}` : window.location.pathname,
    // A placeholder page indexed by Google is worse than no page: it is a real
    // URL, on a real domain, saying nothing. Drafts stay out until written.
    noindex: !project || Boolean(project.draft),
  })

  // The case study arrives in a lazy chunk, so the document's height changes
  // one commit after the route did — after `useRouteScroll` has already taken
  // its measurement.
  useEffect(() => {
    if (!project) return
    const frame = requestAnimationFrame(refreshScrollTriggers)
    return () => cancelAnimationFrame(frame)
  }, [project])

  if (!project) return <NotFound />

  const Case = LAYOUTS[project.layout]
  const index = PROJECTS.findIndex((entry) => entry.id === project.id)

  return (
    <PageShell>
      <CaseNavTop />
      {project.draft ? <DraftNotice /> : null}
      <Case project={project} index={index} />
      {/* After the composition, not inside it: the composition gives a product
          its character, this is the structure a reader compares across
          projects, and structure should not change shape between them. */}
      <CaseSurfaces project={project} />
      <CaseNavNext project={project} />
    </PageShell>
  )
}

export default WorkDetail
