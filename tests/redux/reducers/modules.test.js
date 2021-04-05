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

	describe('module list fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_MODULE_LIST_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_MODULE_LIST_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = modulesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items and totalCount fields with payload data when receiving FETCH_MODULE_LIST_SUCCESS', () => {
			// Arrange
			const fetchedModules = [
				{
					id: '3',
					name: 'Dummy module 3',
					subjectId: 'efgh',
				},
				{
					id: '4',
					name: 'Dummy module 4',
					subjectId: 'efgh',
				},
				{
					id: '5',
					name: 'Dummy module 5',
					subjectId: 'efgh',
				},
			];

			const action = {
				type: ActionTypes.FETCH_MODULE_LIST_SUCCESS,
				payload: { modules: fetchedModules, totalCount: 3 },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: '1', name: 'Dummy module 1', subjectId: 'efgh' },
					{ id: '2', name: 'Dummy module 2', subjectId: 'efgh' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [...fetchedModules],
				totalCount: 3,
			};

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_MODULE_LIST_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_MODULE_LIST_FAILURE,
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

	describe('module creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving CREATE_MODULE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.CREATE_MODULE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = modulesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_MODULE_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_MODULE_SUCCESS,
				payload: { module: { id: '7', name: 'Dummy module 7', subjectId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_MODULE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_MODULE_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('module edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_MODULE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_MODULE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = modulesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_MODULE_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_MODULE_SUCCESS,
				payload: { module: { id: '7', name: 'Dummy module 7', subjectId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_MODULE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_MODULE_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('module deletion actions', () => {
		it('should update the state\'s isLoading field to true when receiving DELETE_MODULE_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.DELETE_MODULE_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = modulesReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_MODULE_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_MODULE_SUCCESS,
				payload: { module: { id: '7', name: 'Dummy module 7', subjectId: 'abcd' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of DELETE_MODULE_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.DELETE_MODULE_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Module list clearing', () => {
		it('should clear the stored module list when receiving CLEAR_MODULE_LIST', () => {
			// Arrange
			const action = { type: ActionTypes.CLEAR_MODULE_LIST };

			const temporaryState = {
				...initialState,
				items: [
					{ id: '1', name: 'Dummy module 1', subjectId: 'efgh' },
					{ id: '2', name: 'Dummy module 2', subjectId: 'efgh' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				items: [],
				totalCount: 0,
			};

			// Act
			const result = modulesReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});
});
