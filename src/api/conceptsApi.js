import { del, get, post, put } from 'lib/shared/http';

/**
 * @function
 * @name fetchConceptById
 * @description Retrieves an existing concept from the API, using the conceptId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} conceptId : The id of the concept we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchConceptById = (conceptId) => get(`/api/concepts/${conceptId}`);

/**
 * @function
 * @name fetchConceptsByModuleId
 * @description Retrieves all concepts from a specific module using their linked module's id.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} moduleId : The id of the module we want to retrieve concepts from.
 *
 * @returns {Promise}
 */
export const fetchConceptsByModuleId = (moduleId) => get(`/api/concepts/by-module/${moduleId}`);

/**
 * @function
 * @name createConcept
 * @description Creates a new concept in the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} conceptData : The data to create the new concept from.
 *
 * @returns {Promise}
 */
export const createConcept = (conceptData) => post('/api/concepts', conceptData);

/**
 * @function
 * @name updateConcept
 * @description Updates an existing concept from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} conceptData	: The data to update the concept with.
 * @param {string} conceptId	: The id identifying the concept to update.
 *
 * @returns {Promise}
 */
export const updateConcept = (conceptData, conceptId) => put(`/api/concepts/${conceptId}`, conceptData);

/**
 * @function
 * @name deleteConcept
 * @description Removes an existing concept from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} conceptId : The id identifying the concept to remove.
 *
 * @returns {Promise}
 */
export const deleteConcept = (conceptId) => del(`/api/concepts/${conceptId}`);
