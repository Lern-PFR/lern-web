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
		forgottenPassword: '/auth/forgotten-password',
	},
	subjects: {
		default: '/subjects',
		subjectDetails: '/subjects/:id',
	},
	modules: {
		default: '/modules',
		moduleDetails: '/modules/:id',
	},
	notions: {
		notionDetails: '/notions/:id',
	},
	lessons: {
		default: '/lessons',
		lessonDetails: '/lessons/:id',
	},
});
