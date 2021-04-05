import { get } from 'lib/shared/http';

/**
 * @function
 * @name fetchNotionById
 * @description Retrieves an existing notion from the API, using the notionId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} notionId : The id of the notion we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchNotionById = (notionId) => get(`/api/notions/${notionId}`);

/**
 * @function
 * @name fetchNotionsByModuleId
 * @description Retrieves all notions from a specific module using their linked module's id.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId : The id of the module we want to retrieve notions from.
 *
 * @returns {Promise}
 */
export const fetchNotionsByModuleId = (moduleId) => get(`/api/notions/by-module/${moduleId}`);
