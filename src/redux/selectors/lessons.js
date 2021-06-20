import { sortBy } from 'lodash';
import { createSelector } from 'reselect';
import { getUserAnswer } from './userAnswers';

// const extractFirstQuestionFromLesson = (lesson) => (lesson?.exercises?.[0]?.questions?.[0]);

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

export {
	// eslint-disable-next-line import/prefer-default-export
	extractFirstQuestionFromLesson,
};
