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


const APPLICATION_CATEGORY: Record<string, string> = {
  yago: "TravelApplication",
  "y-studio": "BusinessApplication",
  "porto-seguro-shopping": "ShoppingApplication",
  "aguiar-one": "BusinessApplication",
  vez: "BusinessApplication",
}

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

  const title = project ? `${project.name} — Gabriel Aguiar` : "Gabriel Aguiar"
  const description = project && !project.draft ? pick(project.summary) : ""

  const jsonLd = useMemo(
    () => (project && !project.draft ? caseSchema(project, description, locale) : undefined),
    [project, description, locale],
  )

  useDocumentMeta({
    title,
    description,
    path: project ? `/work/${project.id}` : window.location.pathname,
    noindex: !project || Boolean(project.draft),
    jsonLd,
  })

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
      <CaseSurfaces project={project} />
      <CaseNavNext project={project} />
    </PageShell>
  )
}

export default WorkDetail
