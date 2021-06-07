/**
 * @function
 * @name getSubjects
 * @description A selector callback which returns all subjects from the Redux state.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} state The redux state at the time of call.
 *
 * @returns {Array|undefined}
 */
const getSubjects = (state) => state?.subjects?.items ?? [];

// @TODO: create a selector to split subjects into categories (active, mine, available...)

export {
	// eslint-disable-next-line import/prefer-default-export
	getSubjects,
};
