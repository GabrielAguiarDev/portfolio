import { RevealText, useReveal } from "@/animation"
import WorkIndex from "@/components/work/WorkIndex"
import { COPY } from "@/content/copy"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

const Work = () => {
  const { pick } = useLocale()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })
  const eyebrow = useReveal<HTMLParagraphElement>()

  return (
    <section id="work" className="section-anchor pt-20 md:pt-28 lg:pt-36">
      <div className="container">
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

        <WorkIndex />
      </div>
    </section>
  )
}

export default Work
