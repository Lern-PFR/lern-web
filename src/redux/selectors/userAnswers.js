/**
 * @function
 * @name getUserAnswer
 * @description A selector callback which retrieves the current userAnswer from the redux state.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} state The redux state at the time of call.
 *
 * @returns {object|undefined}
 */
const getUserAnswer = (state) => state?.userAnswers?.items?.[0] ?? undefined;

export {
	// eslint-disable-next-line import/prefer-default-export
	getUserAnswer,
};
