import notionsReducer from 'redux/reducers/notions';
import { ActionTypes } from 'redux/actions/notions';

describe('Notions reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('Initial state', () => {
		it('should return initial notions state', () => {
			const action = { type: 'dummy_action' };

			return expect(notionsReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('Single notion fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_NOTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_NOTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = notionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_NOTION_SUCCESS', () => {
			// Arrange
			const fetchedNotion = { id: 'ijkl', name: 'Expected dummy notion' };

			const action = {
				type: ActionTypes.FETCH_NOTION_SUCCESS,
				payload: { notion: fetchedNotion },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', name: 'First dummy notion' },
					{ id: 'efgh', name: 'Second dummy notion' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedNotion],
				totalCount: 1,
			};

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_NOTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_NOTION_FAILURE,
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
			const result = notionsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Notion list fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_NOTION_LIST_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_NOTION_LIST_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = notionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items and totalCount fields with payload data when receiving FETCH_NOTION_LIST_SUCCESS', () => {
			// Arrange
			const fetchedNotions = [
				{
					id: '3',
					name: 'Dummy notion 3',
					moduleId: 'efgh',
				},
				{
					id: '4',
					name: 'Dummy notion 4',
					moduleId: 'efgh',
				},
				{
					id: '5',
					name: 'Dummy notion 5',
					moduleId: 'efgh',
				},
			];

			const action = {
				type: ActionTypes.FETCH_NOTION_LIST_SUCCESS,
				payload: { notions: fetchedNotions, totalCount: 3 },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: '1', name: 'Dummy notion 1', moduleId: 'abcd' },
					{ id: '2', name: 'Dummy notion 2', moduleId: 'abcd' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [...fetchedNotions],
				totalCount: 3,
			};

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_NOTION_LIST_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_NOTION_LIST_FAILURE,
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
			const result = notionsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Notion creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving CREATE_NOTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.CREATE_NOTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = notionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_NOTION_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_NOTION_SUCCESS,
				payload: { notion: { id: '7', name: 'Dummy notion 7', moduleId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_NOTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_NOTION_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Notion edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_NOTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_NOTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = notionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_NOTION_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_NOTION_SUCCESS,
				payload: { notion: { id: '7', name: 'Dummy notion 7', moduleId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_NOTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_NOTION_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Notion deletion actions', () => {
		it('should update the state\'s isLoading field to true when receiving DELETE_NOTION_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.DELETE_NOTION_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = notionsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_NOTION_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_NOTION_SUCCESS,
				payload: { notion: { id: '7', name: 'Dummy notion 7', moduleId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_NOTION_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_NOTION_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Notion list clearing', () => {
		it('should clear the stored notion list when receiving CLEAR_NOTION_LIST', () => {
			// Arrange
			const action = { type: ActionTypes.CLEAR_NOTION_LIST };

			const temporaryState = {
				...initialState,
				items: [
					{ id: '1', name: 'Dummy notion 1', moduleId: 'efgh' },
					{ id: '2', name: 'Dummy notion 2', moduleId: 'efgh' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = notionsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});
});
