import { get, post } from 'lib/shared/http';

/**
 * @function
 * @name answerQuestion
 * @description Sends the answer of the identified question to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array} answersArray	An array of answers to create.
 *
 * @returns {Promise}
 */
export const answerQuestion = (answersArray) => post('/api/results', answersArray);

/**
 * @function
 * @name getResultByQuestionId
 * @description Retrieves the registered answer to the question identified by the questionId param.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} questionId The id of the question we want the result of.
 *
 * @returns {Promise}
 */
export const getResultByQuestionId = (questionId) => get(`/api/results/question/${questionId}`);
