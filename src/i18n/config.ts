import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

/**
 * i18next is initialised purely for language detection and persistence.
 *
 * The copy itself no longer lives in a flat key namespace — each section's
 * prose sits next to the data it describes, in src/content, and is resolved
 * through `useLocale`. i18next still owns *which* language is active, so the
 * detector, the localStorage persistence and the `<html lang>` sync all keep
 * working exactly as before.
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { pt: { translation: {} }, en: { translation: {} } },
    supportedLngs: ["pt", "en"],
    fallbackLng: "pt",
    load: "languageOnly",
    interpolation: { escapeValue: false },
  })

/** Keeps the document language in step, for screen readers and SEO. */
const syncDocumentLang = (language: string) => {
  document.documentElement.lang = language.toLowerCase().startsWith("pt") ? "pt-BR" : "en"
}

syncDocumentLang(i18n.language)
i18n.on("languageChanged", syncDocumentLang)

export default i18n
