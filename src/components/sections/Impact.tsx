import { RevealText, useCounter, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { APPS_SHIPPED, YEARS_OF_EXPERIENCE } from "@/content/profile"
import { PROJECTS } from "@/content/work"
import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Impact.
 *
 * Only two figures here are counted, and both are derived from data in this
 * repository rather than asserted: the number of products in `work.ts`, and
 * how many of them are live. Anything that needed a fact from outside the repo
 * is a `null` in `profile.ts` and renders as an obvious empty slot — a blank
 * to fill, never a number nobody can stand behind.
 */

const live = PROJECTS.filter((project) => project.status === "live").length

type Stat = {
  /** `null` renders the slot as an unfilled placeholder. */
  value: number | null
  suffix?: string
  label: Localized
}

const counted: Stat[] = [
  {
    value: PROJECTS.length,
    label: { pt: "Produtos construídos", en: "Products built" },
  },
  {
    value: live,
    label: { pt: "Em produção agora", en: "Live right now" },
  },
  {
    value: YEARS_OF_EXPERIENCE,
    suffix: "+",
    label: { pt: "Anos de experiência", en: "Years of experience" },
  },
  {
    value: APPS_SHIPPED,
    suffix: "+",
    label: { pt: "Apps publicados", en: "Apps published" },
  },
]

/** Qualitative facts. True by construction — no number required. */
const claims: { value: string; label: Localized }[] = [
  {
    value: "iOS + Android",
    label: { pt: "Uma única base de código", en: "One single codebase" },
  },
  {
    value: "App Store + Google Play",
    label: { pt: "Publicação conduzida por mim", en: "Release handled by me" },
  },
  {
    value: "React Native",
    label: { pt: "Especialidade principal", en: "Primary specialism" },
  },
]

const Figure = ({ stat, index }: { stat: Stat; index: number }) => {
  const { pick } = useLocale()
  const { ref, value } = useCounter(stat.value ?? 0)
  const { revealProps } = useReveal<HTMLDivElement>({ delay: index * 0.06 })

  const pending = stat.value === null

  return (
    <div {...revealProps} className={cn(revealProps.className, "border-t border-border pt-5")}>
      {pending ? (
        // An unfilled slot. Deliberately visible to a sighted reader, but
        // aria-hidden so a screen reader is not handed a meaningless "dash" —
        // it reads the label alone, which is the honest amount of information.
        // The developer reminder lives in a dev-only console warning rather
        // than a `title`, which would surface an internal TODO as a tooltip to
        // every visitor.
        <span aria-hidden="true" className="display-lg block text-foreground/15">
          —
        </span>
      ) : (
        <span ref={ref} className="display-lg block tabular-nums text-foreground">
          {value}
          {stat.suffix ? <span className="text-primary">{stat.suffix}</span> : null}
        </span>
      )}

      <p className="mt-3 text-pretty text-[0.8125rem] leading-snug text-muted-foreground">
        {pick(stat.label)}
      </p>
    </div>
  )
}

const Impact = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()

  return (
    <section id="impact" className="section-anchor border-t border-border py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
            {pick(COPY.impact.eyebrow)}
          </p>
          <h2 className="mt-5">
            <RevealText
              as="span"
              text={pick(COPY.impact.title)}
              className="display-md block text-balance text-foreground"
            />
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-10">
          {counted.map((stat, index) => (
            <Figure key={stat.label.en} stat={stat} index={index} />
          ))}
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-8 border-t border-border pt-10 md:grid-cols-3">
          {claims.map((claim) => (
            <Claim key={claim.value} claim={claim} />
          ))}
        </ul>
      </div>
    </section>
  )
}

const Claim = ({ claim }: { claim: { value: string; label: Localized } }) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLLIElement>()

  return (
    <li {...revealProps} className={revealProps.className}>
      <p className="display-sm text-balance text-foreground">{claim.value}</p>
      <p className="mt-2 text-[0.8125rem] text-muted-foreground">{pick(claim.label)}</p>
    </li>
  )
}

export default Impact
