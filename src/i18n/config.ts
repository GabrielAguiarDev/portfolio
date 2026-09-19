import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { pt: { translation: {} }, en: { translation: {} } },
    supportedLngs: ["pt", "en"],

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

const syncDocumentLang = (language: string) => {
  document.documentElement.lang = language.toLowerCase().startsWith("pt") ? "pt-BR" : "en"
}

syncDocumentLang(i18n.language)
i18n.on("languageChanged", syncDocumentLang)

export default i18n
