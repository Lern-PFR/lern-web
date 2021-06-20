import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as progressionActions from 'redux/actions/progression';
import { baseUrl } from 'lib/shared/http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	progression: {
		isLoading: false,
		items: [],
		totalCount: 0,
	},
};

describe('Progression-related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('Specific progression fetching', () => {
		it('should create a FETCH_PROGRESSION_REQUEST action when progression fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_REQUEST },
			];

			// Act
			store.dispatch(progressionActions.fetchProgression('abcd'));

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_PROGRESSION_SUCCESS action when progression fetching logic is succesful', () => {
			// Arrange
			const progression = {
				subjectId: 'abcd',
				conceptId: 'dcba',
			};

			const httpResponse = {
				status: 200,
				body: { ...progression },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/progression/${progression.subjectId}`, httpResponse);

			const expectedActions = [
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_REQUEST },
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_SUCCESS, payload: { progression } },
			];

			// Act & assert
			return store.dispatch(progressionActions.fetchProgression(progression.subjectId))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_PROGRESSION_FAILURE action when progression fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/progression/abcd`, httpResponse);

			const expectedActions = [
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_REQUEST },
				{
					type: progressionActions.ActionTypes.FETCH_PROGRESSION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(progressionActions.fetchProgression('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Progression list fetching', () => {
		it('should create a FETCH_PROGRESSION_LIST_REQUEST action when progression list fetching logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_LIST_REQUEST },
			];

			// Act
			store.dispatch(progressionActions.fetchProgressionList());

			// Assert
			return expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_PROGRESSION_LIST_SUCCESS action when progression list fetching logic is succesful', () => {
			// Arrange
			const progressionList = [
				{
					userId: '1',
					conceptId: 'dcba',
					subjectId: 'abcd',
				},
				{
					userId: '2',
					conceptId: 'dcba',
					subjectId: 'abcd',
				},
			];

			const httpResponse = {
				status: 200,
				body: progressionList,
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/progression`, httpResponse);

			const expectedActions = [
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_LIST_REQUEST },
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_LIST_SUCCESS, payload: { progressionList, totalCount: 2 } },
			];

			// Act & assert
			return store.dispatch(progressionActions.fetchProgressionList())
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_PROGRESSION_LIST_FAILURE action when progression list fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/progression`, httpResponse);

			const expectedActions = [
				{ type: progressionActions.ActionTypes.FETCH_PROGRESSION_LIST_REQUEST },
				{
					type: progressionActions.ActionTypes.FETCH_PROGRESSION_LIST_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(progressionActions.fetchProgressionList())
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Progression edition', () => {
		it('should create an UPDATE_PROGRESSION_REQUEST action when progression edition logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: progressionActions.ActionTypes.UPDATE_PROGRESSION_REQUEST },
			];

			// Act
			store.dispatch(progressionActions.updateProgression({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an UPDATE_PROGRESSION_SUCCESS action when progression edition logic is successful', () => {
			// Arrange
			const progressionData = {
				conceptId: 'dcba',
				subjectId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { ...progressionData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.put(`${baseUrl}/api/progression`, httpResponse);

			const expectedActions = [
				{ type: progressionActions.ActionTypes.UPDATE_PROGRESSION_REQUEST },
				{
					type: progressionActions.ActionTypes.UPDATE_PROGRESSION_SUCCESS,
					payload: { progression: progressionData },
				},
			];

			// Act & assert
			store.dispatch(progressionActions.updateProgression(progressionData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an UPDATE_PROGRESSION_FAILURE action when progression edition logic has failed', () => {
			// Arrange
			const progressionData = {
				conceptId: 'dcba',
				subjectId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.put(`${baseUrl}/api/progression`, httpResponse);

			const expectedActions = [
				{ type: progressionActions.ActionTypes.UPDATE_PROGRESSION_REQUEST },
				{
					type: progressionActions.ActionTypes.UPDATE_PROGRESSION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(progressionActions.updateProgression(progressionData, progressionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Progression list clearing', () => {
		it('should create a CLEAR_PROGRESSION_LIST action when progression list clearing logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: progressionActions.ActionTypes.CLEAR_PROGRESSION_LIST },
			];

			// Act
			store.dispatch(progressionActions.clearProgressionList());

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
