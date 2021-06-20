/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
import { PostSignupPage, SignInPage, SignupPage } from 'pages/auth';
import { ConceptCreationPage, ConceptDetailsPage, ConceptEditionPage } from 'pages/concepts';
import { SubjectCreationPage, SubjectDetailsPage, SubjectEditionPage, SubjectListPage, SubjectStructurePage } from 'pages/subjects';
import { ModuleCreationPage, ModuleDetailsPage, ModuleEditionPage } from 'pages/modules';
import { Homepage } from 'pages/home';
import { LessonCreationPage } from 'pages/lessons';
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
		component: Homepage,
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
		component: Homepage,
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
				path: keys.subjects.moduleCreation,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: ModuleCreationPage,
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
				path: keys.modules.moduleEdition,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: ModuleEditionPage,
			},
			{
				path: keys.modules.conceptCreation,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: ConceptCreationPage,
			},
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
				path: keys.concepts.conceptEdition,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: ConceptEditionPage,
			},
			{
				path: keys.concepts.conceptDetails,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: ConceptDetailsPage,
			},
			{
				path: keys.concepts.lessonCreation,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: LessonCreationPage,
			},
			{
				path: keys.concepts.lessonDetails,
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
				path: keys.lessons.lessonEdition,
				allowAnonymous: false,
				allowAuthenticated: true,
				exact: true,
				component: () => <p>Lesson edition</p>,
			},
		],
	},
];
