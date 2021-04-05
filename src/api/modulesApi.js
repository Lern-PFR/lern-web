import { del, get, post, put } from 'lib/shared/http';

/**
 * @function
 * @name fetchModuleById
 * @description Retrieves an existing module from the API, using the moduleId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId : The id of the module we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchModuleById = (moduleId) => get(`/api/modules/${moduleId}`);

/**
 * @function
 * @name fetchModulesBySubjectId
 * @description Retrieves all modules from a specific subject using their linked subject's id.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} subjectId : The id of the subject we want to retrieve modules from.
 *
 * @returns {Promise}
 */
export const fetchModulesBySubjectId = (subjectId) => get(`/api/modules/by-subject/${subjectId}`);

/**
 * @function
 * @name createModule
 * @description Creates a new module in the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} moduleData : The data to create the new module from.
 *
 * @returns {Promise}
 */
export const createModule = (moduleData) => post('/api/modules', moduleData);

/**
 * @function
 * @name updateModule
 * @description Updates an existing module from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} moduleData	: The data to update the module with.
 * @param {string} moduleId		: The id identifying the module to update.
 *
 * @returns {Promise}
 */
export const updateModule = (moduleData, moduleId) => put(`/api/modules/${moduleId}`, moduleData);

/**
 * @function
 * @name deleteModule
 * @description Removes an existing module from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId : The id identifying the module to remove.
 *
 * @returns {Promise}
 */
export const deleteModule = (moduleId) => del(`/api/modules/${moduleId}`);
