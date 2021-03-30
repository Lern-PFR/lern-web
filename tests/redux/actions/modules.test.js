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
});
