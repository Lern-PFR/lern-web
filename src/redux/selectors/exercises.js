import { sortBy } from 'lodash';
import { createSelector } from 'reselect';

/**
 * @name getLessons
 * @description A selector callback which returns all lessons from the Redux state.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} state The redux state at the time of call.
 *
 * @returns {Array}
 */
const getExercises = (state) => state?.exercises?.items ?? [];

/**
 * @function
 * @name getModuleById
 * @description A selector callback which returns the module whose id matched the moduleId parameter.
 *
 * @author Christopher Walker
 *
 * @param {string} exerciseId The id of the module we want to retrieve.
 *
 * @returns {object|undefined}
 */
const getExerciseById = createSelector(
	getExercises,
	(_, exerciseId) => exerciseId,
	(exercises, exerciseId) => {
		const exercise = exercises.filter(({ id }) => (id === exerciseId))?.[0] ?? undefined;

		if (exercise === undefined) {
			return undefined;
		}

		return {
			...exercise,
			questions: sortBy(exercise?.questions || [], 'order'),
		};
	}
);

export {
	getExercises,
	getExerciseById,
};
