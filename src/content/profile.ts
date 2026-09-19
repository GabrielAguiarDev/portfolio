import type { Localized } from "@/i18n/useLocale"


export const SITE_URL = "https://www.gabrielaguiar.dev"

export const EMAIL = "TODO@example.com"

export const CAREER_START = { year: 2022, month: 9 }

export function yearsOfExperience(reference: Date = new Date()): number {
  const months =
    (reference.getFullYear() - CAREER_START.year) * 12 +
    (reference.getMonth() + 1 - CAREER_START.month)

  return Math.max(0, Math.floor(months / 12))
}


export const SURFACES_LIVE: number | null = 8


export const REVENUE_TRANSACTED_MILLIONS: number | null = 100

export const APP_INSTALLS: number | null = 5000

export const PROFILE = {
  name: "Gabriel Aguiar",
  firstName: "Gabriel",
  role: {
    pt: "Software Engineer",
    en: "Software Engineer",
  } satisfies Localized,
  location: {
    pt: "Brasil — remoto",
    en: "Brazil — remote",
  } satisfies Localized,
  photo: "/profile.jpg",
}

export const LINKS = {
  github: "https://github.com/GabrielAguiarDev",
  linkedin: "https://www.linkedin.com/in/gabriel-aguiar-dev/",
  instagram: "https://www.instagram.com/dev.aguiar/",
  email: `mailto:${EMAIL}`,
}

export const hasEmail = !EMAIL.startsWith("TODO")

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
