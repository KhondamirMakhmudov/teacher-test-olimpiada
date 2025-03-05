import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import uzTranslations from "@/translations/uz.json";
import ruTranslations from "@/translations/ru.json";
import enTranslations from "@/translations/en.json";

// Get the saved language from localStorage (default to 'uz')
let storedLang = "uz";
if (typeof window !== "undefined") {
  storedLang = localStorage.getItem("lang") || "uz"; // Get from localStorage if available
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      uz: { translation: uzTranslations },
      ru: { translation: ruTranslations },
      en: { translation: enTranslations },
    },
    lng: storedLang, // Use the stored language if available
    fallbackLng: "uz",
    keepPreviousData: false,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
