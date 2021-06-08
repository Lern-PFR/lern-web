/**
 * @function
 * @name validateField
 * @description Performs a validation check for all provided rules and returns the result in an object.
 *
 * @author Timothée Simon-Franza
 *
 * @param {number|string}	value	The input's current value.
 * @param {array}			[rules]	The inputs validation rules.
 *
 * @returns {object}
 */
const validateField = (value, rules = []) => {
	const validationResults = Object.entries(rules)								// Iterates over the defined validation rules
		.map(([rule, validator]) => ([rule, validator(value) || undefined]))	// Performs the validation check.
		.filter(([, validationResult]) => validationResult !== undefined);		// Filters out passed validation rules.

	return Object.fromEntries(validationResults);
};

/**
 * @function
 * @name validateForm
 * @description Calls the validateField method for each field in the fieldsRef parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} fieldsRefs		An object containing input refs.
 * @param {object} validationRules	An object listing validation rules for each field.
 *
 * @returns {object}
 */
const validateForm = (fieldsRefs = {}, validationRules = {}) => {
	const formValidationResult = {};

	Object.entries(fieldsRefs).forEach(([name, { value }]) => {
		formValidationResult[name] = validateField(value, validationRules[name]);
	});

	return formValidationResult;
};

/**
 * @function
 * @name isFormValid
 * @description Checks if the form has any validation error.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} formErrors The object containing the validation results for each field.
 *
 * @returns {bool} true if the form has no validation error, false otherwise.
 */
const isFormValid = (formErrors) => Object.values(formErrors).reduce((acc, field) => (acc + Object.keys(field).length), 0) === 0;

export {
	isFormValid,
	validateField,
	validateForm,
};
