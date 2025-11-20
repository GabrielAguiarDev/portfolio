import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Texts } from ".";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: Texts.portuguese },
      en: { translation: Texts.english },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
