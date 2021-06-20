/**
 * @function
 * @name extractFirstQuestionFromLesson
 * @description Extracts the first question of the given lesson if it exists.
 *
 * @param {object} lesson The lesson to extract a question from.
 *
 * @return {object|undefined}
 */
const extractFirstQuestionFromLesson = (lesson) => (lesson?.exercises?.[0]?.questions?.[0]);

export {
	// eslint-disable-next-line import/prefer-default-export
	extractFirstQuestionFromLesson,
};
