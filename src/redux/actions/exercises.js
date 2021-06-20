import * as ExercisesApi from 'api/exercisesApi';
import i18next from 'i18next';
import { redirectOnSuccess } from 'lib/shared/redirectionHelper';
import { generatePath } from 'react-router';
import { toast } from 'react-toastify';
import routes from 'routes';
import { fetchConcept } from './concepts';
import { fetchLesson } from './lessons';
import { createQuestion } from './questions';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the exercises redux state.
 * @type {object}
 *
 * @author Christopher Walker
 */
export const ActionTypes = {
	FETCH_EXERCISE_REQUEST: '@EXERCISES/FETCH_REQUEST',
	FETCH_EXERCISE_SUCCESS: '@EXERCISES/FETCH_SUCCESS',
	FETCH_EXERCISE_FAILURE: '@EXERCISES/FETCH_FAILURE',

	CREATE_EXERCISE_REQUEST: '@EXERCISES/CREATE_REQUEST',
	CREATE_EXERCISE_SUCCESS: '@EXERCISES/CREATE_SUCCESS',
	CREATE_EXERCISE_FAILURE: '@EXERCISES/CREATE_FAILURE',

	UPDATE_EXERCISE_REQUEST: '@EXERCISES/UPDATE_REQUEST',
	UPDATE_EXERCISE_SUCCESS: '@EXERCISES/UPDATE_SUCCESS',
	UPDATE_EXERCISE_FAILURE: '@EXERCISES/UPDATE_FAILURE',

	DELETE_EXERCISE_REQUEST: '@EXERCISES/DELETE_REQUEST',
	DELETE_EXERCISE_SUCCESS: '@EXERCISES/DELETE_SUCCESS',
	DELETE_EXERCISE_FAILURE: '@EXERCISES/DELETE_FAILURE',

	CLEAR_EXERCISE_LIST: '@EXERCISES/CLEAR_LIST',
};

// //////////////////////////////////////////////////////// //
// //////////// Specific exercise fetching actions ////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchExerciseRequest
 * @description Action triggered anytime a exercise fetching call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const fetchExerciseRequest = () => ({ type: ActionTypes.FETCH_EXERCISE_REQUEST });

/**
  * @function
  * @name fetchExerciseSuccess
  * @description Action triggered as a result to a successful exercise fetching API call.
  *
  * @author Christopher Walker
  *
  * @param {object} exercise : The exercise retrieved from the API.
  *
  * @returns {object}
  */
const fetchExerciseSuccess = ({ exercise }) => ({
	type: ActionTypes.FETCH_EXERCISE_SUCCESS,
	payload: { exercise },
});

/**
 * @function
 * @name fetchExerciseFailure
 * @description Action triggered as a result to a failed exercise fetching API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchExerciseFailure = (error) => ({
	type: ActionTypes.FETCH_EXERCISE_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Exercise creation actions /////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name createExerciseRequest
 * @description Action triggered anytime a exercise creation call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const createExerciseRequest = () => ({ type: ActionTypes.CREATE_EXERCISE_REQUEST });

/**
 * @function
 * @name createExerciseSuccess
 * @description Action triggered as a result to a successfult exercise creation API call.
 *
 * @author Christopher Walker
 *
 * @param {object} exercise : The newly created exercise.
 *
 * @returns {object}
 */
const createExerciseSuccess = ({ exercise }) => ({
	type: ActionTypes.CREATE_EXERCISE_SUCCESS,
	payload: { exercise },
});

/**
 * @function
 * @name createExerciseFailure
 * @description Action triggered as a result to a failed exercise creation API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const createExerciseFailure = (error) => ({
	type: ActionTypes.CREATE_EXERCISE_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Exercise edition actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateExerciseRequest
 * @description Action triggered anytime a exercise edition call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const updateExerciseRequest = () => ({ type: ActionTypes.UPDATE_EXERCISE_REQUEST });

/**
 * @function
 * @name updateExerciseSuccess
 * @description Action triggered as a result to a successful exercise edition API call.
 *
 * @author Christopher Walker
 *
 * @param {object} exercise : The updated exercise object.
 *
 * @returns {object}
 */
const updateExerciseSuccess = ({ exercise }) => ({
	type: ActionTypes.UPDATE_EXERCISE_SUCCESS,
	payload: { exercise },
});

/**
 * @function
 * @name updateExerciseFailure
 * @description Action triggered as a result to a failed exercise edition API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const updateExerciseFailure = (error) => ({
	type: ActionTypes.UPDATE_EXERCISE_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// //////////////// Exercise deletion actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name deleteExerciseRequest
 * @description Action triggered anytime a exercise deletion call is made to the API.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const deleteExerciseRequest = () => ({ type: ActionTypes.DELETE_EXERCISE_REQUEST });

/**
 * @function
 * @name deleteExerciseSuccess
 * @description Action triggered as a result to a successful exercise deletion API call.
 *
 * @author Christopher Walker
 *
 * @param {object} exercise : The deleted exercise object.
 *
 * @returns {object}
 */
const deleteExerciseSuccess = ({ exercise }) => ({
	type: ActionTypes.DELETE_EXERCISE_SUCCESS,
	payload: { exercise },
});

/**
 * @function
 * @name deleteExerciseFailure
 * @description Action triggered as a result to a failed exercise deletion API call.
 *
 * @author Christopher Walker
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const deleteExerciseFailure = (error) => ({
	type: ActionTypes.DELETE_EXERCISE_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// ///////////// Exercise list clearing actions ///////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name clearExerciseListAction
 * @description Action triggered anytime the exercise list is not needed anymore.
 *
 * @author Christopher Walker
 *
 * @returns {object}
 */
const clearExerciseListAction = () => ({ type: ActionTypes.CLEAR_EXERCISE_LIST });

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchExercise
 * @description Method used to fetch the latest version of a specified exercise.
 *
 * @author Christopher Walker
 *
 * @param {string} exerciseId : The id of the exercise we want to retrieve.
 */
export const fetchExercise = (exerciseId) => (dispatch) => {
	dispatch(fetchExerciseRequest());

	return ExercisesApi.fetchExerciseById(exerciseId)
		.then((exercise) => dispatch(fetchExerciseSuccess({ exercise })))
		.catch((error) => dispatch(fetchExerciseFailure(error)));
};

/**
 * @function
 * @name createExercise
 * @description Method used to create a new exercise in the database.
 *
 * @author Christopher Walker
 *
 * @param {object} exerciseData : The data to create the new exercise from.
 */
export const createExercise = (exerciseData) => (dispatch) => {
	dispatch(createExerciseRequest());

	return ExercisesApi.createExercise(exerciseData)
		.then((exercise) => {
			dispatch(createQuestion({ ...exerciseData.question, exerciseId: exercise.id }));
			dispatch(createExerciseSuccess({ exercise }));
			redirectOnSuccess(generatePath(routes.lessons.lessonEdition, { lessonId: exercise.lessonId }));
		})
		.catch((error) => dispatch(createExerciseFailure(error)));
};

/**
 * @function
 * @name updateExercise
 * @description Method used to update an existing exercise instance from the database.
 *
 * @author Christopher Walker
 *
 * @param {object} exerciseData	: The data to update the exercise with.
 * @param {string} exerciseId		: The id to identify the exercise to update.
 */
export const updateExercise = (exerciseData, exerciseId) => (dispatch) => {
	dispatch(updateExerciseRequest());

	return ExercisesApi.updateExercise(exerciseData, exerciseId)
		.then((exercise) => dispatch(updateExerciseSuccess({ exercise })))
		.catch((error) => dispatch(updateExerciseFailure(error)));
};

/**
 * @function
 * @name deleteExercise
 * @description Method used to remove an existing exercise from the database.
 *
 * @author Christopher Walker
 *
 * @param {string} exerciseId : The id identifying the exercise to remove.
 */
export const deleteExercise = (exerciseId) => (dispatch) => {
	dispatch(deleteExerciseRequest());

	return ExercisesApi.deleteExercise(exerciseId)
		.then((exercise) => {
			dispatch(deleteExerciseSuccess({ exercise }));
			toast.success(i18next.t('exercises.deletion.toasts.success'));
			if (exercise.lessonId !== undefined && exercise.lessonId !== null) {
				dispatch(fetchLesson(exercise.lessonId));
			} else if (exercise.conceptId !== undefined && exercise.conceptId !== null) {
				dispatch(fetchConcept(exercise.conceptId));
			}
		})
		.catch((error) => dispatch(deleteExerciseFailure(error)));
};

/**
 * @function
 * @name clearExerciseList
 * @description Method used to clear the exercise list stored in memory when the application does not need it anymore.
 *
 * @author Christopher Walker
 *
 * @returns {Promise.resolve}
 */
export const clearExerciseList = () => (dispatch) => {
	dispatch(clearExerciseListAction());

	return Promise.resolve();
};
