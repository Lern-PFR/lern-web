import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as conceptsActions from 'redux/actions/concepts';
import { baseUrl } from 'lib/shared/http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	concepts: {
		isLoading: false,
		items: [],
		totalCount: 0,
	},
};

describe('Concept-related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('Specific concepts fetching', () => {
		it('should create a FETCH_CONCEPT_REQUEST action when the concept fetching logic is initialized.', () => {
			// Arrange
			const expectedActions = [
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_REQUEST },
			];

			// Act
			store.dispatch(conceptsActions.fetchConcept('abcd'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_CONCEPT_SUCCESS action when the concept fetching logic is successful.', () => {
			// Arrange
			const concept = {
				id: 'abcd',
				name: 'Dummy concept',
			};

			const httpResponse = {
				status: 200,
				body: { concept },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/concepts/${concept.id}`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_REQUEST },
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_SUCCESS, payload: { concept } },
			];

			// Act & assert
			store.dispatch(conceptsActions.fetchConcept('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_CONCEPT_FAILURE action when the concept fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/concepts/abcd`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_REQUEST },
				{
					type: conceptsActions.ActionTypes.FETCH_CONCEPT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(conceptsActions.fetchConcept('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Concept list fetching', () => {
		it('should create a FETCH_CONCEPT_LIST_REQUEST action when the concept list fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_LIST_REQUEST },
			];

			// Act
			store.dispatch(conceptsActions.fetchConceptListByModuleId('abcd'));

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_CONCEPT_LIST_SUCCESS action when the concept list fetching logic is succesful', () => {
			// Arrange
			const concepts = [
				{
					id: '1',
					name: 'Dummy concept 1',
					moduleId: 'abcd',
				},
				{
					id: '2',
					name: 'Dummy concept 2',
					moduleId: 'abcd',
				},
			];

			const httpResponse = {
				status: 200,
				body: { concepts, totalCount: 2 },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/concepts/by-module/abcd`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_LIST_REQUEST },
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_LIST_SUCCESS, payload: { concepts, totalCount: 2 } },
			];

			// Act & assert
			return store.dispatch(conceptsActions.fetchConceptListByModuleId('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_CONCEPT_LIST_FAILURE action when the concept list fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/concepts/by-module/abcd`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.FETCH_CONCEPT_LIST_REQUEST },
				{
					type: conceptsActions.ActionTypes.FETCH_CONCEPT_LIST_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(conceptsActions.fetchConceptListByModuleId('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Concept creation', () => {
		it('should create a CREATE_CONCEPT_REQUEST action when the concept creation logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: conceptsActions.ActionTypes.CREATE_CONCEPT_REQUEST },
			];

			// Act
			store.dispatch(conceptsActions.createConcept({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a CREATE_CONCEPT_SUCCESS action when the concept creation logic is successful', () => {
			// Arrange
			const conceptData = {
				name: 'Dummy concept 7',
				moduleId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { concept: { ...conceptData, id: '7' } },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/concepts`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.CREATE_CONCEPT_REQUEST },
				{
					type: conceptsActions.ActionTypes.CREATE_CONCEPT_SUCCESS,
					payload: { concept: { ...conceptData, id: '7' } },
				},
			];

			// Act & assert
			store.dispatch(conceptsActions.createConcept(conceptData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a CREATE_CONCEPT_FAILURE action when the concept creation logic has failed', () => {
			// Arrange
			const conceptData = {
				name: 'Dummy concept 7',
				moduleId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/concepts`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.CREATE_CONCEPT_REQUEST },
				{
					type: conceptsActions.ActionTypes.CREATE_CONCEPT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(conceptsActions.createConcept(conceptData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Concept edition', () => {
		it('should create an UPDATE_CONCEPT_REQUEST action when the concept edition logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: conceptsActions.ActionTypes.UPDATE_CONCEPT_REQUEST },
			];

			// Act
			store.dispatch(conceptsActions.updateConcept({}, '7'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an UPDATE_CONCEPT_SUCCESS action when the concept edition logic is successful', () => {
			// Arrange
			const conceptData = {
				id: '7',
				name: 'Dummy concept 7',
				moduleId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { concept: conceptData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.put(`${baseUrl}/api/concepts/${conceptData.id}`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.UPDATE_CONCEPT_REQUEST },
				{
					type: conceptsActions.ActionTypes.UPDATE_CONCEPT_SUCCESS,
					payload: { concept: conceptData },
				},
			];

			// Act & assert
			store.dispatch(conceptsActions.updateConcept(conceptData, conceptData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an UPDATE_CONCEPT_FAILURE action when the concept edition logic has failed', () => {
			// Arrange
			const conceptData = {
				id: '7',
				name: 'Dummy concept 7',
				moduleId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.put(`${baseUrl}/api/concepts/${conceptData.id}`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.UPDATE_CONCEPT_REQUEST },
				{
					type: conceptsActions.ActionTypes.UPDATE_CONCEPT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(conceptsActions.updateConcept(conceptData, conceptData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Concept deletion', () => {
		it('should create an DELETE_CONCEPT_REQUEST action when the concept deletion logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: conceptsActions.ActionTypes.DELETE_CONCEPT_REQUEST },
			];

			// Act
			store.dispatch(conceptsActions.deleteConcept('7'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an DELETE_CONCEPT_SUCCESS action when the concept edition logic is successful', () => {
			// Arrange
			const conceptData = {
				id: '7',
				name: 'Dummy concept 7',
				moduleId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { concept: conceptData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.delete(`${baseUrl}/api/concepts/${conceptData.id}`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.DELETE_CONCEPT_REQUEST },
				{
					type: conceptsActions.ActionTypes.DELETE_CONCEPT_SUCCESS,
					payload: { concept: conceptData },
				},
			];

			// Act & assert
			store.dispatch(conceptsActions.deleteConcept(conceptData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an DELETE_CONCEPT_FAILURE action when the concept deletion logic has failed', () => {
			// Arrange
			const conceptData = {
				id: '7',
				name: 'Dummy concept 7',
				moduleId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.delete(`${baseUrl}/api/concepts/${conceptData.id}`, httpResponse);

			const expectedActions = [
				{ type: conceptsActions.ActionTypes.DELETE_CONCEPT_REQUEST },
				{
					type: conceptsActions.ActionTypes.DELETE_CONCEPT_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(conceptsActions.deleteConcept(conceptData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Notion list clearing', () => {
		it('should create a CLEAR_CONCEPT_LIST action when the concept list clearing logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: conceptsActions.ActionTypes.CLEAR_CONCEPT_LIST },
			];

			// Act
			store.dispatch(conceptsActions.clearConceptList());

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});