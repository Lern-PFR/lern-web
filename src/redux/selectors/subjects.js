import { sortBy } from 'lodash';
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
const getSubjects = (state) => state?.subjects?.items ?? { all: [], mine: [], active: [], available: [] };

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
 * @name filterByTitleOrAuthor
 * @description Pure private method which filters the subjectList array param with the filterValue parameter's value.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array} subjectList	The list of subjects to filter.
 * @param {string} filterValue	The value to use as a filtering criteria.
 *
 * @returns {Array}
 */
const filterByTitleOrAuthor = (subjectList, filterValue) => (
	subjectList.filter(({ title, author = undefined }) => (
		title.toLowerCase().includes(filterValue.toLowerCase())
		|| (author?.firstname && author.firstname.toLowerCase().includes(filterValue.toLowerCase()))
		|| (author?.lastname && author.lastname.toLowerCase().includes(filterValue.toLowerCase()))
	)) ?? []
);

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
	({ mine, active, available }, filterValue) => ({
		mine: filterByTitleOrAuthor(mine, filterValue),
		active: filterByTitleOrAuthor(active, filterValue),
		available: filterByTitleOrAuthor(available, filterValue),
	})
);

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
	({ all: subjects }, subjectId) => {
		const subject = subjects.filter(({ id }) => (id === subjectId))?.[0] ?? undefined;

		if (subject === undefined) {
			return undefined;
		}

		return {
			...subject,
			modules: sortBy(subject?.modules || [], 'order'),
		};
	}
);

/**
 * @function
 * @name getContentManipulationSidebarData
 * @description A selector callback which returns data to be used by the content manipulation pages' navigation sidebar.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Array}
 */
const getContentManipulationSidebarData = createSelector(
	getSubjectById,
	(subject) => {
		if (subject === undefined) {
			return undefined;
		}

		let data = [
			{ label: subject.title, id: subject.id, contentType: 'subject' },
		];

		sortBy(subject.modules, 'order').forEach(({ id: moduleId, title: moduleTitle, order: moduleOrder, concepts = [] }) => {
			data = [...data, { id: moduleId, label: `${moduleOrder}. ${moduleTitle}`, order: moduleOrder, contentType: 'module' }];

			sortBy(concepts, 'order').forEach(({ id: conceptId, title: conceptTitle, order: conceptOrder, courses = [] }) => {
				data = [...data, { id: conceptId, label: `${moduleOrder}.${conceptOrder}. ${conceptTitle}`, order: conceptOrder, contentType: 'concept' }];

				// Removes older versions of each lesson from the list.
				const lessons = Object.values(courses.reduce((acc, currentLesson) => {
					const currentlyStoredLesson = acc[currentLesson.id];
					if (currentlyStoredLesson) {
						acc[currentLesson.id] = currentlyStoredLesson.version < currentLesson.version ? currentLesson : currentlyStoredLesson;
					} else {
						acc[currentLesson.id] = currentLesson;
					}

					return acc;
				}, {}));
				sortBy(lessons, 'order').forEach(({ id: courseId, title: courseTitle, order: courseOrder, version }) => {
					data = [...data, { id: courseId, label: `${moduleOrder}.${conceptOrder}.${courseOrder}. ${courseTitle}`, order: courseOrder, contentType: 'course', version }];
				});
			});
		});

		return data;
	}
);

export {
	getSubjects,
	getSubjectById,
	getSubjectsByTitleOrAuthor,
	getContentManipulationSidebarData,
};
