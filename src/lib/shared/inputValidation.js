/**
 * @function
 * @name isRequired
 * @description A validation method used to check if the field is set.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string|number}	value	The input's current value.
 * @param {string}			message	The message to return if the validation fails.
 *
 * @returns {string} The translation key for the validation message.
 */
const isRequired = (messageKey = 'required') => (value) => ((value ?? '').trim().length === 0 ? messageKey : '');

/**
 * @function
 * @name isEmailAddress
 * @description A validation method used to check if the field has an email formatted value.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string|number}	value	The input's current value.
 * @param {string}			message	The message to return if the validation fails.
 *
 * @returns {string} The translation key for the validation message.
 */
const isEmailAddress = (messageKey = 'email') => (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value ?? '').trim()) ? '' : messageKey);

export {
	isEmailAddress,
	isRequired,
};
