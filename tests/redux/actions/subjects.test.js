import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as subjectsActions from 'redux/actions/subjects';
import { baseUrl } from 'lib/shared/http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	subjects: {
		isLoading: false,
		items: [],
		totalCount: 0,
	},
};

describe('Subject-related actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('Specific subject fetching', () => {
		it('should create a FETCH_SUBJECT_REQUEST action when subject fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: subjectsActions.ActionTypes.FETCH_SUBJECT_REQUEST },
			];

			// Act
			store.dispatch(subjectsActions.fetchSubject('abcd'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_SUBJECT_SUCCESS action when subject fetching logic is successful', () => {
			// Arrange
			const subject = {
				id: 'abcd',
				name: 'Dummy subject',
			};

			const httpResponse = {
				status: 200,
				body: { subject },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/subjects/${subject.id}`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.FETCH_SUBJECT_REQUEST },
				{ type: subjectsActions.ActionTypes.FETCH_SUBJECT_SUCCESS, payload: { subject } },
			];

			// Act & assert
			store.dispatch(subjectsActions.fetchSubject(subject.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a FETCH_SUBJECT_FAILURE action when subject fetching logic has failed', () => {
			// Arrange
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/subjects/abcd`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.FETCH_SUBJECT_REQUEST },
				{
					type: subjectsActions.ActionTypes.FETCH_SUBJECT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(subjectsActions.fetchSubject('abcd'))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
