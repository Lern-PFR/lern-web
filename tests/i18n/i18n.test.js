import translations from 'i18n';
import { isString } from 'lodash';

describe('Translation files', () => {
	it('should all have the same set of keys.', () => {
		// Arrange
		const keys = {};

		/**
		 * Strips recursively every string value out of the given object
		 * @param {object} obj
		 */
		const stripValues = (obj) => {
			const result = { ...obj };

			Object.keys(result).forEach((key) => {
				if (isString(result[key])) {
					result[key] = '';
				} else if (typeof result[key] === 'object') {
					result[key] = stripValues(result[key]);
				}
			});

			return result;
		};

		Object.keys(translations).forEach((translation) => {
			keys[translation] = stripValues(translations[translation]);
		});

		// Assert
		Object.keys(keys).forEach((translation) => expect(keys[translation]).toEqual(keys[Object.keys(keys)[0]]));
	});
});
