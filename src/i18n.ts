import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEn from '@public/locales/en.json';
import translationRu from '@public/locales/ru.json';
import translationUk from '@public/locales/uk.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  resources: {
    en: { translation: translationEn },
    ru: { translation: translationRu },
    uk: { translation: translationUk },
  },
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
