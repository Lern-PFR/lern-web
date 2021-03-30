import modulesReducer from 'redux/reducers/modules';
import { ActionTypes } from 'redux/actions/modules';

describe('Modules reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('initial state', () => {
		it('should return initial modules state', () => {
			const action = { type: 'dummy_action' };

			return expect(modulesReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('single module fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_MODULE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_MODULE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = modulesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_MODULE_SUCCESS', () => {
			// Arrange
			const fetchedModule = { id: 'ijkl', name: 'Expected dummy module' };

			const action = {
				type: ActionTypes.FETCH_MODULE_SUCCESS,
				payload: { module: fetchedModule },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', name: 'First dummy module' },
					{ id: 'efgh', name: 'Second dummy module' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedModule],
				totalCount: 1,
			};

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_MODULE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_MODULE_FAILURE,
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
			const result = modulesReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});
});
