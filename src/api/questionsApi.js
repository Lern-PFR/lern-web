import { del, get, post, put } from 'lib/shared/http';

/**
 * @function
 * @name fetchQuestionById
 * @description Retrieves an existing question from the API, using the exerciseId parameter.
 *
 * @author Christopher Walker
 *
 * @param {string} questionId The id of the exercise we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchQuestionById = (questionId) => get(`/api/questions/${questionId}`);

/**
 * @function
 * @name fetchQuestionByExerciseId
 * @description Retrieves all questions from a specific lesson using their linked lesson's id.
 *
 * @author Christopher Walker
 *
 * @param {string} exerciseId The id of the lesson we want to retrieve exercises from.
 *
 * @returns {Promise}
 */
export const fetchQuestionByExerciseId = (exerciseId) => get(`/api/questions/by-exercise/${exerciseId}`);

/**
 * @function
 * @name createQuestion
 * @description Creates a new question in the database.
 *
 * @author Christopher Walker
 *
 * @param {object} questionData The data to create the new exercise from.
 *
 * @returns {Promise}
 */
export const createQuestion = (questionData) => post('/api/questions', questionData);

/**
 * @function
 * @name updateQuestion
 * @description Updates an existing question from the database.
 *
 * @author Christopher Walker
 *
 * @param {object} questionData		The data to update the exercise with.
 * @param {string} questionId		The id identifying the exercise to update.
 *
 * @returns {Promise}
 */
export const updateQuestion = (questionData, questionId) => put(`/api/questions/${questionId}`, questionData);

/**
 * @function
 * @name deleteQuestion
 * @description Removes an existing question from the database.
 *
 * @author Christopher Walker
 *
 * @param {string} questionId The id identifying the exercise to remove.
 *
 * @returns {Promise}
 */
export const deleteQuestion = (questionId) => del(`/api/questions/${questionId}`);
