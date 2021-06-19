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

		// @TODO: replace concept.courses with courses.lessons once the API has been updated.
		// Removes older versions of each lesson from the list.
		const lessons = Object.values((concept.courses || []).reduce((acc, currentLesson) => {
			const currentlyStoredLesson = acc[currentLesson.id];
			if (currentlyStoredLesson) {
				acc[currentLesson.id] = currentlyStoredLesson.version < currentLesson.version ? currentLesson : currentlyStoredLesson;
			} else {
				acc[currentLesson.id] = currentLesson;
			}

			return acc;
		}, {}));

		// @TODO: remove following snippet with the commented "return" snippet once the API has been updated.
		const { courses, ...result } = concept;

		return {
			...result,
			lessons: sortBy(lessons, 'order'),
		};

		// return {
		// 	...concept,
		//	lessons: sortBy(lessons),
		// };
	}
);

export {
	getConcepts,
	getConceptById,
};
