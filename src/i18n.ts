import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from '@public/locales/en.json';
import translationRu from '@public/locales/ru.json';
import translationUk from '@public/locales/uk.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    ru: { translation: translationRu },
    uk: { translation: translationUk },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
