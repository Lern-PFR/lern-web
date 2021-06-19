import { sortBy } from 'lodash';
import { createSelector } from 'reselect';
import { getModuleById } from './modules';

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

		// Removes older versions of each lesson from the list.
		const lessons = Object.values((concept.lessons || []).reduce((acc, currentLesson) => {
			const currentlyStoredLesson = acc[currentLesson.id];
			if (currentlyStoredLesson) {
				acc[currentLesson.id] = currentlyStoredLesson.version < currentLesson.version ? currentLesson : currentlyStoredLesson;
			} else {
				acc[currentLesson.id] = currentLesson;
			}

			return acc;
		}, {}));

		return {
			...concept,
			lessons: sortBy(lessons, 'order'),
		};
	}
);

/**
 * @function
 * @name getConceptOrderOptions
 * @description A selector callback which returns an array of "order" values for the concept edition form's order select field.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Array}
 */
const getConceptOrderOptions = createSelector(
	getModuleById,
	(module) => {
		if (!module?.concepts?.length || module?.concepts?.length < 1) {
			return [{ label: 0, value: 0 }];
		}

		return Array.from({ length: module?.concepts?.length || 0 }, (_, i) => ({ label: i, value: i }));
	}
);

export {
	getConcepts,
	getConceptById,
	getConceptOrderOptions,
};
