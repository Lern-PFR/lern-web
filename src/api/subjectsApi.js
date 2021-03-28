import { del, get, post, put } from 'lib/shared/http';

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

/**
 * @function
 * @name fetchSubjects
 * @description Retrieves a list of subjects from the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Promise}
 */
export const fetchSubjects = () => get('/api/subjects');

/**
 * @function
 * @name createSubject
 * @description Creates a new subject in the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subjectData : The data to create the new subject from.
 *
 * @returns {Promise}
 */
export const createSubject = (subjectData) => post('/api/subjects', subjectData);

/**
 * @function
 * @name updateSubject
 * @description Updates an existing subject from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} subjectData	: The data to update the subject with.
 * @param {string} subjectId	: The id identifying the subject to update.
 *
 * @returns {Promise}
 */
export const updateSubject = (subjectData, subjectId) => put(`/api/subjects/${subjectId}`, subjectData);

/**
 * @function
 * @name deleteSubject
 * @description Removes an existing subject from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} subjectId : The id identifying the subject to remove.
 *
 * @returns {Promise}
 */
export const deleteSubject = (subjectId) => del(`/api/subjects/${subjectId}`);
