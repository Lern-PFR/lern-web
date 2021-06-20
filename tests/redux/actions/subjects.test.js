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
				body: subject,
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

	describe('Subject list fetching', () => {
		it('should create a FETCH_SUBJECT_LIST_REQUEST action when subject list fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: subjectsActions.ActionTypes.FETCH_SUBJECT_LIST_REQUEST },
			];

			// Act
			store.dispatch(subjectsActions.fetchSubjectList());

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_SUBJECT_LIST_SUCCESS action when subject list fetching logic is successful', () => {
			// Arrange
			const fetchedSubjects = [
				{ id: 'abcd', name: 'Dummy subject 1' },
				{ id: 'efgh', name: 'Dummy subject 2' },
			];

			const httpResponse = {
				status: 200,
				body: fetchedSubjects,
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/subjects`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.FETCH_SUBJECT_LIST_REQUEST },
				{
					type: subjectsActions.ActionTypes.FETCH_SUBJECT_LIST_SUCCESS,
					payload: { subjects: fetchedSubjects, totalCount: 2 },
				},
			];

			// Act & assert
			store.dispatch(subjectsActions.fetchSubjectList())
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a FETCH_SUBJECT_LIST_FAILURE action when subject list fetching logic has failed', () => {
			// Arrange
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/subjects`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.FETCH_SUBJECT_LIST_REQUEST },
				{
					type: subjectsActions.ActionTypes.FETCH_SUBJECT_LIST_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(subjectsActions.fetchSubjectList())
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Subject creation', () => {
		it('should create a CREATE_SUBJECT_REQUEST action when subject creation logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: subjectsActions.ActionTypes.CREATE_SUBJECT_REQUEST },
			];

			// Act
			store.dispatch(subjectsActions.createSubject({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a CREATE_SUBJECT_SUCCESS action when subject creation logic is successfult', () => {
			// Arrange
			const subjectData = {
				name: 'Dummy subject',
			};

			const httpResponse = {
				status: 200,
				body: { ...subjectData, id: 'abcd' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/subjects`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.CREATE_SUBJECT_REQUEST },
				{
					type: subjectsActions.ActionTypes.CREATE_SUBJECT_SUCCESS,
					payload: { subject: { ...subjectData, id: 'abcd' } },
				},
			];

			// Act & assert
			store.dispatch(subjectsActions.createSubject(subjectData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a CREATE_SUBJECT_FAILURE action when subject creation logic has failed', () => {
			// Arrange
			const subjectData = {
				name: 'Dummy subject',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/subjects`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.CREATE_SUBJECT_REQUEST },
				{
					type: subjectsActions.ActionTypes.CREATE_SUBJECT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(subjectsActions.createSubject(subjectData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Subject edition', () => {
		it('should create an UPDATE_SUBJECT_REQUEST action when subject edition logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: subjectsActions.ActionTypes.UPDATE_SUBJECT_REQUEST },
			];

			// Act
			store.dispatch(subjectsActions.updateSubject({}, 'abcd'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an UPDATE_SUBJECT_SUCCESS action when subject edition logic is successful', () => {
			// Arrange
			const subjectData = {
				id: 'abcd',
				name: 'Dummy subject',
			};

			const httpResponse = {
				status: 200,
				body: { ...subjectData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.put(`${baseUrl}/api/subjects/${subjectData.id}`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.UPDATE_SUBJECT_REQUEST },
				{
					type: subjectsActions.ActionTypes.UPDATE_SUBJECT_SUCCESS,
					payload: { subject: subjectData },
				},
			];

			// Act & assert
			store.dispatch(subjectsActions.updateSubject(subjectData, subjectData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an UPDATE_SUBJECT_FAILURE action when subject edition logic has failed', () => {
			// Arrange
			const subjectData = {
				id: 'abcd',
				name: 'Dummy subject',
			};

			const httpResponse = { status: 500 };

			fetchMock.put(`${baseUrl}/api/subjects/${subjectData.id}`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.UPDATE_SUBJECT_REQUEST },
				{
					type: subjectsActions.ActionTypes.UPDATE_SUBJECT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(subjectsActions.updateSubject(subjectData, subjectData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Subject deletion', () => {
		it('should create a DELETE_SUBJECT_REQUEST action when subject deletion logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: subjectsActions.ActionTypes.DELETE_SUBJECT_REQUEST },
			];

			// Act
			store.dispatch(subjectsActions.deleteSubject('abcd'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a DELETE_SUBJECT_SUCCESS action when subject deletion logic is successful', () => {
			// Arrange
			const subjectData = {
				id: 'abcd',
				name: 'Dummy subject',
			};

			const httpResponse = {
				status: 200,
				body: { subject: subjectData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.delete(`${baseUrl}/api/subjects/${subjectData.id}`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.DELETE_SUBJECT_REQUEST },
				{
					type: subjectsActions.ActionTypes.DELETE_SUBJECT_SUCCESS,
					payload: { subject: subjectData },
				},
			];

			// Act & assert
			return store.dispatch(subjectsActions.deleteSubject(subjectData.id))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a DELETE_SUBJECT_FAILURE action when subject deletion logic has failed', () => {
			// Arrange
			const httpResponse = { status: 500 };

			fetchMock.delete(`${baseUrl}/api/subjects/abcd`, httpResponse);

			const expectedActions = [
				{ type: subjectsActions.ActionTypes.DELETE_SUBJECT_REQUEST },
				{
					type: subjectsActions.ActionTypes.DELETE_SUBJECT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(subjectsActions.deleteSubject('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Subject list clearing', () => {
		it('should create a CLEAR_SUBJECT_LIST action when subject list clearing logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: subjectsActions.ActionTypes.CLEAR_SUBJECT_LIST },
			];

			// Act
			store.dispatch(subjectsActions.clearSubjectList());

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
