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
// ////////////// Module list fetching actions //////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchModuleListRequest
 * @description Action triggered anytime a module list fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchModuleListRequest = () => ({ type: ActionTypes.FETCH_MODULE_LIST_REQUEST });

/**
 * @function
 * @name fetchModuleListSuccess
 * @description Action triggered as a result to a successful module list fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	modules		: The list of modules retrieved from the API.
 * @param {number}	totalCount	: The total amount of modules available for the subject.
 *
 * @returns {object}
 */
const fetchModuleListSuccess = ({ modules, totalCount }) => ({
	type: ActionTypes.FETCH_MODULE_LIST_SUCCESS,
	payload: { modules, totalCount },
});

/**
 * @function
 * @name fetchModuleListFailure
 * @description Action triggered as a result to a failed module list fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchModuleListFailure = (error) => ({
	type: ActionTypes.FETCH_MODULE_LIST_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Module creation actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name createModuleRequest
 * @description Action triggered anytime a module creation call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const createModuleRequest = () => ({ type: ActionTypes.CREATE_MODULE_REQUEST });

/**
 * @function
 * @name createModuleSuccess
 * @description Action triggered as a result to a successfult module creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} module : The newly created module.
 *
 * @returns {object}
 */
const createModuleSuccess = ({ module }) => ({
	type: ActionTypes.CREATE_MODULE_SUCCESS,
	payload: { module },
});

/**
 * @function
 * @name createModuleFailure
 * @description Action triggered as a result to a failed module creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const createModuleFailure = (error) => ({
	type: ActionTypes.CREATE_MODULE_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Module edition actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateModuleRequest
 * @description Action triggered anytime a module edition call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const updateModuleRequest = () => ({ type: ActionTypes.UPDATE_MODULE_REQUEST });

/**
 * @function
 * @name updateModuleSuccess
 * @description Action triggered as a result to a successful module edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} module : The updated module object.
 *
 * @returns {object}
 */
const updateModuleSuccess = ({ module }) => ({
	type: ActionTypes.UPDATE_MODULE_SUCCESS,
	payload: { module },
});

/**
 * @function
 * @name updateModuleFailure
 * @description Action triggered as a result to a failed module edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const updateModuleFailure = (error) => ({
	type: ActionTypes.UPDATE_MODULE_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Module deletion actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name deleteModuleRequest
 * @description Action triggered anytime a module deletion call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const deleteModuleRequest = () => ({ type: ActionTypes.DELETE_MODULE_REQUEST });

/**
 * @function
 * @name deleteModuleSuccess
 * @description Action triggered as a result to a successful module deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} module : The deleted module object.
 *
 * @returns {object}
 */
const deleteModuleSuccess = ({ module }) => ({
	type: ActionTypes.DELETE_MODULE_SUCCESS,
	payload: { module },
});

/**
 * @function
 * @name deleteModuleFailure
 * @description Action triggered as a result to a failed module deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const deleteModuleFailure = (error) => ({
	type: ActionTypes.DELETE_MODULE_FAILURE,
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

/**
 * @function
 * @name fetchModuleListBySubjectId
 * @description Method used to fetch all modules from a specific subject, identified by the subjectId param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} subjectId : The id of the subject we want to retrieve modules from.
 */
export const fetchModuleListBySubjectId = (subjectId) => (dispatch) => {
	dispatch(fetchModuleListRequest());

	return ModulesApi.fetchModulesBySubjectId(subjectId)
		.then(({ modules, totalCount }) => dispatch(fetchModuleListSuccess({ modules, totalCount })))
		.catch((error) => dispatch(fetchModuleListFailure(error)));
};

/**
 * @function
 * @name createModule
 * @description Method used to create a new module in the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} moduleData : The data to create the new module from.
 */
export const createModule = (moduleData) => (dispatch) => {
	dispatch(createModuleRequest());

	return ModulesApi.createModule(moduleData)
		.then(({ module }) => dispatch(createModuleSuccess({ module })))
		.catch((error) => dispatch(createModuleFailure(error)));
};

/**
 * @function
 * @name updateModule
 * @description Method used to update an existing module instance from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} moduleData	: The data to update the module with.
 * @param {string} moduleId		: The id to identify the module to update.
 */
export const updateModule = (moduleData, moduleId) => (dispatch) => {
	dispatch(updateModuleRequest());

	return ModulesApi.updateModule(moduleData, moduleId)
		.then(({ module }) => dispatch(updateModuleSuccess({ module })))
		.catch((error) => dispatch(updateModuleFailure(error)));
};

/**
 * @function
 * @name deleteModule
 * @description Method used to remove an existing module from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId : The id identifying the module to remove.
 */
export const deleteModule = (moduleId) => (dispatch) => {
	dispatch(deleteModuleRequest());

	return ModulesApi.deleteModule(moduleId)
		.then(({ module }) => dispatch(deleteModuleSuccess({ module })))
		.catch((error) => dispatch(deleteModuleFailure(error)));
};
