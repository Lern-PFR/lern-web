import userAnswersReducer from 'redux/reducers/userAnswers';
import { ActionTypes } from 'redux/actions/userAnswers';

describe('User answers reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
	};

	describe('initial state', () => {
		it('should return initial modules state', () => {
			const action = { type: 'dummy_action' };

			return expect(userAnswersReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('User answer creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving USER_ANSWER_CREATION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.USER_ANSWER_CREATION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = userAnswersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving USER_ANSWER_CREATION_SUCCESS', () => {
			// Arrange
			const action = { type: ActionTypes.USER_ANSWER_CREATION_SUCCESS };

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = userAnswersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving USER_ANSWER_CREATION_FAILURE', () => {
			// Arrange
			const action = { type: ActionTypes.USER_ANSWER_CREATION_FAILURE };

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = userAnswersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('User answer retrieval actions', () => {
		it('should update the state\'s isLoading field to true when receiving USER_ANSWER_FETCH_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.USER_ANSWER_FETCH_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = userAnswersReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving USER_ANSWER_FETCH_FAILURE', () => {
			// Arrange
			const action = { type: ActionTypes.USER_ANSWER_FETCH_FAILURE };

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
			};

			// Act
			const result = userAnswersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false and the items field with the payload content when receiving USER_ANSWER_FETCH_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.USER_ANSWER_FETCH_SUCCESS,
				payload: {
					answer: {
						question: {
							id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
							answers: [],
						},
						answerId: 'dummy_answer_id',
						answer: {},
					},
				},
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [action.payload.answer],
			};

			// Act
			const result = userAnswersReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});
});
