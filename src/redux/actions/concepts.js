import * as ConceptsApi from 'api/conceptsApi';
import i18next from 'i18next';
import { toast } from 'react-toastify';
import { fetchSubject } from './subjects';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the concepts redux state.
 * @type {object}
 *
 * @author Timothée Simon-Franza
 */
export const ActionTypes = {
	FETCH_CONCEPT_REQUEST: '@CONCEPTS/FETCH_REQUEST',
	FETCH_CONCEPT_SUCCESS: '@CONCEPTS/FETCH_SUCCESS',
	FETCH_CONCEPT_FAILURE: '@CONCEPTS/FETCH_FAILURE',

	FETCH_CONCEPT_LIST_REQUEST: '@CONCEPTS/FETCH_LIST_REQUEST',
	FETCH_CONCEPT_LIST_SUCCESS: '@CONCEPTS/FETCH_LIST_SUCCESS',
	FETCH_CONCEPT_LIST_FAILURE: '@CONCEPTS/FETCH_LIST_FAILURE',

	CREATE_CONCEPT_REQUEST: '@CONCEPTS/CREATE_REQUEST',
	CREATE_CONCEPT_SUCCESS: '@CONCEPTS/CREATE_SUCCESS',
	CREATE_CONCEPT_FAILURE: '@CONCEPTS/CREATE_FAILURE',

	UPDATE_CONCEPT_REQUEST: '@CONCEPTS/UPDATE_REQUEST',
	UPDATE_CONCEPT_SUCCESS: '@CONCEPTS/UPDATE_SUCCESS',
	UPDATE_CONCEPT_FAILURE: '@CONCEPTS/UPDATE_FAILURE',

	DELETE_CONCEPT_REQUEST: '@CONCEPTS/DELETE_REQUEST',
	DELETE_CONCEPT_SUCCESS: '@CONCEPTS/DELETE_SUCCESS',
	DELETE_CONCEPT_FAILURE: '@CONCEPTS/DELETE_FAILURE',

	CLEAR_CONCEPT_LIST: '@CONCEPTS/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// //////////// Specific concept fetching actions ///////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchConceptRequest
 * @description Action triggered anytime a concept fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchConceptRequest = () => ({ type: ActionTypes.FETCH_CONCEPT_REQUEST });

/**
 * @function
 * @name fetchConceptSuccess
 * @description Action triggered as a result to a successful concept fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} concept The concept retrieved from the API.
 *
 * @returns {object}
 */
const fetchConceptSuccess = ({ concept }) => ({
	type: ActionTypes.FETCH_CONCEPT_SUCCESS,
	payload: { concept },
});

/**
 * @function
 * @name fetchConceptFailure
 * @description Action triggered as a result to a failed concept fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchConceptFailure = (error) => ({
	type: ActionTypes.FETCH_CONCEPT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// ///////////// Concept list fetching actions //////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchConceptListRequest
 * @description Action triggered anytime a concept list fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchConceptListRequest = () => ({ type: ActionTypes.FETCH_CONCEPT_LIST_REQUEST });

/**
 * @function
 * @name fetchConceptListSuccess
 * @description Action triggered as a result to a successful concept list fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	concepts	The list of concepts retrieved from the API.
 * @param {number}	totalCount	The total amount of concepts available for the module.
 *
 * @returns {object}
 */
const fetchConceptListSuccess = ({ concepts, totalCount }) => ({
	type: ActionTypes.FETCH_CONCEPT_LIST_SUCCESS,
	payload: { concepts, totalCount },
});

/**
 * @function
 * @name fetchConceptListFailure
 * @description Action triggered as a result to a failed concept list fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchConceptListFailure = (error) => ({
	type: ActionTypes.FETCH_CONCEPT_LIST_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////// Concept creation actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name createConceptRequest
 * @description Action triggered anytime a concept creation call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const createConceptRequest = () => ({ type: ActionTypes.CREATE_CONCEPT_REQUEST });

/**
 * @function
 * @name createConceptSuccess
 * @description Action triggered as a result to a successfult concept creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} concept The newly created concept.
 *
 * @returns {object}
 */
const createConceptSuccess = ({ concept }) => ({
	type: ActionTypes.CREATE_CONCEPT_SUCCESS,
	payload: { concept },
});

/**
 * @function
 * @name createConceptFailure
 * @description Action triggered as a result to a failed concept creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error The exception sent back from the API.
 *
 * @returns {object}
 */
const createConceptFailure = (error) => ({
	type: ActionTypes.CREATE_CONCEPT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////// Concept edition actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateConceptRequest
 * @description Action triggered anytime a concept edition call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const updateConceptRequest = () => ({ type: ActionTypes.UPDATE_CONCEPT_REQUEST });

/**
 * @function
 * @name updateConceptSuccess
 * @description Action triggered as a result to a successful concept edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} concept The updated concept object.
 *
 * @returns {object}
 */
const updateConceptSuccess = ({ concept }) => ({
	type: ActionTypes.UPDATE_CONCEPT_SUCCESS,
	payload: { concept },
});

/**
 * @function
 * @name updateConceptFailure
 * @description Action triggered as a result to a failed concept edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error The exception sent back from the API.
 *
 * @returns {object}
 */
const updateConceptFailure = (error) => ({
	type: ActionTypes.UPDATE_CONCEPT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////// Concept deletion actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name deleteConceptRequest
 * @description Action triggered anytime a concept deletion call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const deleteConceptRequest = () => ({ type: ActionTypes.DELETE_CONCEPT_REQUEST });

/**
 * @function
 * @name deleteConceptSuccess
 * @description Action triggered as a result to a successful concept deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} concept The deleted concept object.
 *
 * @returns {object}
 */
const deleteConceptSuccess = ({ concept }) => ({
	type: ActionTypes.DELETE_CONCEPT_SUCCESS,
	payload: { concept },
});

/**
 * @function
 * @name deleteConceptFailure
 * @description Action triggered as a result to a failed concept deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const deleteConceptFailure = (error) => ({
	type: ActionTypes.DELETE_CONCEPT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// ///////////// Concept list clearing actions //////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name clearConceptListAction
 * @description Action triggered anytime the concept list is not needed anymore.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const clearConceptListAction = () => ({ type: ActionTypes.CLEAR_CONCEPT_LIST });

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchConcept
 * @description Method used to fetch the latest version of a specified concept.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} conceptId The id of the concept we want to retrieve.
 */
export const fetchConcept = (conceptId) => (dispatch) => {
	dispatch(fetchConceptRequest());

	return ConceptsApi.fetchConceptById(conceptId)
		.then((concept) => dispatch(fetchConceptSuccess({ concept })))
		.catch((error) => dispatch(fetchConceptFailure(error)));
};

/**
 * @function
 * @name fetchConceptListByModuleId
 * @description Method used to fetch all concepts from a specific module, identified by the moduleId param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId The id of the module we want to retrieve concepts from.
 */
export const fetchConceptListByModuleId = (moduleId) => (dispatch) => {
	dispatch(fetchConceptListRequest());

	return ConceptsApi.fetchConceptsByModuleId(moduleId)
		.then(({ concepts, totalCount }) => dispatch(fetchConceptListSuccess({ concepts, totalCount })))
		.catch((error) => dispatch(fetchConceptListFailure(error)));
};

/**
 * @function
 * @name createConcept
 * @description Method used to create a new concept in the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} conceptData The data to create the new concept from.
 */
export const createConcept = (conceptData) => (dispatch) => {
	dispatch(createConceptRequest());

	return ConceptsApi.createConcept(conceptData)
		.then(({ concept }) => dispatch(createConceptSuccess({ concept })))
		.catch((error) => dispatch(createConceptFailure(error)));
};

/**
 * @function
 * @name updateConcept
 * @description Method used to update an existing concept instance from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} conceptData	The data to update the concept with.
 * @param {string} conceptId	The id to identify the concept to update.
 */
export const updateConcept = (conceptData, conceptId) => (dispatch) => {
	dispatch(updateConceptRequest());

	return ConceptsApi.updateConcept(conceptData, conceptId)
		.then(({ concept }) => dispatch(updateConceptSuccess({ concept })))
		.catch((error) => dispatch(updateConceptFailure(error)));
};

/**
 * @function
 * @name deleteConcept
 * @description Method used to remove an existing concept from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} conceptId	The id identifying the concept to remove.
 * @param {string} subjectId	The id identifying the concept's parent subject.
 */
export const deleteConcept = (conceptId, subjectId) => (dispatch) => {
	dispatch(deleteConceptRequest());

	return ConceptsApi.deleteConcept(conceptId)
		.then((concept) => {
			dispatch(deleteConceptSuccess({ concept }));
			toast.success(i18next.t('concepts.deletion.toasts.success', { name: concept.title }));
			dispatch(fetchSubject(subjectId));
		})
		.catch((error) => dispatch(deleteConceptFailure(error)));
};

/**
 * @function
 * @name clearConceptList
 * @description Method used to clear the concept list stored in memory when the application does not need it anymore.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Promise.resolve}
 */
export const clearConceptList = () => (dispatch) => {
	dispatch(clearConceptListAction());

	return Promise.resolve();
};
