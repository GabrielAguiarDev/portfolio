import { RevealText, useCounter, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import {
  APP_INSTALLS,
  REVENUE_TRANSACTED_MILLIONS,
  SURFACES_LIVE,
  yearsOfExperience,
} from "@/content/profile"
import { PUBLISHED_PROJECTS, liveSurfacesOf, sectorNamesOf } from "@/content/work"
import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Impact.
 *
 * Every figure here is either calculated or counted, and none is typed in by
 * hand as a claim.
 *
 * Three things this section used to get wrong. It counted `PROJECTS`, which
 * includes the drafts, so the page published a total covering two case studies
 * nobody could read, resting on a `status` that was still a TODO. The year and
 * app figures were both `null`, rendering as visible dashes, because they were
 * facts nobody had typed in. And four figures stood here where three of them
 * measured the same thing: products built, surfaces built and products live are
 * one question asked three times.
 *
 * What is left asks three different ones. How long, how much, how far. The
 * counts come from the published projects only, the years are calculated from a
 * start date that never goes stale, and each total can be raised in
 * `profile.ts` to cover work that cannot be shown here, so an unset total is
 * conservative rather than wrong.
 */

type Stat = {
  /** Unset figures are dropped rather than rendered as a gap. */
  value: number | null
  prefix?: string
  suffix?: string
  label: Localized
  /** Thousand separators. Off for small counts, where they read as clutter. */
  grouped?: boolean
}

/*
  Two kinds of figure, and the second is the one that matters.

  The first three measure output: how long, how much, how far. They were the
  whole section, and a section made only of them argues that a lot was built
  while saying nothing about whether any of it holds anything up.

  The last two measure weight. A system carrying a real operation, taking real
  money, surviving the week of the year when everyone arrives at once, is a
  different order of evidence from a count of products. They live in
  `profile.ts` because no repository can derive them, and they are dropped while
  unset so the row shows fewer real things instead of a blank.
*/
const candidates: Stat[] = [
  {
    value: yearsOfExperience(),
    suffix: "+",
    label: COPY.impact.years,
  },
  {
    value: SURFACES_LIVE ?? liveSurfacesOf(PUBLISHED_PROJECTS),
    label: COPY.impact.surfaces,
  },
  {
    value: REVENUE_TRANSACTED_MILLIONS,
    prefix: "R$ ",
    suffix: "M+",
    label: COPY.impact.revenue,
  },
  {
    value: APP_INSTALLS,
    suffix: "+",
    grouped: true,
    label: COPY.impact.installs,
  },
]

const counted = candidates.filter((stat) => stat.value !== null)

/** Columns that divide the figures evenly, so no row is left with one orphan. */
const COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-3 lg:grid-cols-5",
}

/**
 * Qualitative facts. True by construction — no number required.
 *
 * Localised like everything else on the page: these used to be Portuguese
 * strings shown to an English reader, which is the kind of detail a portfolio
 * arguing for attention to detail cannot afford.
 */
const claims: { value: Localized; label: Localized }[] = [
  {
    value: { pt: "Arquitetura → deploy", en: "Architecture → deploy" },
    label: { pt: "Ciclo completo, conduzido por mim", en: "Full cycle, carried by me" },
  },
  {
    value: { pt: "IA como engenharia", en: "AI as engineering" },
    label: {
      pt: "Orquestração, guardrails e custo",
      en: "Orchestration, guardrails and cost",
    },
  },
  {
    value: { pt: "Segurança no desenho", en: "Security in the design" },
    label: {
      pt: "Sessão, permissão e segredo",
      en: "Sessions, permissions and secrets",
    },
  },
]

const Figure = ({ stat, index }: { stat: Stat; index: number }) => {
  const { pick, locale } = useLocale()
  const { ref, value } = useCounter(stat.value ?? 0)
  const { revealProps } = useReveal<HTMLDivElement>({ delay: index * 0.06 })

  const shown = stat.grouped ? value.toLocaleString(locale === "pt" ? "pt-BR" : "en-US") : value

  return (
    <div {...revealProps} className={cn(revealProps.className, "border-t border-border pt-5")}>
      <span ref={ref} className="display-lg block tabular-nums text-foreground">
        {stat.prefix ? <span className="text-muted-foreground">{stat.prefix}</span> : null}
        {shown}
        {stat.suffix ? <span className="text-primary">{stat.suffix}</span> : null}
      </span>

      <p className="mt-3 text-pretty text-[0.8125rem] leading-snug text-muted-foreground">
        {pick(stat.label)}
      </p>
    </div>
  )
}

const Impact = () => {
  const { pick, locale } = useLocale()

  /*
    The businesses, by name, joined the way the reader's language joins a list.
    Derived rather than written into the copy so adding a project in a new
    business updates the sentence instead of quietly contradicting it.

    Hand-rolled rather than `Intl.ListFormat`, which is not in this project's
    TypeScript lib target and is not worth widening it for one conjunction.
  */
  // Lowercased on the way into the sentence: the field is stored capitalised
  // because it is a label, and these are common nouns, not proper ones.
  const names = sectorNamesOf(PUBLISHED_PROJECTS).map((sector) => pick(sector).toLocaleLowerCase())
  const last = locale === "pt" ? "e" : "and"
  const sectors =
    names.length > 1
      ? `${names.slice(0, -1).join(", ")} ${last} ${names[names.length - 1]}`
      : (names[0] ?? "")

  const eyebrow = useReveal<HTMLParagraphElement>()
  const note = useReveal<HTMLParagraphElement>({ delay: 0.1 })

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

        <div
          className={cn(
            "mt-14 grid gap-x-10 gap-y-10 md:mt-16",
            COLUMNS[counted.length] ?? "sm:grid-cols-3",
          )}
        >
          {counted.map((stat, index) => (
            <Figure key={stat.label.en} stat={stat} index={index} />
          ))}
        </div>

        <p
          {...note.revealProps}
          className={cn(
            note.revealProps.className,
            "mt-12 max-w-[68ch] text-pretty text-sm leading-relaxed text-muted-foreground",
          )}
        >
          {pick(COPY.impact.selection).replace("{sectors}", sectors)}
        </p>

        <ul className="mt-14 grid gap-x-10 gap-y-8 border-t border-border pt-10 md:grid-cols-3">
          {claims.map((claim) => (
            <Claim key={claim.value.en} claim={claim} />
          ))}
        </ul>
      </div>
    </section>
  )
}

const Claim = ({ claim }: { claim: { value: Localized; label: Localized } }) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLLIElement>()

  return (
    <li {...revealProps} className={revealProps.className}>
      <p className="display-sm text-balance text-foreground">{pick(claim.value)}</p>
      <p className="mt-2 text-[0.8125rem] text-muted-foreground">{pick(claim.label)}</p>
    </li>
  )
}

export default Impact
