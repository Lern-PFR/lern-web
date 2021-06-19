import * as ProgressionApi from 'api/progressionApi';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the Progression redux state.
 * @type {object}
 *
 * @author Christopher Walker
 */
export const ActionTypes = {
	FETCH_PROGRESSION_REQUEST: '@PROGRESSION/FETCH_REQUEST',
	FETCH_PROGRESSION_SUCCESS: '@PROGRESSION/FETCH_SUCCESS',
	FETCH_PROGRESSION_FAILURE: '@PROGRESSION/FETCH_FAILURE',

	FETCH_PROGRESSION_LIST_REQUEST: '@PROGRESSION/FETCH_LIST_REQUEST',
	FETCH_PROGRESSION_LIST_SUCCESS: '@PROGRESSION/FETCH_LIST_SUCCESS',
	FETCH_PROGRESSION_LIST_FAILURE: '@PROGRESSION/FETCH_LIST_FAILURE',

	UPDATE_PROGRESSION_REQUEST: '@PROGRESSION/UPDATE_REQUEST',
	UPDATE_PROGRESSION_SUCCESS: '@PROGRESSION/UPDATE_SUCCESS',
	UPDATE_PROGRESSION_FAILURE: '@PROGRESSION/UPDATE_FAILURE',

	CLEAR_PROGRESSION_LIST: '@PROGRESSION/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// ///////////// Specific progression fetching actions //// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchProgressionRequest
 * @description Action triggered anytime a progression fetching call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const fetchProgressionRequest = () => ({ type: ActionTypes.FETCH_PROGRESSION_REQUEST });

/**
  * @function
  * @name fetchProgressionSuccess
  * @description Action triggered as a result to a successful progression fetching API call.
  *
  * @author Christopher Walker
  *
  * @param {object} progression : The retrieved progression object.
  *
  * @returns {object}
  */
const fetchProgressionSuccess = ({ progression }) => ({
	type: ActionTypes.FETCH_PROGRESSION_SUCCESS,
	payload: { progression },
});

/**
  * @function
  * @name fetchProgressionFailure
  * @description Action triggered as a result to a failed progression fetching API call.
  *
  * @author Christopher Walker
  *
  * @param {object} error : The exception sent back from the API.
  *
  * @returns {object}
  */
const fetchProgressionFailure = (error) => ({
	type: ActionTypes.FETCH_PROGRESSION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////// Progression list fetching actions ////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchProgressionListRequest
 * @description Action triggered anytime a progression list fetching call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const fetchProgressionListRequest = () => ({ type: ActionTypes.FETCH_PROGRESSION_LIST_REQUEST });

/**
 * @function
 * @name fetchProgressionListSuccess
 * @description Action triggered as a result to a successful progerssion list fetching API call.
 *
 * @author Christopher Walker
 *
 * @param {array}	progressionList	The list of retrieved progressions.
 * @param {number}	totalCount		The total amount of progressions available in the database for the current user.
 *
 * @returns {object}
 */
const fetchProgressionListSuccess = ({ progressionList, totalCount }) => ({
	type: ActionTypes.FETCH_PROGRESSION_LIST_SUCCESS,
	payload: { progressionList, totalCount },
});

/**
 * @function
 * @name fetchProgressionListFailure
 * @description Action triggered as a result to a failed progression list fetching API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchProgressionListFailure = (error) => ({
	type: ActionTypes.FETCH_PROGRESSION_LIST_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////////// Progression update actions ///////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateProgressionRequest
 * @description Action triggered anytime a progression update call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const updateProgressionRequest = () => ({ type: ActionTypes.UPDATE_PROGRESSION_REQUEST });

/**
 * @function
 * @name updateProgressionSuccess
 * @description Action triggered as a result to a successful progression update API call.
 *
 * @author Christopher Walker
 *
 * @param {object} progression : The updated progression object.
 *
 * @returns {object}
 */
const updateProgressionSuccess = ({ progression }) => ({
	type: ActionTypes.UPDATE_PROGRESSION_SUCCESS,
	payload: { progression },
});

/**
 * @function
 * @name updateProgressionFailure
 * @description Action triggered as a result to a failed progression update API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const updateProgressionFailure = (error) => ({
	type: ActionTypes.UPDATE_PROGRESSION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////// Progression list clearing actions ///////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name clearProgressionListAction
 * @description Action triggered anytime the progression list is not needed anymore.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const clearProgressionListAction = () => ({ type: ActionTypes.CLEAR_PROGRESSION_LIST });

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchProgression
 * @description Method used to fetch the latest version of a specific progression.
 *
 * @author Christopher Walker
 *
 * @param {string} subjectId	The id of the subject we want to retrieve progression for.
 */
export const fetchProgression = (subjectId) => (dispatch) => {
	dispatch(fetchProgressionRequest());

	return ProgressionApi.fetchProgressionBySubjectId(subjectId)
		.then((progression) => dispatch(fetchProgressionSuccess({ progression })))
		.catch((error) => dispatch(fetchProgressionFailure(error)));
};

/**
 * @function
 * @name fetchProgressionList
 * @description Method used to fetch all progression objects available to the current user.
 *
 * @author Christopher Walker
 */
export const fetchProgressionList = () => (dispatch) => {
	dispatch(fetchProgressionListRequest());

	return ProgressionApi.fetchProgression()
		.then((progressionList) => dispatch(fetchProgressionListSuccess({ progressionList, totalCount: progressionList.length })))
		.catch((error) => dispatch(fetchProgressionListFailure(error)));
};

/**
 * @function
 * @name updateProgression
 * @description Method used to update an existing progression instance from the database.
 *
 * @author Christopher Walker
 *
 * @param {object} progressionData	The data to update the progression with.
 */
export const updateProgression = (progressionData) => (dispatch) => {
	dispatch(updateProgressionRequest());

	return ProgressionApi.updateProgression(progressionData)
		.then((progression) => dispatch(updateProgressionSuccess({ progression })))
		.catch((error) => dispatch(updateProgressionFailure(error)));
};

/**
 * @function
 * @name clearProgressionList
 * @description Method used to clear the progression list stored in memory when the application does not need it anymore.
 *
 * @author Christopher Walker
 *
 * @returns {Promise.resolve}
 */
export const clearProgressionList = () => (dispatch) => {
	dispatch(clearProgressionListAction());

	return Promise.resolve();
};
