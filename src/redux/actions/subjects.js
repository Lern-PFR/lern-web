import * as SubjectsApi from 'api/subjectsApi';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the subjects redux state.
 * @type {object}
 *
 * @author Timothée Simon-Franza
 */
export const ActionTypes = {
	FETCH_SUBJECT_REQUEST: '@SUBJECTS/FETCH_REQUEST',
	FETCH_SUBJECT_SUCCESS: '@SUBJECTS/FETCH_SUCCESS',
	FETCH_SUBJECT_FAILURE: '@SUBJECTS/FETCH_FAILURE',

	FETCH_SUBJECT_LIST_REQUEST: '@SUBJECTS/FETCH_LIST_REQUEST',
	FETCH_SUBJECT_LIST_SUCCESS: '@SUBJECTS/FETCH_LIST_SUCCESS',
	FETCH_SUBJECT_LIST_FAILURE: '@SUBJECTS/FETCH_LIST_FAILURE',

	CREATE_SUBJECT_REQUEST: '@SUBJECTS/CREATE_REQUEST',
	CREATE_SUBJECT_SUCCESS: '@SUBJECTS/CREATE_SUCCESS',
	CREATE_SUBJECT_FAILURE: '@SUBJECTS/CREATE_FAILURE',

	UPDATE_SUBJECT_REQUEST: '@SUBJECTS/UPDATE_REQUEST',
	UPDATE_SUBJECT_SUCCESS: '@SUBJECTS/UPDATE_SUCCESS',
	UPDATE_SUBJECT_FAILURE: '@SUBJECTS/UPDATE_FAILURE',

	DELETE_SUBJECT_REQUEST: '@SUBJECTS/DELETE_REQUEST',
	DELETE_SUBJECT_SUCCESS: '@SUBJECTS/DELETE_SUCCESS',
	DELETE_SUBJECT_FAILURE: '@SUBJECTS/DELETE_FAILURE',

	CLEAR_SUBJECT_LIST: '@SUBJECTS/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// /////////// Specific subject fetching actions ////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchSubjectRequest
 * @description Action triggered anytime a subject fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchSubjectRequest = () => ({ type: ActionTypes.FETCH_SUBJECT_REQUEST });

/**
 * @function
 * @name fetchSubjectSuccess
 * @description Action triggered as a result to a successful subject fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subject : The subject retrieved from the API.
 *
 * @returns {object}
 */
const fetchSubjectSuccess = ({ subject }) => ({
	type: ActionTypes.FETCH_SUBJECT_SUCCESS,
	payload: { subject },
});

/**
 * @function
 * @name fetchSubjectFailure
 * @description Action triggered as a result to a failed subject fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchSubjectFailure = (error) => ({
	type: ActionTypes.FETCH_SUBJECT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// ///////////// Subject list fetching actions //////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchSubjectListRequest
 * @description Action triggered anytime a subject list fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchSubjectListRequest = () => ({ type: ActionTypes.FETCH_SUBJECT_LIST_REQUEST });

/**
 * @function
 * @name fetchSubjectListSuccess
 * @description Action triggered as a result to a successful subject list fetching API call.
 *
 * @author Timothée SimonFranza
 *
 * @param {array}	subjects	: The list of subjects retrieved from the API.
 * @param {number}	totalCount	: The total amount of subjects available in the database to the current user.
 *
 * @returns {object}
 */
const fetchSubjectListSuccess = ({ subjects, totalCount }) => ({
	type: ActionTypes.FETCH_SUBJECT_LIST_SUCCESS,
	payload: { subjects, totalCount },
});

/**
 * @function
 * @name fetchSubjectListFailure
 * @description Action triggered as a result to a failed subject list fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {objcet} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchSubjectListFailure = (error) => ({
	type: ActionTypes.FETCH_SUBJECT_LIST_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////// Subject creation actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name createSubjectRequest
 * @description Action triggered anytime a subject creation call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const createSubjectRequest = () => ({ type: ActionTypes.CREATE_SUBJECT_REQUEST });

/**
 * @function
 * @name createSubjectSuccess
 * @description Action triggered as a result to a successfult subject creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subject : The newly created subject.
 *
 * @returns {object}
 */
const createSubjectSuccess = ({ subject }) => ({
	type: ActionTypes.CREATE_SUBJECT_SUCCESS,
	payload: { subject },
});

/**
 * @function
 * @name createSubjectFailure
 * @description Action triggered as a result to a failed subject creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const createSubjectFailure = (error) => ({
	type: ActionTypes.CREATE_SUBJECT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Subject edition actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateSubjectRequest
 * @description Action triggered anytime a subject edition call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const updateSubjectRequest = () => ({ type: ActionTypes.UPDATE_SUBJECT_REQUEST });

/**
 * @function
 * @name updateSubjectSuccess
 * @description Action triggered as a result to a successful subject edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subject : The updated subject object.
 *
 * @returns {object}
 */
const updateSubjectSuccess = ({ subject }) => ({
	type: ActionTypes.UPDATE_SUBJECT_SUCCESS,
	payload: { subject },
});

/**
 * @function
 * @name updateSubjectFailure
 * @description Action triggered as a result to a failed subject edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const updateSubjectFailure = (error) => ({
	type: ActionTypes.UPDATE_SUBJECT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////// Subject deletion actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name deleteSubjectRequest
 * @description Action triggered anytime a subject deletion call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const deleteSubjectRequest = () => ({ type: ActionTypes.DELETE_SUBJECT_REQUEST });

/**
 * @function
 * @name deleteSubjectSuccess
 * @description Action triggered as a result to a successful subject deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subject : The deleted subject object.
 *
 * @returns {object}
 */
const deleteSubjectSuccess = ({ subject }) => ({
	type: ActionTypes.DELETE_SUBJECT_SUCCESS,
	payload: { subject },
});

/**
 * @function
 * @name deleteSubjectFailure
 * @description Action triggered as a result to a failed subject deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const deleteSubjectFailure = (error) => ({
	type: ActionTypes.DELETE_SUBJECT_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////// Subject list clearing actions ///////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name clearSubjectListAction
 * @description Action triggered anytime the subject list is not needed anymore.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const clearSubjectListAction = () => ({ type: ActionTypes.CLEAR_SUBJECT_LIST });

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchSubject
 * @description Method used to fetch the latest version of a specific subject
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} subjectId : The id of the subject we want to retrieve.
 */
export const fetchSubject = (subjectId) => (dispatch) => {
	dispatch(fetchSubjectRequest());

	return SubjectsApi.fetchSubjectById(subjectId)
		.then((subject) => dispatch(fetchSubjectSuccess({ subject })))
		.catch((error) => dispatch(fetchSubjectFailure(error)));
};

/**
 * @function
 * @name fetchSubjectList
 * @description Method used to fetch all subjects available to the current user.
 *
 * @author Timothée Simon-Franza
 */
export const fetchSubjectList = () => (dispatch) => {
	dispatch(fetchSubjectListRequest());

	return SubjectsApi.fetchSubjects()
		.then((subjects) => dispatch(fetchSubjectListSuccess({
			subjects,
			totalCount: subjects.length,
		})))
		.catch((error) => dispatch(fetchSubjectListFailure(error)));
};

/**
 * @function
 * @name createSubject
 * @description Method used to create a new subject in the database
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subjectData : The data to create the new subject from.
 */
export const createSubject = (subjectData) => (dispatch) => {
	dispatch(createSubjectRequest());

	return SubjectsApi.createSubject(subjectData)
		.then(({ subject }) => dispatch(createSubjectSuccess({ subject })))
		.catch((error) => dispatch(createSubjectFailure(error)));
};

/**
 * @function
 * @name updateSubject
 * @description Method used to update an existing subject instance from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subjectData	: The data to update the subject with.
 * @param {string} subjectId	: The id to identify the subject to update.
 */
export const updateSubject = (subjectData, subjectId) => (dispatch) => {
	dispatch(updateSubjectRequest());

	return SubjectsApi.updateSubject(subjectData, subjectId)
		.then(({ subject }) => dispatch(updateSubjectSuccess({ subject })))
		.catch((error) => dispatch(updateSubjectFailure(error)));
};

/**
 * @function
 * @name deleteSubject
 * @description Method used to remove an existing subject from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} subjectId : The id identifying the subject to remove.
 */
export const deleteSubject = (subjectId) => (dispatch) => {
	dispatch(deleteSubjectRequest());

	return SubjectsApi.deleteSubject(subjectId)
		.then(({ subject }) => dispatch(deleteSubjectSuccess({ subject })))
		.catch((error) => dispatch(deleteSubjectFailure(error)));
};

/**
 * @function
 * @name clearSubjectList
 * @description Method used to clear the subject list stored in memory when the application does not need it anymore.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Promise.resolve}
 */
export const clearSubjectList = () => (dispatch) => {
	dispatch(clearSubjectListAction());

	return Promise.resolve();
};
