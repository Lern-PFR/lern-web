import { sortBy } from 'lodash';
import { createSelector } from 'reselect';

/**
 * @function
 * @name getConcepts
 * @description A selector callback which returns all concepts from the Redux state.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} state The redux state at the time of call.
 *
 * @returns {Array}
 */
const getConcepts = (state) => state?.concepts?.items ?? [];

/**
 * @function
 * @name getConceptById
 * @description A selector callback which returns the concept whose id matches the conceptId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} conceptId The id of the concept we want to retrieve.
 *
 * @returns {object|undefined}
 */
const getConceptById = createSelector(
	getConcepts,
	(_, conceptId) => conceptId,
	(concepts, conceptId) => {
		const concept = concepts.filter(({ id }) => (id === conceptId))?.[0] ?? undefined;

		if (concept === undefined) {
			return concept;
		}

		// @TODO: remove following snippet with the commented "return" snippet once the API has been updated.
		const { courses, ...result } = concept;

		return {
			...result,
			lessons: sortBy(concept?.courses || [], 'order'),
		};

		// return {
		// 	...concept,
		// 	lessons: sortBy(concept?.lessons || [], 'order'),
		// };
	}
);

export {
	getConcepts,
	getConceptById,
};
