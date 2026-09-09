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

/**
 * A short label in a chip: either a name that is the same in every language,
 * or a phrase that has to be translated.
 *
 * Both live in the same lists, so both have to be expressible in one type. A
 * product, a protocol or an acronym — React Native, MCP, RAG, Jest — is not
 * translated in any language and would be silly to write twice; a description
 * in words — "Input validation", "Least privilege" — has to be, or a
 * Portuguese page ends up with English chips scattered through it.
 */
export type Tag = string | Localized

/**
 * A tag's key, independent of the active language.
 *
 * The rendered text cannot be the React key: it changes when the language
 * does, which would remount every chip in the list on a locale switch.
 */
export function tagKey(value: Tag): string {
  return typeof value === "string" ? value : value.en
}

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
    /** Pick a tag, passing a name that needs no translation straight through. */
    pickTag: (value: Tag) => (typeof value === "string" ? value : value[locale]),
    setLocale: (next: Locale) => i18n.changeLanguage(next),
  }
}
