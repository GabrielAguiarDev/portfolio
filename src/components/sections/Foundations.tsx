import { useState } from "react"

import { RevealText, animation, gridDelay, useReveal } from "@/animation"
import LayerStack from "@/components/foundations/LayerStack"
import { COPY } from "@/content/copy"
import { tagKey, useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

const Foundations = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })

  return (
    <section
      id="foundations"
      className="section-anchor relative overflow-hidden border-t border-border py-20 md:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(248,107,39,0.06),transparent_70%)]"
      />

      <div className="container">
        <div className="max-w-3xl">
          <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
            {pick(COPY.foundations.eyebrow)}
          </p>
          <h2 className="mt-5">
            <RevealText
              as="span"
              text={pick(COPY.foundations.title)}
              className="display-lg block text-balance text-foreground"
            />
          </h2>
          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "mt-6 max-w-[48ch] text-pretty text-sm leading-relaxed text-muted-foreground md:text-base",
            )}
          >
            {pick(COPY.foundations.lead)}
          </p>
        </div>

        <LayerDiagram />
      </div>

      <div className="container mt-16 md:mt-24">
        <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:gap-x-16">
          {COPY.foundations.principles.map((principle, index) => (
            <Principle key={principle.title.en} principle={principle} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}

const LayerDiagram = () => {
  const { pick } = useLocale()
  const reveal = useReveal<HTMLDivElement>({ delay: 0.1 })

  const [active, setActive] = useState<number | null>(null)

  const layers = COPY.foundations.layers

  const drawn = animation.enabled.layerStack

  return (
    <div
      {...reveal.revealProps}
      className={cn(
        reveal.revealProps.className,
        "mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14",
      )}
    >
      {drawn ? (
        <div className="lg:col-span-6">
          <div className="relative aspect-[5/4] w-full lg:aspect-[6/5]">
            <LayerStack count={layers.length} onActiveLayer={setActive} />
          </div>
        </div>
      ) : null}

      <div className={cn(drawn ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-8")}>
        <ol>
          {layers.map((layer, index) => {
            const lit = drawn && active === index

            return (
              <li
                key={layer.label.en}
                className="flex items-baseline gap-3 border-t border-border py-3.5 md:gap-4"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mb-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500",
                    lit ? "bg-primary" : "bg-border",
                  )}
                />
                <span className="font-mono text-[0.6875rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "display-sm transition-colors duration-500",
                    lit ? "text-foreground" : "text-foreground/70",
                  )}
                >
                  {pick(layer.label)}
                </span>
                <span className="ml-auto text-right text-[0.75rem] leading-snug text-muted-foreground">
                  {pick(layer.note)}
                </span>
              </li>
            )
          })}
        </ol>

        <p className="mt-6 max-w-[38ch] text-pretty text-[0.8125rem] leading-relaxed text-muted-foreground">
          {pick(COPY.foundations.layersCaption)}
        </p>
      </div>
    </div>
  )
}

const Principle = ({
  principle,
  index,
}: {
  principle: (typeof COPY.foundations.principles)[number]
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
        <h3 className="display-sm text-balance text-foreground">{pick(principle.title)}</h3>
      </div>

      <p className="mt-4 max-w-[44ch] text-pretty text-sm leading-relaxed text-muted-foreground">
        {pick(principle.body)}
      </p>

      <ul className="mt-5 hidden flex-wrap gap-2 md:flex">
        {principle.tools.map((tool) => (
          <li key={tagKey(tool)} className="tag">
            {pickTag(tool)}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default Foundations
