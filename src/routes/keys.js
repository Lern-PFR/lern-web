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
		moduleDetails: '/modules/:moduleId',
	},
	concepts: {
		default: '/concepts',
		conceptEdition: '/concepts/edit/:conceptId',
		conceptDetails: '/concepts/:conceptId',
		lessonDetails: '/concepts/:conceptId/lessons/:lessonId',
	},
	lessons: {
		default: '/lessons',
		lessonDetails: '/lessons/:id',
	},
});
