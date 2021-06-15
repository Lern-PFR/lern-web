import { history } from 'routes/components/RouterProvider';
import session from 'lib/shared/session';
import routes from 'routes';

/**
 * @constant
 * @name baseUrl
 * @description The base url to append to in order to target and API endpoint.
 * @type {string}
 *
 * @author Timothée Simon-Franza
 *
 * Note : Its value is set using environment variables set defined in this .env file and forwarded by docker-compose.
 */
export const baseUrl = process.env.REACT_APP_API_URL;

/**
 * @function
 * @name getHeaders
 * @description Generates and returns a header bundle from the current session's data.
 *
 * @author Timothée Simon-Franza
 * @author Yann Hodiesne
 *
 * @returns {Header} the generated header bundle.
 */
export const getHeaders = () => {
	const headers = new Headers();

	headers.append('Content-Type', 'application/json');

	if (session.exists()) {
		headers.append('Authorization', `Bearer ${session.get()}`);
	}

	return headers;
};

/**
 * @function
 * @name objectToQS
 * @description Converts the object in parameter to a query string.
 *
 * @author Timothée Simon-Franza
 * @author Yann Hodiesne
 *
 * @param {object} params : The object to convert to QS.
 *
 * @returns {string}
 */
export const objectToQS = (params) => Object
	.entries(params)
	.map(([key, value]) => {
		if (value !== undefined && value !== null) {
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		}

		return `${encodeURIComponent(key)}`;
	})
	.join('&');

/**
 * @function
 * @name handleResponse
 * @description Automatically deserializes and handles the received response object.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} response : The response to handle.
 *
 * @returns {Promise | object}
 */
export const handleResponse = (response) => {
	if (response.status === 204) {
		return Promise.resolve();
	}

	if (response.status === 401 && session.exists()) {
		history.push(routes.auth.logout);
	}

	if (response.status === 401 || response.status === 403 || response.status === 409 || response.status === 413 || response.status >= 500) {
		return Promise.reject(response);
	}

	return response.json();
};

/**
 * @function
 * @name handleError
 * @description Automatically handles the received error to return a formatted object.
 *
 * @author Yann Hodiesne
 *
 * @param {object} error : The error to handle.
 *
 * @returns {Promise.reject}
 */
export const handleError = (error) => {
	const {
		status,
		statusText: message,
	} = error;

	return Promise.reject({ status, message });
};

/**
 * @function
 * @name post
 * @description Creates a POST method http call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} url	: The url to target.
 * @param {object} body	: The body to include.
 *
 * @returns {Promise | object}
 */
export const post = (url, body) => fetch(`${baseUrl}${url}`, {
	method: 'POST',
	body: JSON.stringify(body),
	headers: getHeaders(),
}).then(handleResponse).catch(handleError);

/**
 * @function
 * @name get
 * @description Creates a GET method http call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} url		: The url to target.
 * @param {objcet} qsObject	: The object to convert into a query string.
 *
 * @returns {Promise | object}
 */
export const get = (url, qsObject) => {
	const queryString = (qsObject && Object.keys(qsObject).length !== 0) ? `?${objectToQS(qsObject)}` : '';

	return fetch(`${baseUrl}${url}${queryString}`, {
		method: 'GET',
		headers: getHeaders(),
	}).then(handleResponse).catch(handleError);
};

/**
 * @function
 * @name put
 * @description Creates a PUT method http call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} url : The url to target.
 * @param {object} body : The body to include.
 */
export const put = (url, body) => fetch(`${baseUrl}${url}`, {
	method: 'PUT',
	body: JSON.stringify(body),
	headers: getHeaders(),
}).then(handleResponse).catch(handleError);

/**
 * @function
 * @name del
 * @description Creates a DELETE method http call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} url : The url to target.
 */
export const del = (url) => fetch(`${baseUrl}${url}`, {
	method: 'DELETE',
	headers: getHeaders(),
}).then(handleResponse).catch(handleError);
