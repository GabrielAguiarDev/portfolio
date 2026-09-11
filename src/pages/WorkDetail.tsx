import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"

import { refreshScrollTriggers } from "@/animation"
import PageShell from "@/components/layout/PageShell"
import CaseGallery from "@/components/work/CaseGallery"
import { CaseNavNext, CaseNavTop } from "@/components/work/CaseNav"
import CaseStage, { CaseField } from "@/components/work/CaseStage"
import CaseSurfaces from "@/components/work/CaseSurfaces"
import { STAGES } from "@/components/work/stages"
import { COPY } from "@/content/copy"
import { SITE_URL } from "@/content/profile"
import { PROJECTS, findProject, platformsOf, type Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

import NotFound from "./NotFound"

/**
 * One project, one page.
 *
 * There used to be three hand-tuned compositions and a data-driven fallback,
 * on the theory that repeating one layout would turn a portfolio of products
 * back into a grid of cards. In practice the three drifted — the same fact
 * staged three ways, and each sized on its own, so one ran off the screen while
 * another was too small to register. `CaseStage` is the single composition they
 * collapsed into; what varies between projects is what they put on it, which
 * lives in `stages.tsx`.
 *
 * `gallery` survives as the honest home for a project whose screens are real
 * captures rather than drawings.
 */

/**
 * What kind of application each product is, in schema.org's vocabulary.
 *
 * Named per project rather than derived from `sector`, because the sector
 * describes the customer's industry and this describes the software. Absent a
 * good match the key is simply left out and the type falls back to the generic
 * one — an inaccurate category is worse than none, since it is the field a
 * search engine uses to decide what the thing *is*.
 */
const APPLICATION_CATEGORY: Record<string, string> = {
  yago: "TravelApplication",
  "y-studio": "BusinessApplication",
  "porto-seguro-shopping": "ShoppingApplication",
  "aguiar-one": "BusinessApplication",
  vez: "BusinessApplication",
}

/**
 * Structured data for one case study.
 *
 * `SoftwareApplication` and not `CreativeWork`: these are real products running
 * in production, and the generic type would describe them as documents. The
 * breadcrumb exists because a case study is two levels deep and the path is not
 * inferable from a flat URL.
 *
 * Every value comes from the project record, so it cannot drift from what the
 * page says. Nothing is invented — no `aggregateRating`, no `offers`, no
 * `downloadUrl`, none of which this portfolio has any basis to claim.
 */
function caseSchema(project: Project, description: string, locale: string) {
  const url = `${SITE_URL}/work/${project.id}`
  const person = `${SITE_URL}/#person`
  const category = APPLICATION_CATEGORY[project.id]

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        name: project.name,
        url,
        ...(description ? { description } : {}),
        ...(category ? { applicationCategory: category } : {}),
        operatingSystem: platformsOf(project).join(", "),
        author: { "@id": person },
        creator: { "@id": person },
        inLanguage: locale === "pt" ? "pt-BR" : "en",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${project.name} — Gabriel Aguiar`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${url}#app` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "pt" ? "Início" : "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: locale === "pt" ? "Projetos" : "Work", item: `${SITE_URL}/#work` },
          { "@type": "ListItem", position: 3, name: project.name },
        ],
      },
    ],
  }
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
  const { pick, locale } = useLocale()
  const project = findProject(id)

  // Every hook has to run before the 404 branch, so the metadata falls back to
  // values that are correct for a missing project rather than being skipped.
  const title = project ? `${project.name} — Gabriel Aguiar` : "Gabriel Aguiar"
  const description = project && !project.draft ? pick(project.summary) : ""

  /*
    Memoised because it is an effect dependency in `useDocumentMeta`. Rebuilt
    fresh on every render it would have a new identity every time, and the hook
    would tear the script tag out of the head and put it back on each one.
  */
  const jsonLd = useMemo(
    () => (project && !project.draft ? caseSchema(project, description, locale) : undefined),
    [project, description, locale],
  )

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
    jsonLd,
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

  const index = PROJECTS.findIndex((entry) => entry.id === project.id)
  const stage = STAGES[project.id]

  return (
    <PageShell>
      {/* The brand wash wraps the back-link bar as well as the case itself, so
          the colour is already there when the page starts rather than switching
          on part-way down it. */}
      <div className="relative">
        {stage ? <CaseField project={project} /> : null}
        <CaseNavTop />
        {project.draft ? <DraftNotice /> : null}
        {project.layout === "gallery" || !stage ? (
          <CaseGallery project={project} index={index} />
        ) : (
          <CaseStage project={project} index={index} stage={stage} />
        )}
      </div>
      {/* After the composition, not inside it: the composition gives a product
          its character, this is the structure a reader compares across
          projects, and structure should not change shape between them. */}
      <CaseSurfaces project={project} />
      <CaseNavNext project={project} />
    </PageShell>
  )
}

export default WorkDetail
