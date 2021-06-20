import { get, put } from 'lib/shared/http';

/**
 * @function
 * @name fetchProgressionBySubjectId
 * @description Retrieves the progression for a given subject for the current user.
 *
 * @author Christopher Walker
 *
 * @param {string} subjectId	The id of the subject we want to retrieve the progression for.
 *
 * @returns {Promise}
 */
export const fetchProgressionBySubjectId = (subjectId) => get(`/api/progression/${subjectId}`);

/**
 * @function
 * @name fetchProgression
 * @description Retrieves a list of the current user's progression states for active and completed subjects.
 *
 * @author Christopher Walker
 *
 * @returns {Promise}
 */
export const fetchProgression = () => get('/api/progression');

/**
 * @function
 * @name updateProgression
 * @description Sends a progression update for the current user to the API
 *
 * @author Christopher Walker
 *
 * @param {Object} param			The data to provide the API.
 * @param {string} param.subjectId	The last name of the user we want to create.
 * @param {string} param.conceptId	The nickname that the user will provide to signin.
 *
 * @returns {Promise}
 */
export const updateProgression = (params) => put('/api/progression', params);
