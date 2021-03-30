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
