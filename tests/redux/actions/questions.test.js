import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as questionsActions from 'redux/actions/questions';

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

describe('Exercise-related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('exercise fetching actions', () => {
		it('should create a FETCH_QUESTION_REQUEST action when the exercise fetching logic is initialized.', () => {
			// Arrange
			const expectedActions = [
				{ type: questionsActions.ActionTypes.FETCH_QUESTION_REQUEST },
			];

			// Act
			store.dispatch(questionsActions.fetchQuestion('dummy_question_id'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_QUESTION_SUCCESS action when the exercise fetching logic is successful.', () => {
			// Arrange
			const question = {
				id: 'dummy_question_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = {
				status: 200,
				body: { ...question },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/questions/${question.id}`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.FETCH_QUESTION_REQUEST },
				{ type: questionsActions.ActionTypes.FETCH_QUESTION_SUCCESS, payload: { question } },
			];

			// Act & assert
			store.dispatch(questionsActions.fetchQuestion(question.id))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_QUESTION_FAILURE action when the exercise fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/questions/dummy_question_id`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.FETCH_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.FETCH_QUESTION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(questionsActions.fetchQuestion('dummy_question_id'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Question creation', () => {
		it('should create a CREATE_QUESTION_REQUEST action when the question creation logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: questionsActions.ActionTypes.CREATE_QUESTION_REQUEST },
			];

			// Act
			store.dispatch(questionsActions.createQuestion({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a CREATE_QUESTION_SUCCESS action when the question creation logic is successful', () => {
			// Arrange
			const questionData = {
				exerciseId: 'dummy_exercise_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = {
				status: 200,
				body: { ...questionData, id: 'dummy_question_id' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/questions`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.CREATE_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.CREATE_QUESTION_SUCCESS,
					payload: { question: { ...questionData, id: 'dummy_question_id' } },
				},
			];

			// Act & assert
			store.dispatch(questionsActions.createQuestion(questionData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a CREATE_QUESTION_FAILURE action when the question creation logic has failed', () => {
			// Arrange
			const questionData = {
				exerciseId: 'dummy_exercise_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/questions`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.CREATE_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.CREATE_QUESTION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(questionsActions.createQuestion(questionData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Question edition', () => {
		it('should create an UPDATE_QUESTION_REQUEST action when the question edition logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: questionsActions.ActionTypes.UPDATE_QUESTION_REQUEST },
			];

			// Act
			store.dispatch(questionsActions.updateQuestion({}, 'dummy_question_id'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an UPDATE_QUESTION_SUCCESS action when the question edition logic is successful', () => {
			// Arrange
			const questionData = {
				id: 'dummy_question_id',
				exerciseId: 'dummy_exercise_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = {
				status: 200,
				body: { ...questionData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.put(`${baseUrl}/api/questions/${questionData.id}`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.UPDATE_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.UPDATE_QUESTION_SUCCESS,
					payload: { question: questionData },
				},
			];

			// Act & assert
			store.dispatch(questionsActions.updateQuestion(questionData, questionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an UPDATE_QUESTION_FAILURE action when the question edition logic has failed', () => {
			// Arrange
			const questionData = {
				id: 'dummy_question_id',
				exerciseId: 'dummy_exercise_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = { status: 500 };

			fetchMock.put(`${baseUrl}/api/questions/${questionData.id}`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.UPDATE_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.UPDATE_QUESTION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(questionsActions.updateQuestion(questionData, questionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Question deletion', () => {
		it('should create an DELETE_QUESTION_REQUEST action when the question deletion logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: questionsActions.ActionTypes.DELETE_QUESTION_REQUEST },
			];

			// Act
			store.dispatch(questionsActions.deleteQuestion('dummy_question_id'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an DELETE_QUESTION_SUCCESS action when the question deletion logic is successful', () => {
			// Arrange
			const questionData = {
				id: 'dummy_question_id',
				exerciseId: 'dummy_exercise_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = {
				status: 200,
				body: { ...questionData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.delete(`${baseUrl}/api/questions/${questionData.id}`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.DELETE_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.DELETE_QUESTION_SUCCESS,
					payload: { question: questionData },
				},
			];

			// Act & assert
			store.dispatch(questionsActions.deleteQuestion(questionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an FETCH_CONCEPT_EXERCISE action after a successful question deletion logic if exercise had no lessonId but a conceptId ', () => {
			// Arrange
			const questionData = {
				id: 'dummy_question_id',
				exerciseId: 'dummy_exercise_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = {
				status: 200,
				body: { ...questionData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.delete(`${baseUrl}/api/questions/${questionData.id}`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.DELETE_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.DELETE_QUESTION_SUCCESS,
					payload: { question: questionData },
				},
			];

			// Act & assert
			store.dispatch(questionsActions.deleteQuestion(questionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an DELETE_QUESTION_FAILURE action when the question deletion logic has failed', () => {
			// Arrange
			const questionData = {
				id: 'dummy_question_id',
				exerciseId: 'dummy_exercise_id',
				statement: 'Dummy question statement',
			};

			const httpResponse = { status: 500 };

			fetchMock.delete(`${baseUrl}/api/questions/${questionData.id}`, httpResponse);

			const expectedActions = [
				{ type: questionsActions.ActionTypes.DELETE_QUESTION_REQUEST },
				{
					type: questionsActions.ActionTypes.DELETE_QUESTION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(questionsActions.deleteQuestion(questionData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
