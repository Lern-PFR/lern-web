import conceptsReducer from 'redux/reducers/concepts';
import { ActionTypes } from 'redux/actions/concepts';

describe('Concepts reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('Initial state', () => {
		it('should return initial concepts state', () => {
			const action = { type: 'dummy_action' };

			return expect(conceptsReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('Single concept fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_CONCEPT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_CONCEPT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = conceptsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_CONCEPT_SUCCESS', () => {
			// Arrange
			const fetchedConcept = { id: 'ijkl', title: 'Expected dummy concept' };

			const action = {
				type: ActionTypes.FETCH_CONCEPT_SUCCESS,
				payload: { concept: fetchedConcept },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', title: 'First dummy concept' },
					{ id: 'efgh', title: 'Second dummy concept' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedConcept],
				totalCount: 1,
			};

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_CONCEPT_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_CONCEPT_FAILURE,
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
			const result = conceptsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Concept list fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_CONCEPT_LIST_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_CONCEPT_LIST_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = conceptsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items and totalCount fields with payload data when receiving FETCH_CONCEPT_LIST_SUCCESS', () => {
			// Arrange
			const fetchedConcepts = [
				{
					id: '3',
					title: 'Dummy concept 3',
					moduleId: 'efgh',
				},
				{
					id: '4',
					title: 'Dummy concept 4',
					moduleId: 'efgh',
				},
				{
					id: '5',
					title: 'Dummy concept 5',
					moduleId: 'efgh',
				},
			];

			const action = {
				type: ActionTypes.FETCH_CONCEPT_LIST_SUCCESS,
				payload: { concepts: fetchedConcepts, totalCount: 3 },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: '1', title: 'Dummy concept 1', moduleId: 'abcd' },
					{ id: '2', title: 'Dummy concept 2', moduleId: 'abcd' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [...fetchedConcepts],
				totalCount: 3,
			};

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_CONCEPT_LIST_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_CONCEPT_LIST_FAILURE,
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
			const result = conceptsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Concept creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving CREATE_CONCEPT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.CREATE_CONCEPT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = conceptsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_CONCEPT_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_CONCEPT_SUCCESS,
				payload: { concept: { id: '7', title: 'Dummy concept 7', moduleId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_CONCEPT_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_CONCEPT_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Concept edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_CONCEPT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_CONCEPT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = conceptsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_CONCEPT_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_CONCEPT_SUCCESS,
				payload: { concept: { id: '7', title: 'Dummy concept 7', moduleId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_CONCEPT_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_CONCEPT_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Concept deletion actions', () => {
		it('should update the state\'s isLoading field to true when receiving DELETE_CONCEPT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.DELETE_CONCEPT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = conceptsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_CONCEPT_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_CONCEPT_SUCCESS,
				payload: { concept: { id: '7', title: 'Dummy concept 7', moduleId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_CONCEPT_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_CONCEPT_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Concept list clearing', () => {
		it('should clear the stored concept list when receiving CLEAR_CONCEPT_LIST', () => {
			// Arrange
			const action = { type: ActionTypes.CLEAR_CONCEPT_LIST };

			const temporaryState = {
				...initialState,
				items: [
					{ id: '1', title: 'Dummy concept 1', moduleId: 'efgh' },
					{ id: '2', title: 'Dummy concept 2', moduleId: 'efgh' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = conceptsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});
});
