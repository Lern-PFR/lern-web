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

	describe('Specific user fetching', () => {
		it('should create a FETCH_USER_REQUEST action when user fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: usersActions.ActionTypes.FETCH_USER_REQUEST },
			];

			// Act
			store.dispatch(usersActions.fetchUser('abcd'));

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_USER_SUCCESS action when user fetching logic is succesful', () => {
			// Arrange
			const user = {
				id: 'abcd',
				username: 'JohnDoe',
			};

			const httpResponse = {
				status: 200,
				body: { user },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/users/${user.id}`, httpResponse);

			const expectedActions = [
				{ type: usersActions.ActionTypes.FETCH_USER_REQUEST },
				{ type: usersActions.ActionTypes.FETCH_USER_SUCCESS, payload: { user } },
			];

			// Act & assert
			return store.dispatch(usersActions.fetchUser(user.id))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_USER_FAILURE action when user fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/users/abcd`, httpResponse);

			const expectedActions = [
				{ type: usersActions.ActionTypes.FETCH_USER_REQUEST },
				{
					type: usersActions.ActionTypes.FETCH_USER_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(usersActions.fetchUser('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('User list fetching', () => {
		it('should create a FETCH_USER_LIST_REQUEST action when user list fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: usersActions.ActionTypes.FETCH_USER_LIST_REQUEST },
			];

			// Act
			store.dispatch(usersActions.fetchUserList());

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_USER_LIST_SUCCESS action when user list fetching logic is succesful', () => {
			// Arrange
			const fetchedUsers = [
				{ id: 'abcd', username: 'JohnDoe' },
				{ id: 'efgh', username: 'JaneDoe' },
			];

			const httpResponse = {
				status: 200,
				body: {
					users: fetchedUsers,
					totalCount: 2,
				},
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/users`, httpResponse);

			const expectedActions = [
				{ type: usersActions.ActionTypes.FETCH_USER_LIST_REQUEST },
				{
					type: usersActions.ActionTypes.FETCH_USER_LIST_SUCCESS,
					payload: { users: fetchedUsers, totalCount: 2 },
				},
			];

			// Act & assert
			return store.dispatch(usersActions.fetchUserList())
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_USER_LIST_FAILURE action when user list fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/users`, httpResponse);

			const expectedActions = [
				{ type: usersActions.ActionTypes.FETCH_USER_LIST_REQUEST },
				{
					type: usersActions.ActionTypes.FETCH_USER_LIST_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(usersActions.fetchUserList())
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
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