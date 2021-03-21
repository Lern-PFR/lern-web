import { get } from 'lib/shared/http';

/**
 * @function
 * @name fetchUserById
 * @description Retrieves an existing user from the API, using the userId in parameters.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} userId : The id of the user we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchUserById = (userId) => get(`/api/users/${userId}`);
