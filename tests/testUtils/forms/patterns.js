/* istanbul ignore file */
/**
 * @name Patterns
 * @description An enum of the patterns available for testing purposes.
 *
 * @author Yann Hodiesne
 */
export const Patterns = Object.freeze({
	EMAIL: 'email',
	TEL: 'tel',
});

/**
 * @function
 * @name getInvalidValue
 * @description Returns an invalid value for the given pattern type
 *
 * @author Yann Hodiesne
 *
 * @param {string} type : Pattern type to use.
 *
 * @returns The value to use inside a test case.
 */
export const getInvalidValue = (type) => {
	switch (type) {
		case Patterns.EMAIL:
			return 'johnDoe';
		case Patterns.TEL:
			return '1234';
		default:
			return '';
	}
};

/**
 * @function
 * @name getValidValue
 * @description Returns a valid value for the given pattern type
 *
 * @author Yann Hodiesne
 *
 * @param {string} type : Pattern type to use.
 *
 * @returns The value to use inside a test case.
 */
export const getValidValue = (type) => {
	switch (type) {
		case Patterns.EMAIL:
			return 'johnDoe@gmail.com';
		case Patterns.TEL:
			return '0612345678';
		default:
			return '';
	}
};
