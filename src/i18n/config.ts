import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en/enTranslation.json';
import thTranslation from './th/thTranslation.json';


const resources = {
  en: {
    translation: 
      enTranslation
    
  },
  th: {
    translation: 
      thTranslation
    
  }
};

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "th",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18next;