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
	getLessonOrderOptions,
};
