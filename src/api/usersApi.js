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

/**
 * @function
 * @name fetchUsers
 * @description Retrieves a list of users from the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {Promise}
 */
export const fetchUsers = () => get('/api/users');
