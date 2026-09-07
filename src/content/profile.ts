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

/** Set to your public contact address, then delete the TODO note. */
export const EMAIL = "TODO@example.com" // TODO: replace with the address you want public

/** Years you have been working professionally. `null` hides the stat entirely. */
export const YEARS_OF_EXPERIENCE: number | null = null // TODO: e.g. 3

/** Apps you have shipped to a public store. `null` hides the stat entirely. */
export const APPS_SHIPPED: number | null = null // TODO: e.g. 3

export const PROFILE = {
  name: "Gabriel Aguiar",
  firstName: "Gabriel",
  /**
   * The professional title, in one place.
   *
   * Broadened from "Mobile & Frontend Developer": the page now argues for
   * architecture, mobile and web, an AI-assisted workflow and security as a
   * design concern, and a mobile-only title undersells all of that. Change it
   * here and it updates the hero, the footer and the page metadata together.
   */
  role: {
    pt: "Software Engineer · Mobile & Web",
    en: "Software Engineer · Mobile & Web",
  } satisfies Localized,
  location: {
    pt: "Brasil — remoto",
    en: "Brazil — remote",
  } satisfies Localized,
  photo: "/profile.png",
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
  const unfilled = [
    !hasEmail && "EMAIL",
    YEARS_OF_EXPERIENCE === null && "YEARS_OF_EXPERIENCE",
    APPS_SHIPPED === null && "APPS_SHIPPED",
  ].filter(Boolean)

  if (unfilled.length) {
    console.warn(
      `[portfolio] Unfilled values in src/content/profile.ts: ${unfilled.join(", ")}. ` +
        `Impact figures render as "—" and the email channel is hidden until these are set.`,
    )
  }
}
