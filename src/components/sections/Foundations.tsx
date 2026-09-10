import { useState } from "react"

import { RevealText, animation, gridDelay, useReveal } from "@/animation"
import LayerStack from "@/components/foundations/LayerStack"
import { COPY } from "@/content/copy"
import { tagKey, useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The engineering argument.
 *
 * This section used to open with a row of phone mockups, which quietly worked
 * against it: the claim is that the screen is the least durable decision in a
 * product, and the illustration was four screens. The mockups belong in the
 * case studies, where the product *is* the subject, and they are still there.
 *
 * What stands here instead is the claim itself, drawn: a stack of planes that
 * separates as you scroll into it, with a request pulsing down through them
 * and the index beside it lighting up layer by layer. Then the four decisions
 * that sit underneath every product — structure, one base under several
 * surfaces, delivery, and security handled in the design.
 *
 * The tools appear *inside* the reasoning rather than in a grid of logos,
 * because a logo wall says "I have heard of these" and this says "here is the
 * problem each one solves".
 */
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

/**
 * The diagram and its written index — one component, because they are one
 * object: the pulse travelling through the canvas is what lights the row.
 *
 * The active layer is owned *here* rather than in `Foundations` on purpose.
 * The pulse crosses five layers plus two empty handovers per cycle, so this
 * state changes a little over once a second for as long as the section is on
 * screen. Held one level up it would re-run the heading's `RevealText` (a
 * `matchMedia` call and a regex split) and reconcile all four principles and
 * their twenty tags at that rate, to animate three class names.
 */
const LayerDiagram = () => {
  const { pick } = useLocale()
  const reveal = useReveal<HTMLDivElement>({ delay: 0.1 })

  // Which plane the travelling pulse is currently passing through, reported by
  // the canvas. One source of truth for the object and its index, rather than
  // two things that happen to agree.
  const [active, setActive] = useState<number | null>(null)

  const layers = COPY.foundations.layers

  // The canvas is a progressive enhancement, so the index has to hold the
  // section on its own when it is switched off — without leaving half the row
  // as an empty box where the diagram would have been.
  //
  // It is drawn on a phone too, and deliberately so. The mobile trim on this
  // page cuts text, not pictures: a diagram earns its vertical space by saying
  // something a paragraph would need four sentences to say, which is exactly
  // the trade a narrow screen wants. See `content/mobile.ts`.
  const drawn = animation.enabled.layerStack

  return (
    <div
      {...reveal.revealProps}
      className={cn(
        reveal.revealProps.className,
        "mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14",
      )}
    >
      {/* An exploded stack of five is close to square, so the box it gets is
          close to square too — a landscape frame would just add dead air
          either side of it. */}
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
            // Gated on `drawn` as well as on `active`: nothing should be lit
            // when there is no diagram above it to explain the highlight. The
            // canvas reports a null layer when it scrolls out of view, but not
            // when it unmounts, so this is what keeps the two honest if the
            // flag above ever becomes something that changes at runtime again.
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

        {/* One line, and it is what turns the diagram above from an object
            into an argument — so it stays on a phone with the diagram it
            frames. The trim is for paragraphs, not for labels. */}
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

      {/* Four or five chips, wrapping to two or three lines on a phone, under
          each of four principles — the single largest block of vertical space
          on the page that carries no sentence. The names are all in the toolkit
          index further down, which is where a reader goes looking for them. */}
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
