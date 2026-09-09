import { RevealText, gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { TOOLKIT, type ToolGroup } from "@/content/toolkit"
import { tagKey, useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Tools I build with.
 *
 * Set as an index, not a gallery: a label on the left, the names on the right,
 * a hairline between each. It is deliberately the quietest section on the page
 * — the products are the argument, this is just the appendix that backs it up.
 */
const Group = ({ group, index }: { group: ToolGroup; index: number }) => {
  const { pick, pickTag } = useLocale()
  const { revealProps } = useReveal<HTMLDivElement>({ delay: gridDelay(index) })

  return (
    <div
      {...revealProps}
      className={cn(
        revealProps.className,
        "grid gap-3 border-t border-border py-6 md:grid-cols-[10rem_1fr] md:gap-10 md:py-7",
      )}
    >
      <p className="eyebrow md:pt-1.5">{pick(group.label)}</p>

      <ul className="flex flex-wrap items-baseline gap-x-2 gap-y-2.5 md:gap-x-3">
        {group.tools.map((tool, toolIndex) => (
          <li key={tagKey(tool)} className="flex items-baseline gap-2 md:gap-3">
            {toolIndex > 0 ? (
              <span aria-hidden="true" className="text-muted-foreground/35">
                /
              </span>
            ) : null}
            <span className="text-[0.9375rem] font-medium tracking-tight text-foreground/85 transition-colors duration-300 hover:text-foreground md:text-base">
              {pickTag(tool)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Toolkit = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })

  return (
    <section id="toolkit" className="section-anchor border-t border-border py-20 md:py-28">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {pick(COPY.toolkit.eyebrow)}
            </p>
            <h2 className="mt-5">
              <RevealText
                as="span"
                text={pick(COPY.toolkit.title)}
                className="display-md block text-balance text-foreground"
              />
            </h2>
          </div>

          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "max-w-[40ch] self-end text-pretty text-sm leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8",
            )}
          >
            {pick(COPY.toolkit.lead)}
          </p>
        </div>

        <div className="mt-14 md:mt-16">
          {TOOLKIT.map((group, index) => (
            <Group key={group.label.en} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Toolkit
