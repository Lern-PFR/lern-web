import { get } from 'lib/shared/http';

/**
 * @function
 * @name fetchSubjectById
 * @description Retrieves an existing subject from the API, using the subjectId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} subjectId : The id of the subject we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchSubjectById = (subjectId) => get(`/api/subjects/${subjectId}`);
