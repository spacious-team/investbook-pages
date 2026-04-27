import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json';

i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  resources: { ru: { translation: ru } },
  interpolation: { escapeValue: false },
  initAsync: false,
});

export { useTranslation } from 'react-i18next';
