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
