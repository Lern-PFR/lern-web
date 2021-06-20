import exercisesReducer from 'redux/reducers/exercises';
import { ActionTypes } from 'redux/actions/exercises';

describe('Exercises reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('Initial state', () => {
		it('should return initial exercises state', () => {
			const action = { type: 'dummy_action' };

			return expect(exercisesReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('Single exercise fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_EXERCISE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_EXERCISE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = exercisesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_EXERCISE_SUCCESS', () => {
			// Arrange
			const fetchedExercise = { id: 'dummy_exercise_id', title: 'dummy_exercise_title' };

			const action = {
				type: ActionTypes.FETCH_EXERCISE_SUCCESS,
				payload: { exercise: fetchedExercise },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', title: 'First dummy exercise' },
					{ id: 'efgh', title: 'Second dummy exercise' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedExercise],
				totalCount: 1,
			};

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_EXERCISE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_EXERCISE_FAILURE,
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
			const result = exercisesReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Exercise creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving CREATE_EXERCISE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.CREATE_EXERCISE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = exercisesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_EXERCISE_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_EXERCISE_SUCCESS,
				payload: { exercise: { id: 'dummy_exercise_id', title: 'dummy_exercise_title' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_EXERCISE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_EXERCISE_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Exercise edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_EXERCISE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_EXERCISE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = exercisesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_EXERCISE_SUCCESS', () => {
			const updatedExercise = { id: 'dummy_exercise_id', title: 'dummy_exercise_title' };
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_EXERCISE_SUCCESS,
				payload: { exercise: updatedExercise },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false, items: [updatedExercise], totalCount: 1 };

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_EXERCISE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_EXERCISE_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Exercise deletion actions', () => {
		it('should update the state\'s isLoading field to true when receiving DELETE_EXERCISE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.DELETE_EXERCISE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = exercisesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_EXERCISE_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_EXERCISE_SUCCESS,
				payload: { exercise: { id: 'dummy_exercise_id', title: 'dummy_exercise_title' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_EXERCISE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_EXERCISE_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Exercise list clearing', () => {
		it('should clear the stored concept list when receiving CLEAR_EXERCISE_LIST', () => {
			// Arrange
			const action = { type: ActionTypes.CLEAR_EXERCISE_LIST };

			const temporaryState = {
				...initialState,
				items: [
					{ id: 'dummy_exercise_id_1', title: 'dummy_exercise_title_1' },
					{ id: 'dummy_exercise_id_2', title: 'dummy_exercise_title_2' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = exercisesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});
});
