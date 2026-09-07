import { useTranslation } from "react-i18next"

/** The two languages the site ships in. */
export type Locale = "pt" | "en"

/**
 * A piece of copy written once per language.
 *
 * Content-heavy sections keep their prose next to the data it belongs to
 * (a project's headline sits inside that project's record) rather than in a
 * flat key namespace, so a case study can be read and edited as one unit.
 */
export type Localized = Record<Locale, string>

export function normalizeLocale(language?: string): Locale {
  return language?.toLowerCase().startsWith("pt") ? "pt" : "en"
}

/**
 * Resolves `Localized` values against the active language.
 *
 * Returns the picker rather than a map of every string, so components only pay
 * for the copy they actually render.
 */
export function useLocale() {
  const { i18n } = useTranslation()
  const locale = normalizeLocale(i18n.language)

  return {
    locale,
    /** Pick the active language out of a `Localized` value. */
    pick: (value: Localized) => value[locale],
    setLocale: (next: Locale) => i18n.changeLanguage(next),
  }
}
