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

    /**
     * Everything about which language a visitor lands in, in one place.
     *
     * `order` is written out rather than left to the detector's default, which
     * also consults a cookie, the session and the URL path — none of which this
     * site sets, and all of which are places a stale value could come from:
     *
     *   querystring   ?lng=en, so a link can be shared in one language
     *   localStorage  a choice the visitor made here before, which wins
     *   navigator     the browser's own language list — the real default
     *
     * `htmlTag` is deliberately NOT in that list, even though the detector
     * includes it by default. index.html ships `lang="pt-BR"` for the first
     * paint, and `syncDocumentLang` below rewrites it once a language is
     * settled — so the tag is an *output* of this decision, not an input.
     * Leaving it in makes it circular, and the effect is not theoretical: the
     * detector hands i18next every value it found and i18next takes the first
     * supported one, so `pt-BR` from the tag outranked the fallback for every
     * visitor whose own language is neither of the two. A browser set to
     * French got a Portuguese page.
     *
     * `load: "languageOnly"` folds every region onto its base tag, so pt-BR
     * and pt-PT both resolve to `pt`, and en-GB and en-US to `en`.
     *
     * The fallback is English, not Portuguese. It is only ever reached by a
     * browser asking for neither language — and someone whose machine is set
     * to French or German is better served by English than by the language
     * they are even less likely to read. It also matches `normalizeLocale`,
     * which has always treated anything non-Portuguese as English.
     */
    fallbackLng: "en",
    load: "languageOnly",
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },

    interpolation: { escapeValue: false },
  })

/** Keeps the document language in step, for screen readers and SEO. */
const syncDocumentLang = (language: string) => {
  document.documentElement.lang = language.toLowerCase().startsWith("pt") ? "pt-BR" : "en"
}

syncDocumentLang(i18n.language)
i18n.on("languageChanged", syncDocumentLang)

export default i18n
