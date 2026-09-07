import { RevealText, animation, gridDelay, useFloat, useReveal } from "@/animation"
import PhoneFrame from "@/components/device/PhoneFrame"
import { StudioChat } from "@/components/screens/Studio"
import { ShoppingHome, ShoppingOrder } from "@/components/screens/Shopping"
import { YagoHome } from "@/components/screens/Yago"
import { COPY } from "@/content/copy"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The mobile argument.
 *
 * A row of four real interfaces, then four constraints of the platform — each
 * paired with the tools that answer it. The tools appear *inside* the reasoning
 * rather than in a grid of logos, because a logo wall says "I have heard of
 * these" and this says "here is the problem each one solves".
 */

const shelf = [
  { screen: <YagoHome />, rotate: -5, lift: "lg:translate-y-6" },
  { screen: <ShoppingHome />, rotate: 3, lift: "lg:-translate-y-4" },
  { screen: <StudioChat />, rotate: -2, lift: "lg:translate-y-10" },
  { screen: <ShoppingOrder />, rotate: 5, lift: "lg:-translate-y-2" },
]

const ShelfPhone = ({
  screen,
  rotate,
  lift,
  index,
}: {
  screen: JSX.Element
  rotate: number
  lift: string
  index: number
}) => {
  // Alternating amplitudes so neighbouring phones never drift in lockstep.
  const ref = useFloat<HTMLDivElement>({
    y: index % 2 === 0 ? animation.parallax.caseDevice : animation.parallax.caseDeviceLead,
    rotate,
  })
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })

  return (
    <li
      {...revealProps}
      className={cn(revealProps.className, "w-[58%] shrink-0 snap-center sm:w-auto", lift)}
    >
      <div ref={ref}>
        <PhoneFrame lit={index === 1}>{screen}</PhoneFrame>
      </div>
    </li>
  )
}

const BuiltForMobile = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })

  return (
    <section id="mobile" className="section-anchor relative overflow-hidden border-t border-border py-20 md:py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(248,107,39,0.06),transparent_70%)]"
      />

      <div className="container">
        <div className="max-w-3xl">
          <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
            {pick(COPY.mobile.eyebrow)}
          </p>
          <h2 className="mt-5">
            <RevealText
              as="span"
              text={pick(COPY.mobile.title)}
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
            {pick(COPY.mobile.lead)}
          </p>
        </div>
      </div>

      {/* Full-bleed on desktop so the shelf runs past the container's gutter —
          it should feel like a row of devices continuing off the page. */}
      <div className="mt-16 md:mt-20">
        <ul className="no-scrollbar mask-fade-x flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 pb-4 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-8 lg:gap-8 lg:px-[6vw]">
          {shelf.map((item, index) => (
            <ShelfPhone key={index} {...item} index={index} />
          ))}
        </ul>
      </div>

      <div className="container mt-16 md:mt-24">
        <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:gap-x-16">
          {COPY.mobile.principles.map((principle, index) => (
            <Principle key={principle.title.en} principle={principle} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}

const Principle = ({
  principle,
  index,
}: {
  principle: (typeof COPY.mobile.principles)[number]
  index: number
}) => {
  const { pick } = useLocale()
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

      <ul className="mt-5 flex flex-wrap gap-2">
        {principle.tools.map((tool) => (
          <li key={tool} className="tag">
            {tool}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default BuiltForMobile
