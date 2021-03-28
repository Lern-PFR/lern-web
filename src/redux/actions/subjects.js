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
		.then(({ subject }) => dispatch(fetchSubjectSuccess({ subject })))
		.catch((error) => dispatch(fetchSubjectFailure(error)));
};
