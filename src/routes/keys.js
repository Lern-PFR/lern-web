export default Object.freeze({
	root: '/',
	app: {
		default: '/',
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
});
