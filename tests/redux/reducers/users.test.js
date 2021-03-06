import usersReducer from 'redux/reducers/users';
import { ActionTypes } from 'redux/actions/users';

describe('Users reducer', () => {
	const initialState = {
		currentUser: null,
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('initial state', () => {
		it('should return initial user state', () => {
			const action = { type: 'dummy_action' };

			return expect(usersReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('user login actions', () => {
		it('should update the state\'s isLoading field to true when receiving LOGIN_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.LOGIN_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = usersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving LOGIN_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.LOGIN_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state with new user data when receiving LOGIN_SUCCESS', () => {
			// Arrange
			const user = { id: 'abcd', username: 'abcd' };

			const action = {
				type: ActionTypes.LOGIN_SUCCESS,
				payload: {
					user,
				},
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				currentUser: user,
				items: [user],
				totalCount: 1,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state with currentUser data when receiving LOGIN_TOKEN_SUCCESS', () => {
			// Arrange
			const user = { id: 'abcd', username: 'abcd' };

			const action = {
				type: ActionTypes.LOGIN_TOKEN_SUCCESS,
				payload: {
					user,
				},
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				currentUser: user,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('user signup actions', () => {
		it('should update the state\'s isLoading field to true when receiving SIGNUP_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.SIGNUP_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = usersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving SIGNUP_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.SIGNUP_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving SIGNUP_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.SIGNUP_SUCCESS,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('single user fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_USER_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_USER_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = usersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_USER_SUCCESS', () => {
			// Arrange
			const fetchedUser = { id: 'ijkl', username: 'SimpleJack' };

			const action = {
				type: ActionTypes.FETCH_USER_SUCCESS,
				payload: { user: fetchedUser },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', username: 'johnDoe' },
					{ id: 'efgh', username: 'janeDoe' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedUser],
				totalCount: 1,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_USER_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_USER_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('user list fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_USER_LIST_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_USER_LIST_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = usersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items and totalCount fields with payload data when receiving FETCH_USER_LIST_SUCCESS', () => {
			// Arrange
			const fetchedUsers = [
				{ id: 'ijkl', username: 'SimpleJack' },
				{ id: 'mnop', username: 'NewSheriffInTown' },
				{ id: 'qrst', username: 'aBoyUpToNoGood' },
			];

			const action = {
				type: ActionTypes.FETCH_USER_LIST_SUCCESS,
				payload: { users: fetchedUsers, totalCount: 3 },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', username: 'johnDoe' },
					{ id: 'efgh', username: 'janeDoe' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [...fetchedUsers],
				totalCount: 3,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_USER_LIST_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_USER_LIST_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('user update actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_USER_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_USER_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = usersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving UPDATE_USER_SUCCESS', () => {
			// Arrange
			const fetchedUser = { id: 'ijkl', username: 'SimpleJack' };

			const action = {
				type: ActionTypes.UPDATE_USER_SUCCESS,
				payload: { user: fetchedUser },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving UPDATE_USER_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_USER_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('user logout actions', () => {
		it('should update the state\'s isLoading field to true when receiving LOGOUT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.LOGOUT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = usersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should remove all data related to previous user when receiving LOGOUT_SUCCESS', () => {
			// Arrange
			const user = { id: 'abcd', username: 'abcd' };

			const action = { type: ActionTypes.LOGOUT_SUCCESS };

			const temporaryState = {
				...initialState,
				isLoading: false,
				currentUser: user,
				items: [user],
				totalCount: 1,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				currentUser: null,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = usersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});
});
