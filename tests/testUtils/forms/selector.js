/* istanbul ignore file */
import _ from 'lodash';

/**
 * @function
 * @name resolveSelector
 * @description Resolves the given simplified selector to a valid one.
 *
 * @author Yann Hodiesne
 *
 * Note: this function should be awaited.
 *
 * @param {string} selector : The simplified selector to resolve.
 *
 * @returns The resolved selector.
 */
export const resolveSelector = (selector) => {
	let resolved;

	if (_.includes(selector, '=')) {
		resolved = selector;

		// Add brackets if they are missing
		if (!_.startsWith(resolved, '[') || !_.endsWith(resolved, ']')) {
			resolved = `[${_.trim(resolved, '[]')}]`;
		}
	} else {
		resolved = `[name="${selector}"]`;
	}

	return resolved;
};

export default resolveSelector;
