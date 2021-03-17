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
			expect(usersReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('user login actions', () => {
		it('should update state\'s isLoading field to true when receiving LOGIN_REQUEST', () => {
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

		it('should update state\'s isLoading field to false when receiving LOGIN_FAILURE', () => {
			// Arrange
			const action = { type: ActionTypes.LOGIN_FAILURE };

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

		it('should update state with new user data when receiving LOGIN_SUCCESS', () => {
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
	});

	describe('user logout actions', () => {
		it('should update state\'s isLoading field to true when receiving LOGOUT_REQUEST', () => {
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
