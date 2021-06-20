export default Object.freeze({
	root: '/',
	app: {
		default: '/',
	},
	about: {
		default: '/about',
	},
	contactUs: {
		default: '/contact-us',
	},
	home: {
		default: '/home',
	},
	auth: {
		default: '/auth',
		login: '/auth/login',
		logout: '/auth/logout',
		signup: '/auth/signup',
		postSignup: '/auth/email-sent',
		forgottenPassword: '/auth/forgotten-password',
	},
	subjects: {
		default: '/subjects',
		list: '/subjects',
		subjectStructure: '/subjects/structure',
		subjectCreation: '/subjects/create',
		subjectEdition: '/subjects/edit/:subjectId',
		moduleCreation: '/subjects/:subjectId/modules/create',
		subjectDetails: '/subjects/details/:subjectId',
	},
	modules: {
		default: '/modules',
		moduleEdition: '/modules/edit/:moduleId',
		conceptCreation: '/modules/:moduleId/concepts/create',
		moduleDetails: '/modules/details/:moduleId',
	},
	concepts: {
		default: '/concepts',
		conceptEdition: '/concepts/edit/:conceptId',
		lessonCreation: '/concepts/:conceptId/lessons/create',
		conceptDetails: '/concepts/details/:conceptId',
		lessonDetails: '/concepts/details/:conceptId/lessons/:lessonId',
	},
	lessons: {
		default: '/lessons',
		lessonEdition: '/lessons/edit/:lessonId',
		exerciseCreation: '/lessons/:lessonId/exercises/create',
	},
});
