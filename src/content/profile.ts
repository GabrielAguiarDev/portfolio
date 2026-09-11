import type { Localized } from "@/i18n/useLocale"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FILL ME IN
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything below marked `TODO` is a real-world fact that could not be derived
 * from this repository. Nothing here is invented: the placeholders render as
 * visible dashes so an unfilled value is obvious on the page rather than
 * silently wrong.
 *
 * Search this file for `TODO` before deploying.
 */

/**
 * The canonical origin, without a trailing slash.
 *
 * Read by `useDocumentMeta` to build a per-route canonical URL. It has to
 * match the domain the site is actually served from — a
 * canonical pointing at a host that redirects is worse than none at all.
 */
export const SITE_URL = "https://gabrielaguiar.dev"

/** Set to your public contact address, then delete the TODO note. */
export const EMAIL = "TODO@example.com" // TODO: replace with the address you want public

/**
 * When the professional work started.
 *
 * A year count written down by hand is wrong from the day after it is written,
 * and the only person who ever notices is the one who wrote it. This is the
 * fact that does not change, and the figure on the page is calculated from it.
 *
 * `month` is 1-indexed, the way a human writes a date.
 */
export const CAREER_START = { year: 2022, month: 9 }

/**
 * Full years elapsed since `CAREER_START`.
 *
 * Deliberately floors. At three years and eleven months this returns 3, which
 * understates by a month rather than claiming a year that has not happened yet
 * — and the figure is shown with a "+", which covers the remainder honestly.
 */
export function yearsOfExperience(reference: Date = new Date()): number {
  const months =
    (reference.getFullYear() - CAREER_START.year) * 12 +
    (reference.getMonth() + 1 - CAREER_START.month)

  return Math.max(0, Math.floor(months / 12))
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  Totals that reach beyond the portfolio
 * ─────────────────────────────────────────────────────────────────────────────
 * Some of the work is internal to an employer and cannot be shown, so counting
 * `work.ts` alone understates it. These carry the real totals.
 *
 * Each falls back to the portfolio count when left at `null`, so the page is
 * never wrong, only conservative, and filling one in is an improvement rather
 * than a repair.
 */

/**
 * Web systems and apps running in production, counting the ones that cannot be
 * shown here.
 *
 * Three figures used to stand where this one does: products built, surfaces
 * built, and products live. They were the same question asked three times, and
 * this is the answer that carries all of it, because a product built and
 * switched off is not a claim worth making.
 *
 * The eight, so the number can be audited rather than trusted:
 *
 *   Apps      Yago · Yago Colaborador · Shopping Porto Seguro ·
 *             Customer Experience · yStorage
 *   Systems   Y-Studio · the client sites running its Booking and CMS ·
 *             Aguiar One
 *
 * Deliberately conservative in two places. Y-Studio's portals are separate
 * systems by any reasonable reading and are counted once. VEZ is excluded
 * entirely, because it has not launched.
 */
export const SURFACES_LIVE: number | null = 8

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  Weight
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything above measures output: how long, how much, how far. None of it
 * says what any of it carries, and that is the larger claim by a distance.
 * A system holding a real operation together, taking real money, surviving the
 * week of the year when everyone shows up at once, is a different order of
 * evidence from "I built nine of them".
 *
 * The rule for anything in this block: aggregate across clients and years,
 * round down hard, and never let a figure be traceable to one named client.
 * "The systems I worked on moved nine figures" is a claim about the work. "This
 * client's booking engine took R$78.6M in 2025" is that client's business, and
 * it is not yours to publish.
 *
 * Left null until you are comfortable with the number. Unset figures are not
 * rendered at all, so the section shows fewer, real things rather than a gap.
 */

/**
 * Revenue transacted through the systems, in millions of BRL, aggregated and
 * rounded down. Set 100 to render "R$ 100M+".
 */
export const REVENUE_TRANSACTED_MILLIONS: number | null = 100

/**
 * Installs across the apps shipped to the stores, rounded down.
 *
 * TODO: this is Yago alone. There are five apps in production; the real total
 * is higher and unknown here.
 */
export const APP_INSTALLS: number | null = 5000

export const PROFILE = {
  name: "Gabriel Aguiar",
  firstName: "Gabriel",
  /**
   * The professional title, in one place.
   *
   * Deliberately unqualified. It started as "Mobile & Frontend Developer",
   * then "Software Engineer · Mobile & Web", and every platform suffix had the
   * same problem: it narrows the reader's expectation to one surface before
   * they have read a word of the argument, which is that the surface is the
   * least durable decision in a product. Change it here and it updates the
   * hero, the footer and the page metadata together.
   */
  role: {
    pt: "Software Engineer",
    en: "Software Engineer",
  } satisfies Localized,
  location: {
    pt: "Brasil — remoto",
    en: "Brazil — remote",
  } satisfies Localized,
  /**
   * JPEG and not PNG. The source was a 1.6MB lossless PNG of a photograph —
   * the format's worst case, and by a wide margin the heaviest thing the site
   * ever downloaded. It has no transparency (the soft edge is a CSS mask, not
   * an alpha channel), so there was nothing PNG was buying. Re-encoded at the
   * same 1254x1254 and quality 90 it is 245kB: indistinguishable at 1:1, and
   * the portrait is rendered downscaled and grayscale on top of that.
   */
  photo: "/profile.jpg",
}

export const LINKS = {
  github: "https://github.com/GabrielAguiarDev",
  linkedin: "https://www.linkedin.com/in/gabriel-aguiar-dev/",
  instagram: "https://www.instagram.com/dev.aguiar/",
  email: `mailto:${EMAIL}`,
}

/** Whether the contact address has actually been filled in. */
export const hasEmail = !EMAIL.startsWith("TODO")

/**
 * Dev-only reminder. Stripped from the production bundle by the `import.meta.env.DEV`
 * guard, so the nudge reaches the person who can act on it and never the visitor.
 */
if (import.meta.env.DEV) {
  if (!hasEmail) {
    console.warn(
      `[portfolio] EMAIL is unset in src/content/profile.ts, so the email channel is hidden.`,
    )
  }

  const unset = [
    SURFACES_LIVE === null && "SURFACES_LIVE",
    REVENUE_TRANSACTED_MILLIONS === null && "REVENUE_TRANSACTED_MILLIONS",
    APP_INSTALLS === null && "APP_INSTALLS",
  ].filter(Boolean)

  if (unset.length) {
    console.warn(
      `[portfolio] Unset figures in src/content/profile.ts: ${unset.join(", ")}. ` +
        `Unset figures are not rendered, so Impact is showing less than it could.`,
    )
  }
}
