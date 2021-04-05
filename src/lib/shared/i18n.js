import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translations from 'i18n';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: translations,
		debug: process.env.NODE_ENV === 'development',
		fallbackLng: 'en',

		interpolation: {
			escapeValue: false, // not needed, React escapes by default
		},
	});

export default i18n;
