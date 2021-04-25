/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
import App from 'components/App';
import keys from './keys';

/**
 * Routes to render
 * For authentication purposes, each route can have `allowAnonymous` and `allowAuthenticated` values
 * Default values are :
 *  - `allowAnonymous`		: false
 *  - `allowAuthenticated`	: true
 */
export default [
	{
		path: keys.app.default,
		exact: true,
		allowAnonymous: true,
		component: App,
	},
	// Auth
	{
		path: keys.auth.default,
		routes: [
			{
				path: keys.auth.login,
				allowAnonymous: true,
				allowAuthenticated: false,
				exact: true,
				component: () => <p>Login</p>,
			},
			{
				path: keys.auth.logout,
				exact: true,
				component: () => <p>Logout</p>,
			},
			{
				path: keys.auth.forgottenPassword,
				allowAnonymous: true,
				allowAuthenticated: false,
				exact: true,
				component: () => <p>Forgot password</p>,
			},
			{
				path: keys.auth.signup,
				allowAnonymous: true,
				allowAuthenticated: false,
				exact: true,
				component: () => <p>Sign up</p>,
			},
		],
	},
];
