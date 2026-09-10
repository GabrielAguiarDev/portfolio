import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { nextProject, type Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { BrandMark } from "./parts"

/**
 * The way out of a case study, at both ends.
 *
 * A project page is frequently the first page someone sees — it is the URL
 * that gets shared — so it cannot assume the visitor arrived from the index.
 * Without these it is a page with no way onward except the browser's Back
 * button, which a visitor who landed here from a link does not have.
 */

export const CaseNavTop = () => {
  const { pick } = useLocale()

  return (
    <div className="container pt-[calc(var(--nav-h)+2rem)] md:pt-[calc(var(--nav-h)+3rem)]">
      <Link
        to="/#work"
        className="group inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft
          size={15}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        {pick(COPY.work.backToWork)}
      </Link>
    </div>
  )
}

export const CaseNavNext = ({ project }: { project: Project }) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLDivElement>()
  const next = nextProject(project.id)

  if (!next || next.id === project.id) return null

  return (
    <div className="container pb-24 md:pb-32">
      <div {...revealProps} className={cn(revealProps.className, "border-t border-border")}>
        <Link
          to={`/work/${next.id}`}
          className="group flex items-center gap-5 py-8 sm:gap-7 md:py-10"
        >
          <BrandMark
            project={next}
            className="h-11 w-11 shrink-0 rounded-xl transition-transform duration-500 group-hover:scale-[1.06]"
          />

          <span className="min-w-0 flex-1">
            <span className="eyebrow block">{pick(COPY.work.next)}</span>
            <span className="display-sm mt-2 block text-foreground">{next.name}</span>
            <span className="mt-1 block truncate text-sm text-muted-foreground">
              {pick(next.kind)}
            </span>
          </span>

          <ArrowRight
            size={20}
            strokeWidth={1.5}
            className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  )
}
