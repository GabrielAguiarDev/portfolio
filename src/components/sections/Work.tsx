import { RevealText, useReveal } from "@/animation"
import WorkIndex from "@/components/work/WorkIndex"
import { COPY } from "@/content/copy"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The work section, on the home page.
 *
 * It used to render every case study inline, each in its own bespoke
 * composition. That was the right shape for three projects and the wrong one
 * for five: the section grew past nine viewports, and each new project made
 * the page longer without making the argument stronger.
 *
 * The compositions did not go away — they moved to `/work/<id>`, one page per
 * project, and what stays here is the index that leads to them. See
 * `components/work/WorkIndex.tsx`.
 *
 * The link out to GitHub used to sit under the grid as a footnote. It is now
 * the grid's last cell, which is both a better place for it and the thing that
 * fills the sixth slot five projects leave empty.
 */
const Work = () => {
  const { pick } = useLocale()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })
  const eyebrow = useReveal<HTMLParagraphElement>()

  // The top padding sits on the <section>, not on the container inside it,
  // because the section is the element carrying the `id` — and
  // `sectionScrollTop` reads the anchor's own padding to work out where its
  // content starts. With the padding on the child, a jump to #work landed a
  // full 9rem short of the heading. Visually the two are identical: the
  // container only adds horizontal gutters.
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
