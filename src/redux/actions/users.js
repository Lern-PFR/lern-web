import * as AuthenticationAPI from 'api/authenticationApi';
import session from 'lib/shared/session';

/**
 * @constant
 * @name ActionTypes
 * @description The various action types used to interact with the Users redux state.
 * @type {object}
 *
 * @author Timothée Simon-Franza
 */
export const ActionTypes = {
	LOGIN_REQUEST: '@USERS/LOGIN_REQUEST',
	LOGIN_SUCCESS: '@USERS/LOGIN_SUCCESS',
	LOGIN_FAILURE: '@USERS/LOGIN_FAILURE',

	LOGOUT_REQUEST: '@USERS/LOGOUT_REQUEST',
	LOGOUT_SUCCESS: '@USERS/LOGOUT_SUCCESS',
};

// //////////////////////////////////////////////////////// //
// /////////////////// User login actions ///////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name loginRequest
 * @description Action triggered anytime a login call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const loginRequest = () => ({ type: ActionTypes.LOGIN_REQUEST });

/**
 * @function
 * @name loginSuccess
 * @description Action triggered as a result to a successful login API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} token	: The authentication token generated by the server.
 * @param {object} user		: The retrieved user object.
 *
 * @returns {object}
 */
const loginSuccess = ({ token, user }) => ({
	type: ActionTypes.LOGIN_SUCCESS,
	payload: { token, user },
});

/**
 * @function
 * @name loginFailure
 * @description Action triggered as a result to a failed login API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const loginFailure = (error) => ({
	type: ActionTypes.LOGIN_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////////// User logout actions ///////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name logoutRequest
 * @description Action triggered anytime a logout call is made.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const logoutRequest = () => ({ type: ActionTypes.LOGOUT_REQUEST });

/**
 * @function
 * @name logoutSuccess
 * @description Action triggered as a result to a successful logout.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const logoutSuccess = () => ({ type: ActionTypes.LOGOUT_SUCCESS });

// //////////////////////////////////////////////////////// //
// //////////////// Exported action creators ////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name login
 * @description Method used to login the user and retrieve its data along an authentication token.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} username	: The username to send to the api call.
 * @param {string} password	: The password to send to the api call.
 */
export const login = ({ username, password }) => (dispatch) => {
	dispatch(loginRequest());

	return AuthenticationAPI.tryLogin(username, password)
		.then(({ token, user }) => {
			session.set(token);

			dispatch(loginSuccess({ token, user }));
		})
		.catch((error) => dispatch(loginFailure(error)));
};

/**
 * @function
 * @name logout
 * @description Method used to logout the user from the application.
 *
 * @author Yann Hodiesne
 * @author Timothée Simon-Franza
 */
export const logout = () => (dispatch) => {
	dispatch(logoutRequest());
	session.remove();
	dispatch(logoutSuccess());
};
