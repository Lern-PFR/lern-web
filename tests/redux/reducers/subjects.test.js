import subjectsReducer from 'redux/reducers/subjects';
import { ActionTypes } from 'redux/actions/subjects';

describe('Subjects reducer', () => {
	const initialState = {
		isLoading: false,
		items: [],
		totalCount: 0,
	};

	describe('Initial state', () => {
		it('should return the initial subjects state', () => {
			const action = { type: 'dummy_action' };

			expect(subjectsReducer(undefined, action)).toEqual(initialState);
		});
	});

	describe('Single subject fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_SUBJECT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_SUBJECT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = subjectsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items field to a single entry array when receiving FETCH_SUBJECT_SUCCESS', () => {
			// Arrange
			const fetchedSubject = { id: 'ijkl', name: 'Why not testing your code makes you a bad person' };

			const action = {
				type: ActionTypes.FETCH_SUBJECT_SUCCESS,
				payload: { subject: fetchedSubject },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', name: 'An introduction to JSDoc' },
					{ id: 'efgh', name: 'The tabs or spaces dilemma' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [fetchedSubject],
				totalCount: 1,
			};

			// Act
			const result = subjectsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_SUBJECT_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_SUBJECT_FAILURE,
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
			const result = subjectsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Subject list fetching actions', () => {
		it('should update the state\'s isLoading field to true when receiving FETCH_SUBJECT_LIST_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.FETCH_SUBJECT_LIST_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = subjectsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s items and totalCount fields with payload data when receiving FETCH_SUBJECT_LIST_SUCCESS', () => {
			// Arrange
			const fetchedSubjects = [
				{ id: 'ijkl', name: 'Why not testing your code makes you a bad person' },
				{ id: 'mnop', name: 'ECMAScript 2018 operators to save the day' },
				{ id: 'qrst', name: '15 to stop using PHP - the fourth one will blow your mind!' },
			];

			const action = {
				type: ActionTypes.FETCH_SUBJECT_LIST_SUCCESS,
				payload: { subjects: fetchedSubjects, totalCount: 3 },
			};

			const temporaryState = {
				...initialState,
				isLoading: true,
				items: [
					{ id: 'abcd', name: 'An introduction to JSDoc' },
					{ id: 'efgh', name: 'The tabs or spaces dilemma' },
				],
				totalCount: 2,
			};

			const expectedState = {
				...initialState,
				isLoading: false,
				items: [...fetchedSubjects],
				totalCount: 3,
			};

			// Act
			const result = subjectsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving FETCH_SUBJECT_LIST_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.FETCH_SUBJECT_LIST_FAILURE,
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
			const result = subjectsReducer(temporaryState, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});
	});

	describe('Subject creation actions', () => {
		it('should update the state\'s isLoading field to true when receiving CREATE_SUBJECT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.CREATE_SUBJECT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = subjectsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_SUBJECT_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_SUBJECT_SUCCESS,
				payload: { subject: { id: 'abcd', name: 'Dummy subject' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = subjectsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of CREATE_SUBJECT_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.CREATE_SUBJECT_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = subjectsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Subject edition actions', () => {
		it('should update the state\'s isLoading field to true when receiving UPDATE_SUBJECT_REQUEST', () => {
			// Arrange
			const action = { type: ActionTypes.UPDATE_SUBJECT_REQUEST };

			const expectedState = {
				...initialState,
				isLoading: true,
			};

			// Act
			const result = subjectsReducer(undefined, action);

			// Assert
			return expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_SUBJECT_SUCCESS', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_SUBJECT_SUCCESS,
				payload: { subject: { id: 'abcd', name: 'Dummy subject' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = subjectsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});

		it('should update the state\'s isLoading field to false when receiving of UPDATE_SUBJECT_FAILURE', () => {
			// Arrange
			const action = {
				type: ActionTypes.UPDATE_SUBJECT_FAILURE,
				payload: { error: { status: 500, message: 'Internal Server Error' } },
			};

			const temporaryState = { ...initialState, isLoading: true };
			const expectedState = { ...initialState, isLoading: false };

			// Act
			const result = subjectsReducer(temporaryState, action);

			// Assert
			expect(result).toEqual(expectedState);
		});
	});

	describe('Subject deletion actions', () => {
		describe('Subject edition actions', () => {
			it('should update the state\'s isLoading field to true when receiving DELETE_SUBJECT_REQUEST', () => {
				// Arrange
				const action = { type: ActionTypes.DELETE_SUBJECT_REQUEST };

				const expectedState = {
					...initialState,
					isLoading: true,
				};

				// Act
				const result = subjectsReducer(undefined, action);

				// Assert
				return expect(result).toEqual(expectedState);
			});

			it('should update the state\'s isLoading field to false when receiving of DELETE_SUBJECT_SUCCESS', () => {
				// Arrange
				const action = {
					type: ActionTypes.DELETE_SUBJECT_SUCCESS,
					payload: { subject: { id: 'abcd', name: 'Dummy subject' } },
				};

				const temporaryState = { ...initialState, isLoading: true };
				const expectedState = { ...initialState, isLoading: false };

				// Act
				const result = subjectsReducer(temporaryState, action);

				// Assert
				expect(result).toEqual(expectedState);
			});

			it('should update the state\'s isLoading field to false when receiving of DELETE_SUBJECT_FAILURE', () => {
				// Arrange
				const action = {
					type: ActionTypes.DELETE_SUBJECT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				};

				const temporaryState = { ...initialState, isLoading: true };
				const expectedState = { ...initialState, isLoading: false };

				// Act
				const result = subjectsReducer(temporaryState, action);

				// Assert
				expect(result).toEqual(expectedState);
			});
		});
	});
});
