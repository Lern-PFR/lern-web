import { sortBy } from 'lodash';
import { createSelector } from 'reselect';

/**
 * @function
 * @name getProgression
 * @description A selector callback which returns all progression instances from the Redux state.
 *
 * @author Christopher Walker
 *
 * @param {object} state The redux state at the time of call.
 *
 * @returns {Array}
 */
const getProgression = (state) => sortBy(state?.progression?.items, 'createdAt') ?? [];

/**
 * @function
 * @name getProgressionBySubject
 * @description A selector callback which returns the progression whose subjectId matched the subjectId parameter.
 *
 * @author Christopher Walker
 *
 * @param {string} subjectId The id of the subject for which we want to retrieve the progression.
 *
 * @returns {object|undefined}
 */
const getProgressionBySubject = createSelector(
	getProgression,
	(_, subjectId) => subjectId,
	(progressionList, subjectId) => {
		const progression = progressionList.filter(({ id }) => (id === subjectId))?.[0] ?? undefined; // progressionList existe?

		if (progression === undefined) {
			return progression;
		}

		return {
			...progression,
		};
	}
);

export {
	getProgression,
	getProgressionBySubject,
};
