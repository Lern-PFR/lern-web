import fetchMock from 'fetch-mock';
import session from 'lib/shared/session';
import { baseUrl } from 'lib/shared/http';
import * as httpModule from 'lib/shared/http';

describe('http helper methods', () => {
	describe('getHeaders', () => {
		beforeEach(() => {
			jest.spyOn(session, 'get').mockImplementation(() => 'dummy_auth_token');
		});

		afterEach(() => {
			jest.restoreAllMocks();
		});

		it('should return a simple Headers object with content-type specified', () => {
			jest.spyOn(session, 'exists').mockImplementation(() => false);
			const expectedResult = new Headers({ 'Content-Type': 'application/json' });

			expect(httpModule.getHeaders()).toEqual(expectedResult);
		});

		it('should return a Headers object with content-type and Authorization fields specified', () => {
			jest.spyOn(session, 'exists').mockImplementation(() => true);
			const expectedResult = new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer dummy_auth_token',
			});

			expect(httpModule.getHeaders()).toEqual(expectedResult);
		});
	});

	describe('objectToQS', () => {
		it('should return an empty string if provided object is empty.', () => {
			const params = {};
			const expectedResult = '';

			expect(httpModule.objectToQS(params)).toEqual(expectedResult);
		});

		it('should return an stringified version of single-entry provided object.', () => {
			const params = { id: 'dummyId' };
			const expectedResult = `id=${params.id}`;

			expect(httpModule.objectToQS(params)).toEqual(expectedResult);
		});

		it('should return an stringified version of multiple-entry provided object.', () => {
			const params = { id: 'dummyId', name: 'jack' };
			const expectedResult = `id=${params.id}&name=${params.name}`;

			expect(httpModule.objectToQS(params)).toEqual(expectedResult);
		});
	});

	describe('handleResponse', () => {
		afterEach(() => {
			jest.restoreAllMocks();
		});

		it('should return Promise.resolve() when parameter object\'s status is 204.', () => expect(httpModule.handleResponse({ status: 204 })).toEqual(Promise.resolve()));

		it('should return Promise.reject(...) upon reception of a status 401 object whilst a session exists.', () => {
			const param = { status: 401 };
			jest.spyOn(session, 'exists').mockImplementation(() => true);

			expect(httpModule.handleResponse(param)).rejects.toEqual(param);
		});

		it('should return Promise.reject(...) upon reception of a status 401 object.', () => {
			const param = { status: 401 };
			jest.spyOn(session, 'exists').mockImplementation(() => false);

			expect(httpModule.handleResponse(param)).rejects.toEqual(param);
		});

		it('should return Promise.reject(...) upon reception of a status 403 object.', () => {
			const param = { status: 403 };

			expect(httpModule.handleResponse(param)).rejects.toEqual(param);
		});

		it('should return Promise.reject(...) upon reception of a status 413 object.', () => {
			const param = { status: 413 };

			expect(httpModule.handleResponse(param)).rejects.toEqual(param);
		});

		it('should return Promise.reject(...) upon reception of an object with a status value higher than 499.', () => {
			const param = { status: 500 };

			expect(httpModule.handleResponse(param)).rejects.toEqual(param);
		});

		it('should return a json version of the parameter object in any other scenario.', () => {
			const responseBodyObject = {
				id: 'abcd',
				name: 'jack',
			};
			const mockedJsonMethod = jest.fn().mockImplementation(() => (responseBodyObject));
			const param = {
				status: 200,
				body: JSON.stringify(responseBodyObject),
				json: mockedJsonMethod,
			};

			expect(httpModule.handleResponse(param)).toEqual(mockedJsonMethod());
		});
	});

	describe('handleError', () => {
		it('should return a Promise.reject with the error status and statusText data', () => {
			const errorObject = {
				status: 400,
				statusText: 'Bad request',
			};

			const expectedResult = {
				status: errorObject.status,
				message: errorObject.statusText,
			};

			expect(httpModule.handleError(errorObject)).rejects.toEqual(expectedResult);
		});
	});

	describe('get', () => {
		const headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: 'Bearer dummy_auth_token',
		});

		beforeEach(() => {
			jest.spyOn(httpModule, 'getHeaders').mockReturnValue(headers);
			jest.spyOn(httpModule, 'objectToQS');
		});

		afterEach(() => {
			jest.restoreAllMocks();
			fetchMock.reset();
			fetchMock.restore();
		});

		it('should create a HTTP GET method request', () => {
			fetchMock.get(`${baseUrl}/test/abcd`, {});
			httpModule.get('/test/abcd', {});
			const result = fetchMock.lastCall();

			console.log(result);

			expect(result[1].method).toEqual('GET');
		});

		it('should convert qsObject param into a query string if not empty', () => {
			const qsObject = { name: 'john', sorting: 'ASC id' };
			const expectedResultUrl = `/${baseUrl}/test/abcd?${httpModule.objectToQS(qsObject)}`;
			fetchMock.get(expectedResultUrl, {});

			httpModule.get('/test/abcd', qsObject);
			const result = fetchMock.lastCall();

			expect(result[0]).toEqual(expectedResultUrl);
		});

		it('should not call objectToQS method if qsObject parameter is not provided', () => {
			fetchMock.get(`${baseUrl}/test/abcd`, {});
			httpModule.get('/test/abcd');

			expect(httpModule.objectToQS).toHaveBeenCalledTimes(0);
		});

		it('should not call objectToQS method if qsObject parameter is empty', () => {
			fetchMock.get(`${baseUrl}/test/abcd`, {});
			httpModule.get('/test/abcd', {});

			expect(httpModule.objectToQS).toHaveBeenCalledTimes(0);
		});
	});

	describe('post', () => {
		const headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: 'Bearer dummy_auth_token',
		});

		beforeEach(() => {
			jest.spyOn(httpModule, 'getHeaders').mockReturnValue(headers);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			fetchMock.reset();
			fetchMock.restore();
		});

		it('should create a HTTP POST method request', () => {
			fetchMock.post(`${baseUrl}/test/abcd`, {});
			httpModule.post('/test/abcd', {});
			const result = fetchMock.lastCall();

			expect(result[1].method).toEqual('POST');
		});

		it('should stringify the body parameter before using it as request body', () => {
			const body = {
				id: 'abcd',
				name: 'John doe',
			};
			fetchMock.post(`${baseUrl}/test/abcd`, {});
			httpModule.post('/test/abcd', body);
			const result = fetchMock.lastCall();

			expect(result[1].body).toEqual(JSON.stringify(body));
		});
	});

	describe('put', () => {
		const headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: 'Bearer dummy_auth_token',
		});

		beforeEach(() => {
			jest.spyOn(httpModule, 'getHeaders').mockReturnValue(headers);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			fetchMock.reset();
			fetchMock.restore();
		});

		it('should create a HTTP PUT method request', () => {
			fetchMock.put(`${baseUrl}/test/abcd`, {});
			httpModule.put('/test/abcd', {});
			const result = fetchMock.lastCall();

			expect(result[1].method).toEqual('PUT');
		});

		it('should stringify the body parameter before using it as request body', () => {
			const body = {
				id: 'abcd',
				name: 'John doe',
			};
			fetchMock.put(`${baseUrl}/test/abcd`, {});
			httpModule.put('/test/abcd', body);
			const result = fetchMock.lastCall();

			expect(result[1].body).toEqual(JSON.stringify(body));
		});
	});

	describe('del', () => {
		const headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: 'Bearer dummy_auth_token',
		});

		beforeEach(() => {
			jest.spyOn(httpModule, 'getHeaders').mockReturnValue(headers);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			fetchMock.reset();
			fetchMock.restore();
		});

		it('should create a HTTP DELETE method request', () => {
			fetchMock.delete(`${baseUrl}/test/abcd`, {});
			httpModule.del('/test/abcd', {});
			const result = fetchMock.lastCall();

			expect(result[1].method).toEqual('DELETE');
		});
	});
});
