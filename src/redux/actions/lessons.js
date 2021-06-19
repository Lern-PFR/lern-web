import * as LessonsApi from 'api/lessonsApi';
import i18next from 'i18next';
import { toast } from 'react-toastify';
import { fetchConcept } from './concepts';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the lessons redux state.
 * @type {object}
 *
 * @author Timothée Simon-Franza
 */
export const ActionTypes = {
	FETCH_LESSON_REQUEST: '@LESSONS/FETCH_REQUEST',
	FETCH_LESSON_SUCCESS: '@LESSONS/FETCH_SUCCESS',
	FETCH_LESSON_FAILURE: '@LESSONS/FETCH_FAILURE',

	CREATE_LESSON_REQUEST: '@LESSONS/CREATE_REQUEST',
	CREATE_LESSON_SUCCESS: '@LESSONS/CREATE_SUCCESS',
	CREATE_LESSON_FAILURE: '@LESSONS/CREATE_FAILURE',

	UPDATE_LESSON_REQUEST: '@LESSONS/UPDATE_REQUEST',
	UPDATE_LESSON_SUCCESS: '@LESSONS/UPDATE_SUCCESS',
	UPDATE_LESSON_FAILURE: '@LESSONS/UPDATE_FAILURE',

	DELETE_LESSON_REQUEST: '@LESSONS/DELETE_REQUEST',
	DELETE_LESSON_SUCCESS: '@LESSONS/DELETE_SUCCESS',
	DELETE_LESSON_FAILURE: '@LESSONS/DELETE_FAILURE',

	CLEAR_LESSON_LIST: '@LESSONS/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// //////////// Specific lesson fetching actions ////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchLessonRequest
 * @description Action triggered anytime a lesson fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchLessonRequest = () => ({ type: ActionTypes.FETCH_LESSON_REQUEST });

/**
  * @function
  * @name fetchLessonSuccess
  * @description Action triggered as a result to a successful lesson fetching API call.
  *
  * @author Timothée Simon-Franza
  *
  * @param {object} lesson : The lesson retrieved from the API.
  *
  * @returns {object}
  */
const fetchLessonSuccess = ({ lesson }) => ({
	type: ActionTypes.FETCH_LESSON_SUCCESS,
	payload: { lesson },
});

/**
 * @function
 * @name fetchLessonFailure
 * @description Action triggered as a result to a failed lesson fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchLessonFailure = (error) => ({
	type: ActionTypes.FETCH_LESSON_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Lesson creation actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name createLessonRequest
 * @description Action triggered anytime a lesson creation call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const createLessonRequest = () => ({ type: ActionTypes.CREATE_LESSON_REQUEST });

/**
 * @function
 * @name createLessonSuccess
 * @description Action triggered as a result to a successfult lesson creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} lesson : The newly created lesson.
 *
 * @returns {object}
 */
const createLessonSuccess = ({ lesson }) => ({
	type: ActionTypes.CREATE_LESSON_SUCCESS,
	payload: { lesson },
});

/**
 * @function
 * @name createLessonFailure
 * @description Action triggered as a result to a failed lesson creation API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const createLessonFailure = (error) => ({
	type: ActionTypes.CREATE_LESSON_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Lesson edition actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateLessonRequest
 * @description Action triggered anytime a lesson edition call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const updateLessonRequest = () => ({ type: ActionTypes.UPDATE_LESSON_REQUEST });

/**
 * @function
 * @name updateLessonSuccess
 * @description Action triggered as a result to a successful lesson edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} lesson : The updated lesson object.
 *
 * @returns {object}
 */
const updateLessonSuccess = ({ lesson }) => ({
	type: ActionTypes.UPDATE_LESSON_SUCCESS,
	payload: { lesson },
});

/**
 * @function
 * @name updateLessonFailure
 * @description Action triggered as a result to a failed lesson edition API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const updateLessonFailure = (error) => ({
	type: ActionTypes.UPDATE_LESSON_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Lesson deletion actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name deleteLessonRequest
 * @description Action triggered anytime a lesson deletion call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const deleteLessonRequest = () => ({ type: ActionTypes.DELETE_LESSON_REQUEST });

/**
 * @function
 * @name deleteLessonSuccess
 * @description Action triggered as a result to a successful lesson deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} lesson : The deleted lesson object.
 *
 * @returns {object}
 */
const deleteLessonSuccess = ({ lesson }) => ({
	type: ActionTypes.DELETE_LESSON_SUCCESS,
	payload: { lesson },
});

/**
 * @function
 * @name deleteLessonFailure
 * @description Action triggered as a result to a failed lesson deletion API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const deleteLessonFailure = (error) => ({
	type: ActionTypes.DELETE_LESSON_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// ///////////// Lesson list clearing actions ///////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name clearLessonListAction
 * @description Action triggered anytime the lesson list is not needed anymore.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const clearLessonListAction = () => ({ type: ActionTypes.CLEAR_LESSON_LIST });

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchLesson
 * @description Method used to fetch the latest version of a specified lesson.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} lessonId : The id of the lesson we want to retrieve.
 */
export const fetchLesson = (lessonId) => (dispatch) => {
	dispatch(fetchLessonRequest());

	return LessonsApi.fetchLessonById(lessonId)
		.then(({ lesson }) => dispatch(fetchLessonSuccess({ lesson })))
		.catch((error) => dispatch(fetchLessonFailure(error)));
};

/**
 * @function
 * @name createLesson
 * @description Method used to create a new lesson in the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} lessonData : The data to create the new lesson from.
 */
export const createLesson = (lessonData) => (dispatch) => {
	dispatch(createLessonRequest());

	return LessonsApi.createLesson(lessonData)
		.then(({ lesson }) => dispatch(createLessonSuccess({ lesson })))
		.catch((error) => dispatch(createLessonFailure(error)));
};

/**
 * @function
 * @name updateLesson
 * @description Method used to update an existing lesson instance from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} lessonData	: The data to update the lesson with.
 * @param {string} lessonId		: The id to identify the lesson to update.
 */
export const updateLesson = (lessonData, lessonId) => (dispatch) => {
	dispatch(updateLessonRequest());

	return LessonsApi.updateLesson(lessonData, lessonId)
		.then(({ lesson }) => dispatch(updateLessonSuccess({ lesson })))
		.catch((error) => dispatch(updateLessonFailure(error)));
};

/**
 * @function
 * @name deleteLesson
 * @description Method used to remove an existing lesson from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} lessonId : The id identifying the lesson to remove.
 */
export const deleteLesson = (lessonId) => (dispatch) => {
	dispatch(deleteLessonRequest());

	return LessonsApi.deleteLesson(lessonId)
		.then((lesson) => {
			dispatch(deleteLessonSuccess({ lesson }));
			toast.success(i18next.t('lessons.deletion.toasts.success', { name: lesson.title }));
			dispatch(fetchConcept(lesson.conceptId));
		})
		.catch((error) => dispatch(deleteLessonFailure(error)));
};

/**
 * @function
 * @name clearLessonList
 * @description Method used to clear the lesson list stored in memory when the application does not need it anymore.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Promise.resolve}
 */
export const clearLessonList = () => (dispatch) => {
	dispatch(clearLessonListAction());

	return Promise.resolve();
};
