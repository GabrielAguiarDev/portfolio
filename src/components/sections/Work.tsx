import { ArrowUpRight } from "lucide-react"

import { RevealText, useReveal } from "@/animation"
import CaseConstellation from "@/components/work/CaseConstellation"
import CaseImmersive from "@/components/work/CaseImmersive"
import CaseShowcase from "@/components/work/CaseShowcase"
import { COPY } from "@/content/copy"
import { LINKS } from "@/content/profile"
import { PROJECTS, type Layout, type Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Each project picks its own composition. Repeating one layout three times
 * would turn a portfolio of products back into a grid of cards, which is the
 * one thing this section exists to avoid.
 */
const LAYOUTS: Record<Layout, (props: { project: Project; index: number }) => JSX.Element> = {
  showcase: CaseShowcase,
  immersive: CaseImmersive,
  constellation: CaseConstellation,
}

const Work = () => {
  const { pick } = useLocale()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })
  const eyebrow = useReveal<HTMLParagraphElement>()
  const cta = useReveal<HTMLDivElement>({ delay: 0.08 })

  return (
    <section id="work" className="section-anchor">
      <div className="container pt-20 md:pt-28 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {pick(COPY.work.eyebrow)}
            </p>
            <h2 className="mt-5">
              <RevealText
                as="span"
                text={pick(COPY.work.title)}
                className="display-lg block text-balance text-foreground"
              />
            </h2>
          </div>

          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "max-w-[46ch] self-end text-pretty text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem] lg:col-span-4 lg:col-start-9",
            )}
          >
            {pick(COPY.work.lead)}
          </p>
        </div>
      </div>

      {PROJECTS.map((project, index) => {
        const Case = LAYOUTS[project.layout]
        return <Case key={project.id} project={project} index={index} />
      })}

      <div className="container pb-4">
        <div
          {...cta.revealProps}
          className={cn(cta.revealProps.className, "border-t border-border pt-10")}
        >
          <a
            href={`${LINKS.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="rule-link">{pick(COPY.work.more)}</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Work
