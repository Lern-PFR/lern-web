import _ from 'lodash';
import routes from 'routes';
import { history } from 'routes/components/RouterProvider';

/**
 * @function
 * @name redirectOnSuccess
 * @description A helper method redirecting the user after a successful completion of a task.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} redirectUrl : The url to redirect to.
 */
export const redirectOnSuccess = (redirectUrl) => {
	if (redirectUrl) {
		/**
		 * @TODO: check if route exists if we are in a dev environment.
		 * 		To check for environment, use the {@link lib/shared/environmentHelper:isDev isDev} method.
		 */
		history.push({
			pathname: redirectUrl,
			state: {
				requestedLocation: history.location,
			},
		});
	}
};

/**
 * @function
 * @name redirectOnSuccess
 * @description A helper method redirecting the user after a failed completion of a task.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} redirectUrl : The url to redirect to.
 */
export const redirectOnFailure = (redirectUrl) => {
	if (redirectUrl) {
		/**
		 * @TODO: check if route exists if we are in a dev environment.
		 * 		To check for environment, use the {@link lib/shared/environmentHelper:isDev isDev} method.
		 */
		history.push({
			pathname: redirectUrl,
			state: {
				requestedLocation: history.location,
			},
		});
	}
};

/**
 * @function
 * @name redirectOnLogin
 * @description A helper method redirecting the user after a successful login.
 *
 * @author Yann Hodiesne
 *
 * @param {string}	redirectUrl				: The url to redirect to, if the user did not ask for another route.
 * @param {func}	[postRedirectCallback]	: The callback to run after redirecting the user, only if the user has been redirected.
 */
export const redirectOnLogin = (redirectUrl, postRedirectCallback) => {
	const doNotRedirect = [
		routes.auth.login,
		routes.auth.logout,
		routes.auth.forgottenPassword,
	];

	const requestedLocation = history.location?.state?.requestedLocation;

	let resolvedLocation = null;

	// Prevent from redirecting to the routes contained in `doNotRedirect`
	if (_.has(requestedLocation, 'pathname') && !_.includes(doNotRedirect, requestedLocation.pathname)) {
		resolvedLocation = requestedLocation;
	} else if (redirectUrl) {
		// Redirect to the default home page for the newly logged in account
		resolvedLocation = {
			pathname: redirectUrl,
			state: {
				requestedLocation: history.location,
			},
		};
	}

	if (resolvedLocation !== null) {
		history.push(resolvedLocation);

		if (postRedirectCallback) {
			postRedirectCallback(resolvedLocation);
		}
	}
};
