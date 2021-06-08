import { createSelector } from 'reselect';

/**
 * @function
 * @name getSubjects
 * @description A selector callback which returns all subjects from the Redux state.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} state The redux state at the time of call.
 *
 * @returns {Array}
 */
const getSubjects = (state) => state?.subjects?.items ?? [];
// @TODO: Remove next line once the signin logic has been merged.
// @FIXME: Replace the uncommented line with the following commented line to test until signin logic has been merged.
// const getSubjects = (state) => state && (subjectListPageMock?.subjects?.items ?? []);

/**
 * @function
 * @name getSubjectFilterValue
 * @description An intermidate selector callback used by the getSubjectsByNameOrAuthor method to retrieve the filterValue param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} filterValue The value to pass to the getSubjectsByNameOrAuthor selector.
 *
 * @returns {string}
 */
const getSubjectFilterValue = (_, filterValue) => filterValue ?? '';

/**
 * @function
 * @name getSubjectsByNameOrAuthor
 * @description A selector callback which returns subjects whose name or author matches the filterValue param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} filterValue The value to use for filtering.
 *
 * @returns {Array}
 */
const getSubjectsByNameOrAuthor = createSelector(
	getSubjects,
	getSubjectFilterValue,
	(subjects, filterValue) => (
		subjects.filter(({ name, author = undefined }) => (
			name.toLowerCase().includes(filterValue.toLowerCase())
			|| (author?.firstName && author.firstName.toLowerCase().includes(filterValue.toLowerCase()))
			|| (author?.lastName && author.lastName.toLowerCase().includes(filterValue.toLowerCase()))
		)) ?? []
	)
);

// @TODO: create a selector to split subjects into categories (active, mine, available...)

export {
	// eslint-disable-next-line import/prefer-default-export
	getSubjects,
	getSubjectsByNameOrAuthor,
};
