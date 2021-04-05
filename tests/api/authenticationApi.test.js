import { checkToken } from 'api/authenticationApi';
import * as httpModule from 'lib/shared/http';
import fetchMock from 'fetch-mock';

describe('Authentication api', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('checkTocken method', () => {
		it('should return Promise.reject upon reception of a 401 http response code.', async () => {
			expect.assertions(1);
			const httpResponse = { status: 401 };
			fetchMock.post(`${httpModule.baseUrl}/api/whoami`, httpResponse);

			await expect(checkToken()).rejects.toMatchObject(httpResponse);
		});

		it('should return a parsed version of the response upon reception of a non-401 http response code.', async () => {
			expect.assertions(1);
			const httpResponse = { status: 200, body: { message: 'dummy message' } };
			fetchMock.post(`${httpModule.baseUrl}/api/whoami`, httpResponse);
			const result = await checkToken();

			expect(result).toMatchObject({ message: 'dummy message' });
		});
	});
});
