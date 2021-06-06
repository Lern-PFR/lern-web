import * as AuthenticationAPI from 'api/authenticationApi';
import * as UsersApi from 'api/usersApi';
import { redirectOnSuccess } from 'lib/shared/redirectionHelper';
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

	SIGNUP_REQUEST: '@USERS/SIGNUP_REQUEST',
	SIGNUP_SUCCESS: '@USERS/SIGNUP_SUCCESS',
	SIGNUP_FAILURE: '@USERS/SIGNUP_FAILURE',

	FETCH_USER_REQUEST: '@USERS/FETCH_REQUEST',
	FETCH_USER_SUCCESS: '@USERS/FETCH_SUCCESS',
	FETCH_USER_FAILURE: '@USERS/FETCH_FAILURE',

	FETCH_USER_LIST_REQUEST: '@USERS/FETCH_LIST_REQUEST',
	FETCH_USER_LIST_SUCCESS: '@USERS/FETCH_LIST_SUCCESS',
	FETCH_USER_LIST_FAILURE: '@USERS/FETCH_LIST_FAILURE',

	UPDATE_USER_REQUEST: '@USERS/UPDATE_REQUEST',
	UPDATE_USER_SUCCESS: '@USERS/UPDATE_SUCCESS',
	UPDATE_USER_FAILURE: '@USERS/UPDATE_FAILURE',

	LOGOUT_REQUEST: '@USERS/LOGOUT_REQUEST',
	LOGOUT_SUCCESS: '@USERS/LOGOUT_SUCCESS',

	LOGIN_TOKEN_REQUEST: '@USERS/LOGIN_TOKEN_REQUEST',
	LOGIN_TOKEN_SUCCESS: '@USERS/LOGIN_TOKEN_SUCCESS',
	LOGIN_TOKEN_FAILURE: '@USERS/LOGIN_TOKEN_FAILURE',
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
// ///////////// User login with token actions //////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name loginWithTokenRequest
 * @description Action triggered anytime a login call is made to the API.
 *
 * @author Yann Hodiesne
 *
 * @returns {object}
 */
const loginWithTokenRequest = () => ({ type: ActionTypes.LOGIN_TOKEN_REQUEST });

/**
 * @function
 * @name loginWithTokenSuccess
 * @description Action triggered as a result to a successful login API call.
 *
 * @author Yann Hodiesne
 *
 * @param {object} user	: The retrieved user object.
 *
 * @returns {object}
 */
const loginWithTokenSuccess = ({ user }) => ({
	type: ActionTypes.LOGIN_TOKEN_SUCCESS,
	payload: { user },
});

/**
 * @function
 * @name loginWithTokenFailure
 * @description Action triggered as a result to a failed login API call.
 *
 * @author Yann Hodiesne
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const loginWithTokenFailure = (error) => ({
	type: ActionTypes.LOGIN_TOKEN_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////////// User login actions ///////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name signUpRequest
 * @description Action triggered anytime a signup call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const signUpRequest = () => ({ type: ActionTypes.SIGNUP_REQUEST });

/**
 * @function
 * @name signUpSuccess
 * @description Action triggered as a result to a successful signup API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} user		: The newly created user object.
 *
 * @returns {object}
 */
const signUpSuccess = ({ user }) => ({
	type: ActionTypes.SIGNUP_SUCCESS,
	payload: { user },
});

/**
 * @function
 * @name signUpFailure
 * @description Action triggered as a result to a signup login API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const signUpFailure = (error) => ({
	type: ActionTypes.SIGNUP_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// ///////////// Specific user fetching actions /////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchUserRequest
 * @description Action triggered anytime a user fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchUserRequest = () => ({ type: ActionTypes.FETCH_USER_REQUEST });

/**
  * @function
  * @name fetchUserSuccess
  * @description Action triggered as a result to a successful user fetching API call.
  *
  * @author Timothée Simon-Franza
  *
  * @param {object} user : The retrieved user object.
  *
  * @returns {object}
  */
const fetchUserSuccess = ({ user }) => ({
	type: ActionTypes.FETCH_USER_SUCCESS,
	payload: { user },
});

/**
  * @function
  * @name fetchUserFailure
  * @description Action triggered as a result to a failed user fetching API call.
  *
  * @author Timothée Simon-Franza
  *
  * @param {object} error : The exception sent back from the API.
  *
  * @returns {object}
  */
const fetchUserFailure = (error) => ({
	type: ActionTypes.FETCH_USER_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////// User list fetching actions ///////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name fetchUserListRequest
 * @description Action triggered anytime a user list fetching call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const fetchUserListRequest = () => ({ type: ActionTypes.FETCH_USER_LIST_REQUEST });

/**
 * @function
 * @name fetchUserListSuccess
 * @description Action triggered as a result to a successful user list fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	users		: The list of retrieved users.
 * @param {number}	totalCount	: The total amount of users available in the database for the current user.
 *
 * @returns {object}
 */
const fetchUserListSuccess = ({ users, totalCount }) => ({
	type: ActionTypes.FETCH_USER_LIST_SUCCESS,
	payload: { users, totalCount },
});

/**
 * @function
 * @name fetchUserListFailure
 * @description Action triggered as a result to a failed user list fetching API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const fetchUserListFailure = (error) => ({
	type: ActionTypes.FETCH_USER_LIST_FAILURE,
	payload: { error },
});

// //////////////////////////////////////////////////////// //
// /////////////////// User update actions //////////////// //
// //////////////////////////////////////////////////////// //

/**
 * @function
 * @name updateUserRequest
 * @description Action triggered anytime a user update call is made to the API.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {object}
 */
const updateUserRequest = () => ({ type: ActionTypes.UPDATE_USER_REQUEST });

/**
 * @function
 * @name updateUserSuccess
 * @description Action triggered as a result to a successful user update API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} user : The updated user object.
 *
 * @returns {object}
 */
const updateUserSuccess = ({ user }) => ({
	type: ActionTypes.UPDATE_USER_SUCCESS,
	payload: { user },
});

/**
 * @function
 * @name updateUserFailure
 * @description Action triggered as a result to a failed user update API call.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} error : The exception sent back from the API.
 *
 * @returns {object}
 */
const updateUserFailure = (error) => ({
	type: ActionTypes.UPDATE_USER_FAILURE,
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
 * @param {string} [onSuccessRoute]	The url to redirect the user to upon successful completion. Should be imported from the {@Link routes/keys.js} file.
 */
export const login = (credentials, onSuccessRoute = null) => (dispatch) => {
	dispatch(loginRequest());
	const { username, password } = credentials;

	return AuthenticationAPI.tryLogin(username, password)
		.then(({ token, ...user }) => {
			session.set(token);

			dispatch(loginSuccess({ token, user }));
			redirectOnSuccess(onSuccessRoute);
		})
		.catch((error) => dispatch(loginFailure(error)));
};

/**
 * @function
 * @name loginWithToken
 * @description Method used to login the user using an already known token and retrieve its data.
 *
 * @author Yann Hodiesne
 *
 * @see {@link getAccessRights} for further information.
 */
export const loginWithToken = () => (dispatch) => {
	dispatch(loginWithTokenRequest());

	return AuthenticationAPI.checkToken()
		.then((user) => {
			dispatch(loginWithTokenSuccess({ user }));
		})
		.catch((error) => {
			dispatch(loginWithTokenFailure(error));

			if (session.exists()) {
				session.remove();
			}
		});
};

/**
 * @function
 * @name signUp
 * @description Method used to register a new user into the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {Object} params			The data to provide the API.
 * @param {string} params.firstname	The first name of the user we want to create.
 * @param {string} params.lastname	The last name of the user we want to create.
 * @param {string} params.nickname	The nickname that the user will provide to signin.
 * @param {string} params.email		The email address to send the account activation link to.
 * @param {string} params.password	The password linked to the account.
 * @param {string} [onSuccessRoute]	The url to redirect the user to upon successful completion. Should be imported from the {@Link routes/keys.js} file.
 */
export const signUp = (params, onSuccessRoute = null) => (dispatch) => {
	dispatch(signUpRequest());

	return UsersApi.createUser(params)
		.then(({ user }) => {
			dispatch(signUpSuccess({ user }));
			redirectOnSuccess(onSuccessRoute);
		})
		.catch((error) => dispatch(signUpFailure(error)));
};

/**
 * @function
 * @name fetchUser
 * @description Method used to fetch the latest version of a specific user.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} userId : The id of the user we want to retrieve.
 */
export const fetchUser = (userId) => (dispatch) => {
	dispatch(fetchUserRequest());

	return UsersApi.fetchUserById(userId)
		.then(({ user }) => dispatch(fetchUserSuccess({ user })))
		.catch((error) => dispatch(fetchUserFailure(error)));
};

/**
 * @function
 * @name fetchUserList
 * @description Method used to fetch all users available to the current user.
 *
 * @author Timothée Simon-Franza
 */
export const fetchUserList = () => (dispatch) => {
	dispatch(fetchUserListRequest());

	return UsersApi.fetchUsers()
		.then(({ users, totalCount }) => dispatch(fetchUserListSuccess({ users, totalCount })))
		.catch((error) => dispatch(fetchUserListFailure(error)));
};

/**
 * @function
 * @name updateUser
 * @description Method used to update an existing user instance from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} userData	: The data to update the user with.
 * @param {string} userId	: The id of the user we want to update.
 */
export const updateUser = (userData, userId) => (dispatch) => {
	dispatch(updateUserRequest());

	return UsersApi.updateUser(userData, userId)
		.then(({ user }) => dispatch(updateUserSuccess({ user })))
		.catch((error) => dispatch(updateUserFailure(error)));
};

/**
 * @function
 * @name logout
 * @description Method used to logout the user from the application.
 *
 * @author Yann Hodiesne
 * @author Timothée Simon-Franza
 *
 * @param {string} [onSuccessRoute]	The url to redirect the user to upon successful completion. Should be imported from the {@Link routes/keys.js} file.
 */
export const logout = (onSuccessRoute = null) => (dispatch) => {
	dispatch(logoutRequest());
	session.remove();
	dispatch(logoutSuccess());

	redirectOnSuccess(onSuccessRoute);
};
