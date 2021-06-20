import questionsReducer from 'redux/reducers/questions';
import { ActionTypes } from 'redux/actions/questions';

describe('Questions reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('Initial state', () => {
		it('should return initial questions state', () => {
			const action = { type: 'dummy_action' };

			return expect(questionsReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('Single questions fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_QUESTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_QUESTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = questionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_QUESTION_SUCCESS', () => {
			// Arrange
			const fetchedQuestion = { id: 'dummy_question_id', title: 'dummy_question_title' };

			const action = {
				type: ActionTypes.FETCH_QUESTION_SUCCESS,
				payload: { question: fetchedQuestion },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', title: 'First dummy question' },
				],
				totalCount: 1,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedQuestion],
				totalCount: 1,
			};

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_QUESTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_QUESTION_FAILURE,
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
			const result = questionsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Question creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving CREATE_QUESTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.CREATE_QUESTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = questionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_QUESTION_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_QUESTION_SUCCESS,
				payload: { question: { id: 'dummy_question_id', title: 'dummy_question_title' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_QUESTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_QUESTION_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Question edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_QUESTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_QUESTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = questionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_QUESTION_SUCCESS', () => {
			const updatedQuestion = { id: 'dummy_question_id', title: 'dummy_question_title' };
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_QUESTION_SUCCESS,
				payload: { question: updatedQuestion },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false, items: [updatedQuestion], totalCount: 1 };

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_QUESTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_QUESTION_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Question deletion actions', () => {
		it('should update the state\'s isLoading field to true when receiving DELETE_QUESTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.DELETE_QUESTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = questionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_QUESTION_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_QUESTION_SUCCESS,
				payload: { question: { id: 'dummy_question_id', title: 'dummy_question_title' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_QUESTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_QUESTION_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Exercise list clearing', () => {
		it('should clear the stored concept list when receiving CLEAR_QUESTION_LIST', () => {
			// Arrange
			const action = { type: ActionTypes.CLEAR_QUESTION_LIST };

			const temporaryState = {
				...initialState,
				items: [
					{ id: 'dummy_question_id', title: 'dummy_question_title' },
					{ id: 'dummy_question_id_bis', title: 'dummy_question_title' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = questionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});
});
