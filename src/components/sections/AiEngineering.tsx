import { useMemo } from "react"

import { RevealText, gridDelay, useReveal } from "@/animation"
import AgentGraph from "@/components/ai/AgentGraph"
import { COPY } from "@/content/copy"
import { tagKey, useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * AI, treated as engineering.
 *
 * It sits directly after the engineering foundations and before the delivery
 * process, because that is where it belongs in the argument: it is not a
 * product feature and it is not a tool in the appendix — it is part of how the
 * decisions in the section above get made.
 *
 * The section leads with the orchestration diagram rather than with prose. The
 * shape of the work — context in, one thing deciding, specialists in parallel,
 * every result reported back for judgement — is the claim; the four pillars
 * underneath it are the detail behind each part of that shape.
 */
const AiEngineering = () => {
  const { pick, locale } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })
  const graph = useReveal<HTMLDivElement>({ delay: 0.1 })

  const { graph: graphCopy } = COPY.ai

  /**
   * Memoised on the locale, which is the only thing that changes it.
   *
   * `AgentGraph` keys its measurement — a forced layout read per node — on
   * this object's identity. Rebuilt inline it would change on every render of
   * this section, and the three `useReveal` hooks here each cause one, so the
   * graph would re-measure and re-observe every node three times on a plain
   * page visit and once per state change forever after.
   */
  const graphLabels = useMemo(
    () => ({
      context: [...graphCopy.context],
      core: {
        label: pick(graphCopy.core.label),
        note: pick(graphCopy.core.note),
      },
      specialists: graphCopy.specialists.map((specialist) => pick(specialist)),
      legend: {
        dispatch: pick(graphCopy.legend.dispatch),
        report: pick(graphCopy.legend.report),
      },
      caption: pick(graphCopy.caption),
    }),
    // `pick` is a stable function of `locale`, and `graphCopy` is a frozen
    // literal — so the locale is the whole dependency.
    [locale],
  )

  return (
    <section
      id="ai"
      className="section-anchor relative overflow-hidden border-t border-border py-20 md:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-[radial-gradient(70%_100%_at_50%_100%,rgba(248,107,39,0.05),transparent_70%)]"
      />

      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {pick(COPY.ai.eyebrow)}
            </p>
            <h2 className="mt-5">
              <RevealText
                as="span"
                text={pick(COPY.ai.title)}
                className="display-lg block text-balance text-foreground"
              />
            </h2>
          </div>

          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "max-w-[46ch] self-end text-pretty text-sm leading-relaxed text-muted-foreground md:text-base lg:col-span-6",
            )}
          >
            {pick(COPY.ai.lead)}
          </p>
        </div>

        <div
          {...graph.revealProps}
          className={cn(
            graph.revealProps.className,
            "mt-14 rounded-[--radius] border border-border bg-card/40 px-5 py-10 md:mt-20 md:px-10 md:py-14 lg:px-16",
          )}
        >
          <AgentGraph labels={graphLabels} />
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-10 md:mt-20 md:grid-cols-2 lg:gap-x-16">
          {COPY.ai.pillars.map((pillar, index) => (
            <Pillar key={pillar.title.en} pillar={pillar} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}

const Pillar = ({
  pillar,
  index,
}: {
  pillar: (typeof COPY.ai.pillars)[number]
  index: number
}) => {
  const { pick, pickTag } = useLocale()
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })

  return (
    <li {...revealProps} className={cn(revealProps.className, "border-t border-border pt-6")}>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.6875rem] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="display-sm text-balance text-foreground">{pick(pillar.title)}</h3>
      </div>

      <p className="mt-4 max-w-[46ch] text-pretty text-sm leading-relaxed text-muted-foreground">
        {pick(pillar.body)}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {pillar.tools.map((tool) => (
          <li key={tagKey(tool)} className="tag">
            {pickTag(tool)}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default AiEngineering
