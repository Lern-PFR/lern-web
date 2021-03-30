import { get } from 'lib/shared/http';

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
