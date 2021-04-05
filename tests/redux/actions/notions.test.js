import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as notionsActions from 'redux/actions/notions';
import { baseUrl } from 'lib/shared/http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	notions: {
		isLoading: false,
		items: [],
		totalCount: 0,
	},
};

describe('Notion-related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('Specific notion fetching', () => {
		it('should create a FETCH_NOTION_REQUEST action when notion fetching logic is initialized.', () => {
			// Arrange
			const expectedActions = [
				{ type: notionsActions.ActionTypes.FETCH_NOTION_REQUEST },
			];

			// Act
			store.dispatch(notionsActions.fetchNotion('abcd'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_NOTION_SUCCESS action when notion fetching logic is successful.', () => {
			// Arrange
			const notion = {
				id: 'abcd',
				name: 'Dummy notion',
			};

			const httpResponse = {
				status: 200,
				body: { notion },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/notions/${notion.id}`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.FETCH_NOTION_REQUEST },
				{ type: notionsActions.ActionTypes.FETCH_NOTION_SUCCESS, payload: { notion } },
			];

			// Act & assert
			store.dispatch(notionsActions.fetchNotion('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_NOTION_FAILURE action when notion fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/notions/abcd`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.FETCH_NOTION_REQUEST },
				{
					type: notionsActions.ActionTypes.FETCH_NOTION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(notionsActions.fetchNotion('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Notion list fetching', () => {
		it('should create a FETCH_NOTION_LIST_REQUEST action when notion list fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: notionsActions.ActionTypes.FETCH_NOTION_LIST_REQUEST },
			];

			// Act
			store.dispatch(notionsActions.fetchNotionListByModuleId('abcd'));

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_NOTION_LIST_SUCCESS action when notion list fetching logic is succesful', () => {
			// Arrange
			const notions = [
				{
					id: '1',
					name: 'Dummy notion 1',
					moduleId: 'abcd',
				},
				{
					id: '2',
					name: 'Dummy notion 2',
					moduleId: 'abcd',
				},
			];

			const httpResponse = {
				status: 200,
				body: { notions, totalCount: 2 },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/notions/by-module/abcd`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.FETCH_NOTION_LIST_REQUEST },
				{ type: notionsActions.ActionTypes.FETCH_NOTION_LIST_SUCCESS, payload: { notions, totalCount: 2 } },
			];

			// Act & assert
			return store.dispatch(notionsActions.fetchNotionListByModuleId('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_NOTION_LIST_FAILURE action when notion list fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/notions/by-module/abcd`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.FETCH_NOTION_LIST_REQUEST },
				{
					type: notionsActions.ActionTypes.FETCH_NOTION_LIST_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(notionsActions.fetchNotionListByModuleId('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Notion creation', () => {
		it('should create a CREATE_NOTION_REQUEST action when notion creation logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: notionsActions.ActionTypes.CREATE_NOTION_REQUEST },
			];

			// Act
			store.dispatch(notionsActions.createNotion({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a CREATE_NOTION_SUCCESS action when notion creation logic is successful', () => {
			// Arrange
			const notionData = {
				name: 'Dummy notion 7',
				moduleId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { notion: { ...notionData, id: '7' } },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/notions`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.CREATE_NOTION_REQUEST },
				{
					type: notionsActions.ActionTypes.CREATE_NOTION_SUCCESS,
					payload: { notion: { ...notionData, id: '7' } },
				},
			];

			// Act & assert
			store.dispatch(notionsActions.createNotion(notionData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a CREATE_NOTION_FAILURE action when notion creation logic has failed', () => {
			// Arrange
			const notionData = {
				name: 'Dummy notion 7',
				subjectId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/notions`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.CREATE_NOTION_REQUEST },
				{
					type: notionsActions.ActionTypes.CREATE_NOTION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(notionsActions.createNotion(notionData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Notion edition', () => {
		it('should create an UPDATE_NOTION_REQUEST action when notion edition logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: notionsActions.ActionTypes.UPDATE_NOTION_REQUEST },
			];

			// Act
			store.dispatch(notionsActions.updateNotion({}, '7'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an UPDATE_NOTION_SUCCESS action when notion edition logic is successful', () => {
			// Arrange
			const notionData = {
				id: '7',
				name: 'Dummy notion 7',
				moduleId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { notion: notionData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.put(`${baseUrl}/api/notions/${notionData.id}`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.UPDATE_NOTION_REQUEST },
				{
					type: notionsActions.ActionTypes.UPDATE_NOTION_SUCCESS,
					payload: { notion: notionData },
				},
			];

			// Act & assert
			store.dispatch(notionsActions.updateNotion(notionData, notionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an UPDATE_NOTION_FAILURE action when notion edition logic has failed', () => {
			// Arrange
			const notionData = {
				id: '7',
				name: 'Dummy notion 7',
				moduleId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.put(`${baseUrl}/api/notions/${notionData.id}`, httpResponse);

			const expectedActions = [
				{ type: notionsActions.ActionTypes.UPDATE_NOTION_REQUEST },
				{
					type: notionsActions.ActionTypes.UPDATE_NOTION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(notionsActions.updateNotion(notionData, notionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
