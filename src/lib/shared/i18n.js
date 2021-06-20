import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translations from 'i18n';
import moment from 'moment';
import 'moment/locale/fr';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: translations,
		debug: process.env.NODE_ENV === 'development',
		fallbackLng: 'en',

		interpolation: {
			format: (value, format, lng) => {
				if (moment(value, true).isValid()) {
					moment.locale(lng);

					return moment(value).format(format);
				}

				return value;
			},
			escapeValue: false, // not needed, React escapes by default
		},
	});

export default i18n;
