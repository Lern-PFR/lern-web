import * as ResultsApi from 'api/resultsApi';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the user answer redux state.
 * @type {object}
 *
 * @author Timothée Simon-Franza
 */
export const ActionTypes = {
	USER_ANSWER_CREATION_REQUEST: '@USER_ANSWER/CREATION_REQUEST',
	USER_ANSWER_CREATION_SUCCESS: '@USER_ANSWER/CREATION_SUCCESS',
	USER_ANSWER_CREATION_FAILURE: '@USER_ANSWER/CREATION_FAILURE',

	USER_ANSWER_FETCH_REQUEST: '@USER_ANSWER/FETCH_REQUEST',
	USER_ANSWER_FETCH_SUCCESS: '@USER_ANSWER/FETCH_SUCCESS',
	USER_ANSWER_FETCH_FAILURE: '@USER_ANSWER/FETCH_FAILURE',
};

// //////////////////////////////////////////////////////// //
// ///////////////////// Answer creation ////////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @name userAnswerCreationRequest
 * @description Action triggered anytime an answer creation call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const userAnswerCreationRequest = () => ({ type: ActionTypes.USER_ANSWER_CREATION_REQUEST });

/**
 * @name userAnswerCreationSuccess
 * @description Action triggered as a result to a successful answer creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const userAnswerCreationSuccess = () => ({ type: ActionTypes.USER_ANSWER_CREATION_SUCCESS });

/**
 * @name userAnswerCreationFailure
 * @description Action triggered as a result to a failed answer creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error The exception sent back from the API.
 *
 * @returns {object}
 */
const userAnswerCreationFailure = (error) => ({
	type: ActionTypes.USER_ANSWER_CREATION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////////// Answer retrieval ////////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @name userAnswerFetchRequest
 * @description Action triggered anytime an answer creation call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const userAnswerFetchRequest = () => ({ type: ActionTypes.USER_ANSWER_FETCH_REQUEST });

/**
  * @name userAnswerFetchSuccess
  * @description Action triggered as a result to a successful answer creation API call.
  *
  * @author Timothée Simon-Franza
  *
  * @param {object} answer The newly created answer.
  *
  * @returns {object}
  */
const userAnswerFetchSuccess = ({ answer }) => ({
	type: ActionTypes.USER_ANSWER_FETCH_SUCCESS,
	payload: { answer },
});

/**
  * @name userAnswerFetchFailure
  * @description Action triggered as a result to a failed answer creation API call.
  *
  * @author Timothée Simon-Franza
  *
  * @param {object} error The exception sent back from the API.
  *
  * @returns {object}
  */
const userAnswerFetchFailure = (error) => ({
	type: ActionTypes.USER_ANSWER_FETCH_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name retrieveAnswerByQuestionId
 * @description Retrieves a user's answer to the question identified by the questionId param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} questionId The id linked to the question we want to retrieve the user's answer from.
 */
export const retrieveAnswerByQuestionId = (questionId) => (dispatch) => {
	dispatch(userAnswerFetchRequest());

	return ResultsApi.getResultByQuestionId(questionId)
		.then((answer) => dispatch(userAnswerFetchSuccess({ answer })))
		.catch((error) => dispatch(userAnswerFetchFailure(error)));
};

/**
 * @function
 * @name createUserAnswer
 * @description Registers the user's answer to the question identified by the questionId param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} questionId	The id linked to the question we want to answer.
 * @param {string} answerId		The id linked to the answer we want to provide.
 */
export const createUserAnswer = (questionId, answerId) => (dispatch) => {
	dispatch(userAnswerCreationRequest());
	const answersArray = [{ questionId, answerId }];

	return ResultsApi.answerQuestion(answersArray)
		.then(() => {
			dispatch(userAnswerCreationSuccess());
			dispatch(retrieveAnswerByQuestionId(questionId));
		})
		.catch((error) => dispatch(userAnswerCreationFailure(error)));
};
