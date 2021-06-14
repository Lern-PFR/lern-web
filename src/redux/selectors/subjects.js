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

/**
 * @function
 * @name getSubjectFilterValue
 * @description An intermidate selector callback used by the getSubjectsByTitleOrAuthor method to retrieve the filterValue param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} filterValue The value to pass to the getSubjectsByTitleOrAuthor selector.
 *
 * @returns {string}
 */
const getSubjectFilterValue = (_, filterValue) => filterValue ?? '';

/**
 * @function
 * @name getSubjectsByTitleOrAuthor
 * @description A selector callback which returns subjects whose name or author matches the filterValue param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} filterValue The value to use for filtering.
 *
 * @returns {Array}
 */
const getSubjectsByTitleOrAuthor = createSelector(
	getSubjects,
	getSubjectFilterValue,
	(subjects, filterValue) => (
		subjects.filter(({ title, author = undefined }) => (
			title.toLowerCase().includes(filterValue.toLowerCase())
			|| (author?.firstname && author.firstname.toLowerCase().includes(filterValue.toLowerCase()))
			|| (author?.lastname && author.lastname.toLowerCase().includes(filterValue.toLowerCase()))
		)) ?? []
	)
);

// @TODO: create a selector to split subjects into categories (active, mine, available...)

/**
 * @function
 * @name getSubjectById
 * @description A selector callback which returns subjects whose name or author matches the subjectId param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} subjectId The id of the subject we want to retrieve.
 *
 * @returns {object|undefined}
 */
const getSubjectById = createSelector(
	getSubjects,
	(_, subjectId) => subjectId,
	(subjects, subjectId) => subjects.filter(({ id }) => (id === subjectId))?.[0] ?? undefined
);

export {
	// eslint-disable-next-line import/prefer-default-export
	getSubjects,
	getSubjectById,
	getSubjectsByTitleOrAuthor,
};
