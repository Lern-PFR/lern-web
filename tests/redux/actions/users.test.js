import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as usersActions from 'redux/actions/users';
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

describe('User-related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('User login', () => {
		it('sould create a LOGIN_REQUEST action when user login logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: usersActions.ActionTypes.LOGIN_REQUEST },
			];
			const credentials = {
				username: 'abcd',
				password: 'efgh',
			};

			// Act
			store.dispatch(usersActions.login(credentials.username, credentials.password));

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('sould create a LOGIN_SUCCESS action when user login logic is successful', () => {
			// Arrange
			const userData = {
				id: 'userId',
				username: 'abcd',
				password: 'efgh',
			};

			const httpResponse = {
				status: 200,
				body: {
					user: {
						id: userData.id,
						username: userData.username,
					},
				},
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/login`, httpResponse);

			const expectedActions = [
				{ type: usersActions.ActionTypes.LOGIN_REQUEST },
				{
					type: usersActions.ActionTypes.LOGIN_SUCCESS,
					payload: { user: { id: userData.id, username: userData.username } },
				},
			];

			// Act & assert
			return store.dispatch(usersActions.login(userData.username, userData.password))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('sould create a LOGIN_FAILURE action when user login logic has failed', () => {
			// Arrange
			const userData = {
				id: 'userId',
				username: 'abcd',
				password: 'efgh',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/login`, httpResponse);

			const expectedActions = [
				{ type: usersActions.ActionTypes.LOGIN_REQUEST },
				{
					type: usersActions.ActionTypes.LOGIN_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(usersActions.login(userData.username, userData.password))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('User logout', () => {
		it('should create a LOGOUT_REQUEST and LOGOUT_SUCCESS action upon logout process initialization', () => {
			// Arrange
			const expectedActions = [
				{ type: usersActions.ActionTypes.LOGOUT_REQUEST },
				{ type: usersActions.ActionTypes.LOGOUT_SUCCESS },
			];

			// Act
			store.dispatch(usersActions.logout());

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
