import progressionReducer from 'redux/reducers/progression';
import { ActionTypes } from 'redux/actions/progression';

describe('Progression reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('initial state', () => {
		it('should return initial progression state', () => {
			const action = { type: 'dummy_action' };

			return expect(progressionReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('single Progression fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_PROGRESSION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_PROGRESSION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = progressionReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_PROGRESSION_SUCCESS', () => {
			// Arrange
			const fetchedProgression = { id: 'ijkl', name: 'Expected dummy Progression' };

			const action = {
				type: ActionTypes.FETCH_PROGRESSION_SUCCESS,
				payload: { progression: fetchedProgression },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', name: 'First dummy Progression' },
					{ id: 'efgh', name: 'Second dummy Progression' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedProgression],
				totalCount: 1,
			};

			// Act
			const result = progressionReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_PROGRESSION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_PROGRESSION_FAILURE,
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
			const result = progressionReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Progression list fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_PROGRESSION_LIST_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_PROGRESSION_LIST_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = progressionReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items and totalCount fields with payload data when receiving FETCH_PROGRESSION_LIST_SUCCESS', () => {
			// Arrange
			const fetchedProgression = [
				{
					id: '3',
					name: 'Dummy Progression 3',
					subjectId: 'efgh',
				},
				{
					id: '4',
					name: 'Dummy Progression 4',
					subjectId: 'efgh',
				},
				{
					id: '5',
					name: 'Dummy Progression 5',
					subjectId: 'efgh',
				},
			];

			const action = {
				type: ActionTypes.FETCH_PROGRESSION_LIST_SUCCESS,
				payload: { progressionList: fetchedProgression, totalCount: 3 },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: '1', name: 'Dummy Progression 1', subjectId: 'efgh' },
					{ id: '2', name: 'Dummy Progression 2', subjectId: 'efgh' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [...fetchedProgression],
				totalCount: 3,
			};

			// Act
			const result = progressionReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_PROGRESSION_LIST_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_PROGRESSION_LIST_FAILURE,
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
			const result = progressionReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Progression edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_PROGRESSION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_PROGRESSION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = progressionReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_PROGRESSION_SUCCESS', () => {
			// Arrange
			const udpatedProgression = { id: 'dummy_Progression_id', title: 'Dummy_Progression_title', subjectId: 'dummy_subject_id' };

			const action = {
				type: ActionTypes.UPDATE_PROGRESSION_SUCCESS,
				payload: { progression: udpatedProgression },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false, items: [udpatedProgression], totalCount: 1 };

			// Act
			const result = progressionReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_PROGRESSION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_PROGRESSION_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = progressionReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Progression list clearing', () => {
		it('should clear the stored Progression list when receiving CLEAR_PROGRESSION_LIST', () => {
			// Arrange
			const action = { type: ActionTypes.CLEAR_PROGRESSION_LIST };

			const temporaryState = {
				...initialState,
				items: [
					{ id: '1', name: 'Dummy Progression 1', subjectId: 'efgh' },
					{ id: '2', name: 'Dummy Progression 2', subjectId: 'efgh' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = progressionReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});
});
