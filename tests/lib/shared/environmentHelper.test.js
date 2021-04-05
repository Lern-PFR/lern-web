import isDev from 'lib/shared/environmentHelper';

describe('Environment helper methods', () => {
	describe('isDev', () => {
		let originalNodeEnvValue;

		beforeEach(() => {
			originalNodeEnvValue = process.env.NODE_ENV;
		});

		afterEach(() => {
			process.env.NODE_ENV = originalNodeEnvValue;
		});

		it('should return true if the NODE_ENV environment variable is not set.', () => {
			delete process.env.NODE_ENV;

			return expect(isDev()).toEqual(true);
		});

		it('should return false if the NODE_ENV environment variable is set to "production".', () => {
			process.env.NODE_ENV = 'production';

			return expect(isDev()).toEqual(false);
		});

		it('should return true if the NODE_ENV environment variable is set to "development".', () => {
			process.env.NODE_ENV = 'development';

			return expect(isDev()).toEqual(true);
		});

		it('should return true if the NODE_ENV environment variable is set to anything other than "production".', () => {
			process.env.NODE_ENV = 'GodSaveTheQueen';

			return expect(isDev()).toEqual(true);
		});
	});
});
