import localStorage from 'lib/shared/localStorage';

/**
 * @constant
 * @name TOKEN_KEY
 * @description The localstorage key used to store the authentication token.
 * @type {string}
 */
export const TOKEN_KEY = 'json_token';

export default {
	set: (token) => localStorage.put(TOKEN_KEY, token),
	get: () => localStorage.get(TOKEN_KEY),
	exists: () => localStorage.get(TOKEN_KEY) !== null,
	remove: () => localStorage.remove(TOKEN_KEY),
};
