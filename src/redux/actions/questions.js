import * as QuestionsApi from 'api/questionsApi';
import i18next from 'i18next';
import { toast } from 'react-toastify';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the questions redux state.
 * @type {object}
 *
 * @author Christopher Walker
 */
export const ActionTypes = {
	FETCH_QUESTION_REQUEST: '@QUESTIONS/FETCH_REQUEST',
	FETCH_QUESTION_SUCCESS: '@QUESTIONS/FETCH_SUCCESS',
	FETCH_QUESTION_FAILURE: '@QUESTIONS/FETCH_FAILURE',

	CREATE_QUESTION_REQUEST: '@QUESTIONS/CREATE_REQUEST',
	CREATE_QUESTION_SUCCESS: '@QUESTIONS/CREATE_SUCCESS',
	CREATE_QUESTION_FAILURE: '@QUESTIONS/CREATE_FAILURE',

	UPDATE_QUESTION_REQUEST: '@QUESTIONS/UPDATE_REQUEST',
	UPDATE_QUESTION_SUCCESS: '@QUESTIONS/UPDATE_SUCCESS',
	UPDATE_QUESTION_FAILURE: '@QUESTIONS/UPDATE_FAILURE',

	DELETE_QUESTION_REQUEST: '@QUESTIONS/DELETE_REQUEST',
	DELETE_QUESTION_SUCCESS: '@QUESTIONS/DELETE_SUCCESS',
	DELETE_QUESTION_FAILURE: '@QUESTIONS/DELETE_FAILURE',

	CLEAR_QUESTION_LIST: '@QUESTIONS/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// //////////// Specific question fetching actions ////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchQuestionRequest
 * @description Action triggered anytime a question fetching call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const fetchQuestionRequest = () => ({ type: ActionTypes.FETCH_QUESTION_REQUEST });

/**
  * @function
  * @name fetchQuestionSuccess
  * @description Action triggered as a result to a successful question fetching API call.
  *
  * @author Christopher Walker
  *
  * @param {object} question : The question retrieved from the API.
  *
  * @returns {object}
  */
const fetchQuestionSuccess = ({ question }) => ({
	type: ActionTypes.FETCH_QUESTION_SUCCESS,
	payload: { question },
});

/**
 * @function
 * @name fetchQuestionFailure
 * @description Action triggered as a result to a failed question fetching API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchQuestionFailure = (error) => ({
	type: ActionTypes.FETCH_QUESTION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Question creation actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name createQuestionRequest
 * @description Action triggered anytime a question creation call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const createQuestionRequest = () => ({ type: ActionTypes.CREATE_QUESTION_REQUEST });

/**
 * @function
 * @name createQuestionSuccess
 * @description Action triggered as a result to a successfult question creation API call.
 *
 * @author Christopher Walker
 *
 * @param {object} question : The newly created question.
 *
 * @returns {object}
 */
const createQuestionSuccess = ({ question }) => ({
	type: ActionTypes.CREATE_QUESTION_SUCCESS,
	payload: { question },
});

/**
 * @function
 * @name createQuestionFailure
 * @description Action triggered as a result to a failed question creation API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const createQuestionFailure = (error) => ({
	type: ActionTypes.CREATE_QUESTION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Question edition actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateQuestionRequest
 * @description Action triggered anytime a question edition call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const updateQuestionRequest = () => ({ type: ActionTypes.UPDATE_QUESTION_REQUEST });

/**
 * @function
 * @name updateQuestionSuccess
 * @description Action triggered as a result to a successful question edition API call.
 *
 * @author Christopher Walker
 *
 * @param {object} question : The updated question object.
 *
 * @returns {object}
 */
const updateQuestionSuccess = ({ question }) => ({
	type: ActionTypes.UPDATE_QUESTION_SUCCESS,
	payload: { question },
});

/**
 * @function
 * @name updateQuestionFailure
 * @description Action triggered as a result to a failed question edition API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const updateQuestionFailure = (error) => ({
	type: ActionTypes.UPDATE_QUESTION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Question deletion actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name deleteQuestionRequest
 * @description Action triggered anytime a question deletion call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const deleteQuestionRequest = () => ({ type: ActionTypes.DELETE_QUESTION_REQUEST });

/**
 * @function
 * @name deleteQuestionSuccess
 * @description Action triggered as a result to a successful question deletion API call.
 *
 * @author Christopher Walker
 *
 * @param {object} question : The deleted question object.
 *
 * @returns {object}
 */
const deleteQuestionSuccess = ({ question }) => ({
	type: ActionTypes.DELETE_QUESTION_SUCCESS,
	payload: { question },
});

/**
 * @function
 * @name deleteQuestionFailure
 * @description Action triggered as a result to a failed question deletion API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const deleteQuestionFailure = (error) => ({
	type: ActionTypes.DELETE_QUESTION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// ///////////// Question list clearing actions ///////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name clearQuestionListAction
 * @description Action triggered anytime the question list is not needed anymore.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const clearQuestionListAction = () => ({ type: ActionTypes.CLEAR_QUESTION_LIST });

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchQuestion
 * @description Method used to fetch the latest version of a specified question.
 *
 * @author Christopher Walker
 *
 * @param {string} questionId : The id of the question we want to retrieve.
 */
export const fetchQuestion = (questionId) => (dispatch) => {
	dispatch(fetchQuestionRequest());

	return QuestionsApi.fetchQuestionById(questionId)
		.then((question) => dispatch(fetchQuestionSuccess({ question })))
		.catch((error) => dispatch(fetchQuestionFailure(error)));
};

/**
 * @function
 * @name createQuestion
 * @description Method used to create a new question in the database.
 *
 * @author Christopher Walker
 *
 * @param {object} questionData : The data to create the new question from.
 */
export const createQuestion = (questionData) => (dispatch) => {
	dispatch(createQuestionRequest());

	return QuestionsApi.createQuestion(questionData)
		.then((question) => {
			dispatch(createQuestionSuccess({ question }));
		})
		.catch((error) => dispatch(createQuestionFailure(error)));
};

/**
 * @function
 * @name updateQuestion
 * @description Method used to update an existing question instance from the database.
 *
 * @author Christopher Walker
 *
 * @param {object} questionData	: The data to update the question with.
 * @param {string} questionId		: The id to identify the question to update.
 */
export const updateQuestion = (questionData, questionId) => (dispatch) => {
	dispatch(updateQuestionRequest());

	return QuestionsApi.updateQuestion(questionData, questionId)
		.then((question) => dispatch(updateQuestionSuccess({ question })))
		.catch((error) => dispatch(updateQuestionFailure(error)));
};

/**
 * @function
 * @name deleteQuestion
 * @description Method used to remove an existing question from the database.
 *
 * @author Christopher Walker
 *
 * @param {string} questionId : The id identifying the question to remove.
 */
export const deleteQuestion = (questionId) => (dispatch) => {
	dispatch(deleteQuestionRequest());

	return QuestionsApi.deleteQuestion(questionId)
		.then((question) => {
			dispatch(deleteQuestionSuccess({ question }));
			toast.success(i18next.t('questions.deletion.toasts.success'));
		})
		.catch((error) => dispatch(deleteQuestionFailure(error)));
};

/**
 * @function
 * @name clearQuestionList
 * @description Method used to clear the question list stored in memory when the application does not need it anymore.
 *
 * @author Christopher Walker
 *
 * @returns {Promise.resolve}
 */
export const clearQuestionList = () => (dispatch) => {
	dispatch(clearQuestionListAction());

	return Promise.resolve();
};
