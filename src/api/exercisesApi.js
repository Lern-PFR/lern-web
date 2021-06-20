import { del, get, post, put } from 'lib/shared/http';

/**
 * @function
 * @name fetchExerciseById
 * @description Retrieves an existing exercise from the API, using the exerciseId parameter.
 *
 * @author Christopher Walker
 *
 * @param {string} exerciseId The id of the exercise we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchExerciseById = (exerciseId) => get(`/api/exercises/${exerciseId}`);

/**
 * @function
 * @name fetchExercisesByLessonId
 * @description Retrieves all exercises from a specific lesson using their linked lesson's id.
 *
 * @author Christopher Walker
 *
 * @param {string} lessonId The id of the lesson we want to retrieve exercises from.
 *
 * @returns {Promise}
 */
export const fetchExercisesByLessonId = (lessonId) => get(`/api/exercises/by-lesson/${lessonId}`);

/**
 * @function
 * @name createExercise
 * @description Creates a new exercise in the database.
 *
 * @author Christopher Walker
 *
 * @param {object} exerciseData The data to create the new exercise from.
 *
 * @returns {Promise}
 */
export const createExercise = (exerciseData) => post('/api/exercises', exerciseData);

/**
 * @function
 * @name updateExercise
 * @description Updates an existing exercise from the database.
 *
 * @author Christopher Walker
 *
 * @param {object} exerciseData	The data to update the exercise with.
 * @param {string} exerciseId		The id identifying the exercise to update.
 *
 * @returns {Promise}
 */
export const updateExercise = (exerciseData, exerciseId) => put(`/api/exercises/${exerciseId}`, exerciseData);

/**
 * @function
 * @name deleteExercise
 * @description Removes an existing exercise from the database.
 *
 * @author Christopher Walker
 *
 * @param {string} exerciseId The id identifying the exercise to remove.
 *
 * @returns {Promise}
 */
export const deleteExercise = (exerciseId) => del(`/api/exercises/${exerciseId}`);
