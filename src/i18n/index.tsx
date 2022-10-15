import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEn from './en.json';
import translationRu from './ru.json';
import {getDeviceLang} from '../core/utils';
import {NotificationService} from '../core/services/notification.service';
import {HelperService} from '../core/services';
import LibreManager from 'react-native-libre-manager';
import LibreTool from '../core/libs/LibreTool/LibreTool';

export const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
} as const;

export type LangKey = keyof typeof resources;

const deviceLang: any = getDeviceLang();
const resultSupportLang: keyof typeof resources = deviceLang in resources ? deviceLang : 'ru';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: resultSupportLang,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lang: keyof typeof resources) => {
  // body is here
});

export default i18n;
