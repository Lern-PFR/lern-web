import notionsReducer from 'redux/reducers/notions';
import { ActionTypes } from 'redux/actions/notions';

describe('Notions reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('initial state', () => {
		it('should return initial notions state', () => {
			const action = { type: 'dummy_action' };

			return expect(notionsReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('single notion fetching actions', () => {
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

	describe('notion list fetching actions', () => {
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
});
