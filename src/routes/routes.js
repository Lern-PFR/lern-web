/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
import App from 'components/App';
import { PostSignupPage, SignupPage } from 'pages/auth';
import { NotionDetailsPage } from 'pages/notions';
import { SubjectDetailsPage } from 'pages/subjects';
import { ModuleDetailsPage } from 'pages/modules';
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
	{
		path: keys.about.default,
		exact: true,
		allowAnonymous: true,
		allowAuthenticated: true,
		component: () => <p>About</p>,
	},
	{
		path: keys.contactUs.default,
		exact: true,
		allowAnonymous: true,
		allowAuthenticated: true,
		component: () => <p>Contact us</p>,
	},
	// Home
	{
		path: keys.home.default,
		exact: true,
		allowAnonymous: true,
		allowAuthenticated: true,
		component: () => <p>Home</p>,
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
				component: SignupPage,
			},
			{
				path: keys.auth.postSignup,
				allowAnonymous: true,
				allowAuthenticated: false,
				exact: true,
				component: PostSignupPage,
			},
		],
	},
	// Subjects
	{
		path: keys.subjects.default,
		routes: [
			{
				path: keys.subjects.subjectDetails,
				allowAnonymous: true, // @TODO: set to false once login is implemented.
				allowAuthenticated: true,
				exact: true,
				component: SubjectDetailsPage,
			},
		],
	},
	// Modules
	{
		path: keys.modules.default,
		routes: [
			{
				path: keys.modules.moduleDetails,
				allowAnonymous: true, // @TODO: set to false once login is implemented.
				allowAuthenticated: true,
				exact: true,
				component: ModuleDetailsPage,
			},
		],
	},
	// Notions
	{
		path: keys.notions.default,
		routes: [
			{
				path: keys.notions.notionDetails,
				allowAnonymous: true, // @TODO: set to false once login is implemented.
				allowAuthenticated: true,
				exact: true,
				component: NotionDetailsPage,
			},
			{
				path: keys.notions.lessonDetails,
				allowAnonymous: true, // @TODO: set to false once login is implemented.
				allowAuthenticated: true,
				exact: true,
				component: NotionDetailsPage,
			},
		],
	},
	// Lessons
	{
		path: keys.lessons.default,
		routes: [
			{
				path: keys.lessons.lessonsDetails,
				allowAnonymous: true, // @TODO: set to false once login is implemented.
				allowAuthenticated: true,
				exact: true,
				component: () => <p>Lesson</p>,
			},
		],
	},
];
