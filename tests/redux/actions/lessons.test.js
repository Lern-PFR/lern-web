import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as lessonsActions from 'redux/actions/lessons';
import { ActionTypes as conceptActionTypes } from 'redux/actions/concepts';
import { baseUrl } from 'lib/shared/http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	lessons: {
		isLoading: false,
		items: [],
		totalCount: 0,
	},
};

describe('Lesson-related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('Specific lesson fetching', () => {
		it('should create a FETCH_LESSON_REQUEST action when lesson fetching logic is initialized.', () => {
			// Arrange
			const expectedActions = [
				{ type: lessonsActions.ActionTypes.FETCH_LESSON_REQUEST },
			];

			// Act
			store.dispatch(lessonsActions.fetchLesson('abcd'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_LESSON_SUCCESS action when lesson fetching logic is successful.', () => {
			// Arrange
			const lesson = {
				id: 'abcd',
				name: 'Dummy lesson',
			};

			const httpResponse = {
				status: 200,
				body: { lesson },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/lessons/${lesson.id}`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.FETCH_LESSON_REQUEST },
				{ type: lessonsActions.ActionTypes.FETCH_LESSON_SUCCESS, payload: { lesson } },
			];

			// Act & assert
			store.dispatch(lessonsActions.fetchLesson('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_LESSON_FAILURE action when lesson fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/lessons/abcd`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.FETCH_LESSON_REQUEST },
				{
					type: lessonsActions.ActionTypes.FETCH_LESSON_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(lessonsActions.fetchLesson('abcd'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Lesson creation', () => {
		it('should create a CREATE_LESSON_REQUEST action when lesson creation logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: lessonsActions.ActionTypes.CREATE_LESSON_REQUEST },
			];

			// Act
			store.dispatch(lessonsActions.createLesson({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a CREATE_LESSON_SUCCESS action when lesson creation logic is successful', () => {
			// Arrange
			const lessonData = {
				name: 'Dummy lesson 7',
				conceptId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { lesson: { ...lessonData, id: '7' } },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/lessons`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.CREATE_LESSON_REQUEST },
				{
					type: lessonsActions.ActionTypes.CREATE_LESSON_SUCCESS,
					payload: { lesson: { ...lessonData, id: '7' } },
				},
			];

			// Act & assert
			store.dispatch(lessonsActions.createLesson(lessonData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a CREATE_LESSON_FAILURE action when lesson creation logic has failed', () => {
			// Arrange
			const lessonData = {
				name: 'Dummy lesson 7',
				conceptId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/lessons`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.CREATE_LESSON_REQUEST },
				{
					type: lessonsActions.ActionTypes.CREATE_LESSON_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(lessonsActions.createLesson(lessonData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Lesson edition', () => {
		it('should create an UPDATE_LESSON_REQUEST action when lesson edition logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: lessonsActions.ActionTypes.UPDATE_LESSON_REQUEST },
			];

			// Act
			store.dispatch(lessonsActions.updateLesson({}, '7'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an UPDATE_LESSON_SUCCESS action when lesson edition logic is successful', () => {
			// Arrange
			const lessonData = {
				id: '7',
				name: 'Dummy lesson 7',
				conceptId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { lesson: lessonData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.put(`${baseUrl}/api/lessons/${lessonData.id}`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.UPDATE_LESSON_REQUEST },
				{
					type: lessonsActions.ActionTypes.UPDATE_LESSON_SUCCESS,
					payload: { lesson: lessonData },
				},
			];

			// Act & assert
			store.dispatch(lessonsActions.updateLesson(lessonData, lessonData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an UPDATE_LESSON_FAILURE action when lesson edition logic has failed', () => {
			// Arrange
			const lessonData = {
				id: '7',
				name: 'Dummy lesson 7',
				conceptId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.put(`${baseUrl}/api/lessons/${lessonData.id}`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.UPDATE_LESSON_REQUEST },
				{
					type: lessonsActions.ActionTypes.UPDATE_LESSON_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(lessonsActions.updateLesson(lessonData, lessonData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Lesson deletion', () => {
		it('should create an DELETE_LESSON_REQUEST action when lesson deletion logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: lessonsActions.ActionTypes.DELETE_LESSON_REQUEST },
			];

			// Act
			store.dispatch(lessonsActions.deleteLesson('7'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an DELETE_LESSON_SUCCESS action when lesson edition logic is successful', () => {
			// Arrange
			const lessonData = {
				id: '7',
				name: 'Dummy lesson 7',
				conceptId: 'abcd',
			};

			const httpResponse = {
				status: 200,
				body: { ...lessonData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.delete(`${baseUrl}/api/lessons/${lessonData.id}`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.DELETE_LESSON_REQUEST },
				{
					type: lessonsActions.ActionTypes.DELETE_LESSON_SUCCESS,
					payload: { lesson: lessonData },
				},
				{ type: conceptActionTypes.FETCH_CONCEPT_REQUEST },
			];

			// Act & assert
			store.dispatch(lessonsActions.deleteLesson(lessonData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an DELETE_LESSON_FAILURE action when lesson edition logic has failed', () => {
			// Arrange
			const lessonData = {
				id: '7',
				name: 'Dummy lesson 7',
				conceptId: 'abcd',
			};

			const httpResponse = { status: 500 };

			fetchMock.delete(`${baseUrl}/api/lessons/${lessonData.id}`, httpResponse);

			const expectedActions = [
				{ type: lessonsActions.ActionTypes.DELETE_LESSON_REQUEST },
				{
					type: lessonsActions.ActionTypes.DELETE_LESSON_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(lessonsActions.deleteLesson(lessonData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Lesson list clearing', () => {
		it('should create a CLEAR_LESSON_LIST action when lesson list clearing logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: lessonsActions.ActionTypes.CLEAR_LESSON_LIST },
			];

			// Act
			store.dispatch(lessonsActions.clearLessonList());

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
