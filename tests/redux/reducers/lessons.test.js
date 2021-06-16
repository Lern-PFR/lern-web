import lessonsReducer from 'redux/reducers/lessons';
import { ActionTypes } from 'redux/actions/lessons';

describe('Lessons reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('Initial state', () => {
		it('should return initial lessons state', () => {
			const action = { type: 'dummy_action' };

			return expect(lessonsReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('Single lesson fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_LESSON_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_LESSON_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = lessonsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_LESSON_SUCCESS', () => {
			// Arrange
			const fetchedLesson = { id: 'ijkl', name: 'Expected dummy lesson' };

			const action = {
				type: ActionTypes.FETCH_LESSON_SUCCESS,
				payload: { lesson: fetchedLesson },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', name: 'First dummy lesson' },
					{ id: 'efgh', name: 'Second dummy lesson' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedLesson],
				totalCount: 1,
			};

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_LESSON_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_LESSON_FAILURE,
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
			const result = lessonsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Lesson creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving CREATE_LESSON_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.CREATE_LESSON_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = lessonsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_LESSON_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_LESSON_SUCCESS,
				payload: { lesson: { id: '7', name: 'Dummy lesson 7', conceptId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_LESSON_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_LESSON_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Lesson edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_LESSON_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_LESSON_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = lessonsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_LESSON_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_LESSON_SUCCESS,
				payload: { lesson: { id: '7', name: 'Dummy lesson 7', conceptId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_LESSON_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_LESSON_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Lesson deletion actions', () => {
		it('should update the state\'s isLoading field to true when receiving DELETE_LESSON_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.DELETE_LESSON_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = lessonsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_LESSON_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_LESSON_SUCCESS,
				payload: { lesson: { id: '7', name: 'Dummy lesson 7', conceptId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_LESSON_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_LESSON_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Lesson list clearing', () => {
		it('should clear the stored lesson list when receiving CLEAR_LESSON_LIST', () => {
			// Arrange
			const action = { type: ActionTypes.CLEAR_LESSON_LIST };

			const temporaryState = {
				...initialState,
				items: [
					{ id: '1', name: 'Dummy lesson 1', conceptId: 'efgh' },
					{ id: '2', name: 'Dummy lesson 2', conceptId: 'efgh' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = lessonsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});
});
