import { sortBy } from 'lodash';
import { createSelector } from 'reselect';
import { getSubjectById } from './subjects';

/**
 * @function
 * @name getModules
 * @description A selector callback which returns all modules from the Redux state.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} state The redux state at the time of call.
 *
 * @returns {Array}
 */
const getModules = (state) => state?.modules?.items ?? [];

/**
 * @function
 * @name getModuleById
 * @description A selector callback which returns the module whose id matched the moduleId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId The id of the module we want to retrieve.
 *
 * @returns {object|undefined}
 */
const getModuleById = createSelector(
	getModules,
	(_, moduleId) => moduleId,
	(modules, moduleId) => {
		const module = modules.filter(({ id }) => (id === moduleId))?.[0] ?? undefined;

		if (module === undefined) {
			return module;
		}

		const concepts = (module.concepts ?? []).map((concept) => {
			const { courses, ...result } = concept; // @TODO: remove this line once the API has been updated.

			const lessons = Object.values((concept.courses || []).reduce((acc, currentLesson) => {
				const currentlyStoredLesson = acc[currentLesson.id];
				if (currentlyStoredLesson) {
					acc[currentLesson.id] = currentlyStoredLesson.version < currentLesson.version ? currentLesson : currentlyStoredLesson;
				} else {
					acc[currentLesson.id] = currentLesson;
				}

				return acc;
			}, {}));

			return {
				...result,
				lessons: sortBy(lessons, 'order'),
			};
		});

		return {
			...module,
			concepts: sortBy(concepts || [], 'order'),
		};
	}
);

/**
 * @function
 * @name getModuleOrderOptions
 * @description A selector callback which returns an array of "order" values for the module edition form's order select field.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Array}
 */
const getModuleOrderOptions = createSelector(
	getSubjectById,
	(subject) => {
		if (!subject?.modules?.length || subject?.modules?.length < 1) {
			return [{ label: 0, value: 0 }];
		}

		return Array.from({ length: subject?.modules?.length || 0 }, (_, i) => ({ label: i, value: i }));
	}
);

export {
	getModules,
	getModuleById,
	getModuleOrderOptions,
};
