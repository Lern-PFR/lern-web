import * as NotionsApi from 'api/notionsApi';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the notions redux state.
 * @type {object}
 *
 * @author Timothée Simon-Franza
 */
export const ActionTypes = {
	FETCH_NOTION_REQUEST: '@NOTIONS/FETCH_REQUEST',
	FETCH_NOTION_SUCCESS: '@NOTIONS/FETCH_SUCCESS',
	FETCH_NOTION_FAILURE: '@NOTIONS/FETCH_FAILURE',

	FETCH_NOTION_LIST_REQUEST: '@NOTIONS/FETCH_LIST_REQUEST',
	FETCH_NOTION_LIST_SUCCESS: '@NOTIONS/FETCH_LIST_SUCCESS',
	FETCH_NOTION_LIST_FAILURE: '@NOTIONS/FETCH_LIST_FAILURE',

	CREATE_NOTION_REQUEST: '@NOTIONS/CREATE_REQUEST',
	CREATE_NOTION_SUCCESS: '@NOTIONS/CREATE_SUCCESS',
	CREATE_NOTION_FAILURE: '@NOTIONS/CREATE_FAILURE',

	UPDATE_NOTION_REQUEST: '@NOTIONS/UPDATE_REQUEST',
	UPDATE_NOTION_SUCCESS: '@NOTIONS/UPDATE_SUCCESS',
	UPDATE_NOTION_FAILURE: '@NOTIONS/UPDATE_FAILURE',

	DELETE_NOTION_REQUEST: '@NOTIONS/DELETE_REQUEST',
	DELETE_NOTION_SUCCESS: '@NOTIONS/DELETE_SUCCESS',
	DELETE_NOTION_FAILURE: '@NOTIONS/DELETE_FAILURE',

	CLEAR_NOTION_LIST: '@NOTIONS/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// //////////// Specific notion fetching actions ////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchNotionRequest
 * @description Action triggered anytime a notion fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchNotionRequest = () => ({ type: ActionTypes.FETCH_NOTION_REQUEST });

/**
 * @function
 * @name fetchNotionSuccess
 * @description Action triggered as a result to a successful notion fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} notion : The notion retrieved from the API.
 *
 * @returns {object}
 */
const fetchNotionSuccess = ({ notion }) => ({
	type: ActionTypes.FETCH_NOTION_SUCCESS,
	payload: { notion },
});

/**
 * @function
 * @name fetchNotionFailure
 * @description Action triggered as a result to a failed notion fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchNotionFailure = (error) => ({
	type: ActionTypes.FETCH_NOTION_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchNotion
 * @description Method used to fetch the latest version of a specified notion.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} notionId : The id of the notion we want to retrieve.
 */
export const fetchNotion = (notionId) => (dispatch) => {
	dispatch(fetchNotionRequest());

	return NotionsApi.fetchNotionById(notionId)
		.then(({ notion }) => dispatch(fetchNotionSuccess({ notion })))
		.catch((error) => dispatch(fetchNotionFailure(error)));
};
