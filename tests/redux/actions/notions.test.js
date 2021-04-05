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
});
