import { useTranslation } from "react-i18next"

export type Locale = "pt" | "en"

export type Localized = Record<Locale, string>

export type Tag = string | Localized

export function tagKey(value: Tag): string {
  return typeof value === "string" ? value : value.en
}

export function normalizeLocale(language?: string): Locale {
  return language?.toLowerCase().startsWith("pt") ? "pt" : "en"
}

export function useLocale() {
  const { i18n } = useTranslation()
  const locale = normalizeLocale(i18n.language)

  return {
    locale,
    pick: (value: Localized) => value[locale],
    pickTag: (value: Tag) => (typeof value === "string" ? value : value[locale]),
    setLocale: (next: Locale) => i18n.changeLanguage(next),
  }
}
