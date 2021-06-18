/**
 * @function
 * @name isRequired
 * @description A validation method used to check if the field is set.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string|number}	value		The input's current value.
 * @param {string}			messageKey	The translation key to return if the validation fails.
 *
 * @returns {string} The translation key for the validation message.
 */
const isRequired = (messageKey = 'required') => (value) => ((value?.toString() ?? '').trim().length === 0 ? messageKey : '');

/**
 * @function
 * @name isEmailAddress
 * @description A validation method used to check if the field has an email formatted value.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string|number}	value		The input's current value.
 * @param {string}			messageKey	The translation key to return if the validation fails.
 *
 * @returns {string} The translation key for the validation message.
 */
const isEmailAddress = (messageKey = 'email') => (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value ?? '').trim()) ? '' : messageKey);

/**
 * @function
 * @name hasMaxLength
 * @description A validation method used to check if the field's value has a length lesser or equal than the provided minLength value.
 *
 * @author Timothée Simon-Franza
 *
 * @param {number} maxLength 	The maximal length the field's value must have to pass the validation checK.
 * @param {string} messageKey	The translation key to return if the validation fails.
 *
 * @returns {string} The translation key for the validation message.
 */
const hasMaxLength = (maxLength, messageKey = 'max_length') => (value) => (value.trim().length <= maxLength ? '' : messageKey);

/**
 * @function
 * @name hasMinLength
 * @description A validation method used to check if the field's value has a length greater or equal than the provided minLength value.
 *
 * @author Timothée Simon-Franza
 *
 * @param {number} minLength 	The minimal length the field's value must have to pass the validation checK.
 * @param {string} messageKey	The translation key to return if the validation fails.
 *
 * @returns {string} The translation key for the validation message.
 */
const hasMinLength = (minLength, messageKey = 'min_length') => (value) => (value.trim().length >= minLength ? '' : messageKey);

export {
	isEmailAddress,
	isRequired,
	hasMaxLength,
	hasMinLength,
};
