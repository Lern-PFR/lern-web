import { baseUrl, getHeaders, post } from 'lib/shared/http';

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
		login: username,
		password,
	};

	return post('/api/login', params);
};

/**
 * @function
 * @name checkTocken
 * @description Checks the current authentication token validity by issuing an empty request to the server
 *
 * @author Yann Hodiesne
 *
 * @returns {Promise}
 */
export const checkToken = () => fetch(`${baseUrl}/api/whoami`, { method: 'POST', headers: getHeaders() })
	.then((res) => {
		if (res.status === 401) {
			return Promise.reject(res);
		}

		return res.json();
	});
