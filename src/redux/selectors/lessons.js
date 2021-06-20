import { sortBy } from 'lodash';
import { createSelector } from 'reselect';
import { getUserAnswer } from './userAnswers';
import { getConceptById } from './concepts';

/**
 * @function
 * @name extractFirstQuestionFromLesson
 * @description Extracts the first question of the given lesson if it exists.
 *
 * @param {object} lesson The lesson to extract a question from.
 *
 * @return {object|undefined}
 */
const extractFirstQuestionFromLesson = createSelector(
	getUserAnswer,
	(_, lesson) => lesson ?? undefined,
	(userAnswer, lesson) => {
		const question = lesson?.exercises?.[0]?.questions?.[0];

		if (!question) {
			return undefined;
		}

		if (question && userAnswer && question.id === userAnswer.questionId && question.answers) {
			question.answers = question.answers.map((answer) => ({
				...answer,
				isUserAnswer: answer.id === userAnswer.answerId,
			}));
		}

		return {
			...question,
			answers: sortBy(question.answers ?? [], 'text'),
		};
	}
);

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
const getLessons = (state) => state?.lessons?.items ?? [];

/**
 * @function
 * @name getLessonById
 * @description A selector callback which returns the lesson whose id matches the lessonId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} lessonId The id of the lesson we want to retrieve.
 *
 * @returns {object|undefined}
 */
const getLessonById = createSelector(
	getLessons,
	(_, lessonId) => lessonId,
	(lessons, lessonId) => {
		const filteredLessons = lessons.filter(({ id }) => (id === lessonId));
		if (filteredLessons.length === 0) {
			return undefined;
		}

		// retrieves the latest version of the lessons which id matches the lessonId param.
		const lesson = Object.values((filteredLessons || []).reduce((acc, currentLesson) => {
			const currentlyStoredLesson = acc[currentLesson.id];
			if (currentlyStoredLesson) {
				acc[currentLesson.id] = currentlyStoredLesson.version < currentLesson.version ? currentLesson : currentlyStoredLesson;
			} else {
				acc[currentLesson.id] = currentLesson;
			}

			return acc;
		}, {}))?.[0] ?? undefined;

		return lesson;
	}
);

/**
 * @function
 * @name getLessonOrderOptions
 * @description A selector callback which returns an array of "order" values for the lesson edition form's order select field.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Array}
 */
const getLessonOrderOptions = createSelector(
	getConceptById,
	(concept) => {
		if (!concept?.lessons?.length || concept?.lessons?.length < 1) {
			return [{ label: 0, value: 0 }];
		}

		return Array.from({ length: concept?.lessons?.length || 0 }, (_, i) => ({ label: i, value: i }));
	}
);

export {
	extractFirstQuestionFromLesson,
	getLessons,
	getLessonById,
	getLessonOrderOptions,
};
