/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
import App from 'components/App';
import { PostSignupPage, SignInPage, SignupPage } from 'pages/auth';
import { ConceptDetailsPage } from 'pages/concepts';
import { SubjectCreationPage, SubjectDetailsPage, SubjectEditionPage, SubjectListPage, SubjectStructurePage } from 'pages/subjects';
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
				component: SignInPage,
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
				path: keys.subjects.list,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: SubjectListPage,
			},
			{
				path: keys.subjects.subjectStructure,
				allowAnonymous: true,
				allowAuthenticated: true,
				exact: true,
				component: SubjectStructurePage,
			},
			{
				path: keys.subjects.subjectCreation,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: SubjectCreationPage,
			},
			{
				path: keys.subjects.subjectEdition,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: SubjectEditionPage,
			},
			{
				path: keys.subjects.subjectDetails,
				allowAnonymous: false,
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
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: ModuleDetailsPage,
			},
		],
	},
	// Concepts
	{
		path: keys.concepts.default,
		routes: [
			{
				path: keys.concepts.conceptDetails,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: ConceptDetailsPage,
			},
		],
	},
	// Lessons
	{
		path: keys.lessons.default,
		routes: [
			{
				path: keys.lessons.lessonsDetails,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: () => <p>Lesson</p>,
			},
		],
	},
];
