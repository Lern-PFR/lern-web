import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as modulesActions from 'redux/actions/modules';
import { baseUrl } from 'lib/shared/http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	users: {
		isLoading: false,
		items: [],
		totalCount: 0,
	},
};

describe('Module-related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('Specific module fetching', () => {
		it('should create a FETCH_MODULE_REQUEST action when module fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: modulesActions.ActionTypes.FETCH_MODULE_REQUEST },
			];

			// Act
			store.dispatch(modulesActions.fetchModule('abcd'));

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_MODULE_SUCCESS action when module fetching logic is succesful', () => {
			// Arrange
			const module = {
				id: 'abcd',
				name: 'Dummy module',
			};

			const httpResponse = {
				status: 200,
				body: { module },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/modules/${module.id}`, httpResponse);

			const expectedActions = [
				{ type: modulesActions.ActionTypes.FETCH_MODULE_REQUEST },
				{ type: modulesActions.ActionTypes.FETCH_MODULE_SUCCESS, payload: { module } },
			];

			// Act & assert
			return store.dispatch(modulesActions.fetchModule(module.id))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_MODULE_FAILURE action when module fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/modules/abcd`, httpResponse);

			const expectedActions = [
				{ type: modulesActions.ActionTypes.FETCH_MODULE_REQUEST },
				{
					type: modulesActions.ActionTypes.FETCH_MODULE_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(modulesActions.fetchModule('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Module list fetching', () => {
		it('should create a FETCH_MODULE_LIST_REQUEST action when module list fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: modulesActions.ActionTypes.FETCH_MODULE_LIST_REQUEST },
			];

			// Act
			store.dispatch(modulesActions.fetchModuleListBySubjectId('abcd'));

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_MODULE_LIST_SUCCESS action when module list fetching logic is succesful', () => {
			// Arrange
			const modules = [
				{
					id: '1',
					name: 'Dummy module 1',
					subjectId: 'abcd',
				},
				{
					id: '2',
					name: 'Dummy module 2',
					subjectId: 'abcd',
				},
			];

			const httpResponse = {
				status: 200,
				body: { modules, totalCount: 2 },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/modules/by-subject/abcd`, httpResponse);

			const expectedActions = [
				{ type: modulesActions.ActionTypes.FETCH_MODULE_LIST_REQUEST },
				{ type: modulesActions.ActionTypes.FETCH_MODULE_LIST_SUCCESS, payload: { modules, totalCount: 2 } },
			];

			// Act & assert
			return store.dispatch(modulesActions.fetchModuleListBySubjectId('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_MODULE_LIST_FAILURE action when module list fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/modules/by-subject/abcd`, httpResponse);

			const expectedActions = [
				{ type: modulesActions.ActionTypes.FETCH_MODULE_LIST_REQUEST },
				{
					type: modulesActions.ActionTypes.FETCH_MODULE_LIST_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(modulesActions.fetchModuleListBySubjectId('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Module creation', () => {
		it('should create a CREATE_MODULE_REQUEST action when module creation logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: modulesActions.ActionTypes.CREATE_MODULE_REQUEST },
			];

			// Act
			store.dispatch(modulesActions.createModule({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a CREATE_MODULE_SUCCESS action when module creation logic is successfult', () => {
			// Arrange
			const moduleData = {
				name: 'Dummy module 7',
				subjectId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { module: { ...moduleData, id: '7' } },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/modules`, httpResponse);

			const expectedActions = [
				{ type: modulesActions.ActionTypes.CREATE_MODULE_REQUEST },
				{
					type: modulesActions.ActionTypes.CREATE_MODULE_SUCCESS,
					payload: { module: { ...moduleData, id: '7' } },
				},
			];

			// Act & assert
			store.dispatch(modulesActions.createModule(moduleData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a CREATE_MODULE_FAILURE action when module creation logic has failed', () => {
			// Arrange
			const moduleData = {
				name: 'Dummy module 7',
				subjectId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/modules`, httpResponse);

			const expectedActions = [
				{ type: modulesActions.ActionTypes.CREATE_MODULE_REQUEST },
				{
					type: modulesActions.ActionTypes.CREATE_MODULE_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(modulesActions.createModule(moduleData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
