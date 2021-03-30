import * as ModulesApi from 'api/modulesApi';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the modules redux state.
 * @type {object}
 *
 * @author Timothée Simon-Franza
 */
export const ActionTypes = {
	FETCH_MODULE_REQUEST: '@MODULES/FETCH_REQUEST',
	FETCH_MODULE_SUCCESS: '@MODULES/FETCH_SUCCESS',
	FETCH_MODULE_FAILURE: '@MODULES/FETCH_FAILURE',

	FETCH_MODULE_LIST_REQUEST: '@MODULES/FETCH_LIST_REQUEST',
	FETCH_MODULE_LIST_SUCCESS: '@MODULES/FETCH_LIST_SUCCESS',
	FETCH_MODULE_LIST_FAILURE: '@MODULES/FETCH_LIST_FAILURE',

	CREATE_MODULE_REQUEST: '@MODULES/CREATE_REQUEST',
	CREATE_MODULE_SUCCESS: '@MODULES/CREATE_SUCCESS',
	CREATE_MODULE_FAILURE: '@MODULES/CREATE_FAILURE',

	UPDATE_MODULE_REQUEST: '@MODULES/UPDATE_REQUEST',
	UPDATE_MODULE_SUCCESS: '@MODULES/UPDATE_SUCCESS',
	UPDATE_MODULE_FAILURE: '@MODULES/UPDATE_FAILURE',

	DELETE_MODULE_REQUEST: '@MODULES/DELETE_REQUEST',
	DELETE_MODULE_SUCCESS: '@MODULES/DELETE_SUCCESS',
	DELETE_MODULE_FAILURE: '@MODULES/DELETE_FAILURE',

	CLEAR_MODULE_LIST: '@MODULES/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// //////////// Specific module fetching actions ////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchModuleRequest
 * @description Action triggered anytime a module fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchModuleRequest = () => ({ type: ActionTypes.FETCH_MODULE_REQUEST });

/**
 * @function
 * @name fetchModuleSuccess
 * @description Action triggered as a result to a successful module fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} module : The module retrieved from the API.
 *
 * @returns {object}
 */
const fetchModuleSuccess = ({ module }) => ({
	type: ActionTypes.FETCH_MODULE_SUCCESS,
	payload: { module },
});

/**
 * @function
 * @name fetchModuleFailure
 * @description Action triggered as a result to a failed module fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchModuleFailure = (error) => ({
	type: ActionTypes.FETCH_MODULE_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchModule
 * @description Method used to fetch the latest version of a specified module
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId : The id of the module we want to retrieve.
 */
export const fetchModule = (moduleId) => (dispatch) => {
	dispatch(fetchModuleRequest());

	return ModulesApi.fetchModuleById(moduleId)
		.then(({ module }) => dispatch(fetchModuleSuccess({ module })))
		.catch((error) => dispatch(fetchModuleFailure(error)));
};
