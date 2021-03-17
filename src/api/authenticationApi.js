import { post } from 'lib/shared/http';

/**
 * @function
 * @name tryLogin
 * @description Tries to authenticate the current user, with the provided username and password.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} username
 * @param {string} password
 *
 * @returns {Promise | object}
 */
export const tryLogin = (username, password) => {
	const params = {
		username,
		password,
	};

	return post('/api/login', params);
};
