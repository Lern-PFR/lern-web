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
		subjectCreation: '/subjects/create',
		subjectDetails: '/subjects/:subjectId',
	},
	modules: {
		default: '/modules',
		moduleDetails: '/modules/:moduleId',
	},
	concepts: {
		default: '/concepts',
		conceptDetails: '/concepts/:conceptId',
		lessonDetails: '/concepts/:conceptId/lessons/:lessonId',
	},
	lessons: {
		default: '/lessons',
		lessonDetails: '/lessons/:id',
	},
});
