import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as exercisesActions from 'redux/actions/exercises';
import { ActionTypes as questionsActionTypes } from 'redux/actions/questions';
import { ActionTypes as lessonsActionTypes } from 'redux/actions/lessons';
import { ActionTypes as conceptsActionTypes } from 'redux/actions/concepts';

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
		it('should create a FETCH_EXERCISE_REQUEST action when the exercise fetching logic is initialized.', () => {
			// Arrange
			const expectedActions = [
				{ type: exercisesActions.ActionTypes.FETCH_EXERCISE_REQUEST },
			];

			// Act
			store.dispatch(exercisesActions.fetchExercise('abcd'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a FETCH_EXERCISE_SUCCESS action when the exercise fetching logic is successful.', () => {
			// Arrange
			const exercise = {
				id: 'dummy_exercise_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = {
				status: 200,
				body: { ...exercise },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/exercises/${exercise.id}`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.FETCH_EXERCISE_REQUEST },
				{ type: exercisesActions.ActionTypes.FETCH_EXERCISE_SUCCESS, payload: { exercise } },
			];

			// Act & assert
			store.dispatch(exercisesActions.fetchExercise(exercise.id))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a FETCH_EXERCISE_FAILURE action when the exercise fetching logic has failed', () => {
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/exercises/dummy_exercise_id`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.FETCH_EXERCISE_REQUEST },
				{
					type: exercisesActions.ActionTypes.FETCH_EXERCISE_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			return store.dispatch(exercisesActions.fetchExercise('dummy_exercise_id'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('Exercise creation', () => {
		it('should create a CREATE_EXERCISE_REQUEST action when the exercise creation logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: exercisesActions.ActionTypes.CREATE_EXERCISE_REQUEST },
			];

			// Act
			store.dispatch(exercisesActions.createExercise({}));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a CREATE_EXERCISE_SUCCESS action when the exercise creation logic is successful', () => {
			// Arrange
			const exerciseData = {
				lessonId: 'dummy_lesson_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = {
				status: 200,
				body: { ...exerciseData, id: 'dummy_exercise_id' },
				headers: { 'content-type': 'application/json' },
			};

			const questionCreationHttpResponse = {
				status: 200,
				body: {},
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.post(`${baseUrl}/api/exercises`, httpResponse);
			fetchMock.post(`${baseUrl}/api/questions`, questionCreationHttpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.CREATE_EXERCISE_REQUEST },
				{ type: questionsActionTypes.CREATE_QUESTION_REQUEST },
				{
					type: exercisesActions.ActionTypes.CREATE_EXERCISE_SUCCESS,
					payload: { exercise: { ...exerciseData, id: 'dummy_exercise_id' } },
				},
			];

			// Act & assert
			store.dispatch(exercisesActions.createExercise(exerciseData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create a CREATE_EXERCISE_FAILURE action when the exercise creation logic has failed', () => {
			// Arrange
			const exerciseData = {
				lessonId: 'dummy_lesson_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/exercises`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.CREATE_EXERCISE_REQUEST },
				{
					type: exercisesActions.ActionTypes.CREATE_EXERCISE_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(exercisesActions.createExercise(exerciseData))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Exercise edition', () => {
		it('should create an UPDATE_EXERCISE_REQUEST action when the exercise edition logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: exercisesActions.ActionTypes.UPDATE_EXERCISE_REQUEST },
			];

			// Act
			store.dispatch(exercisesActions.updateExercise({}, '7', 'dummy_subject_id'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an UPDATE_EXERCISE_SUCCESS action when the exercise edition logic is successful', () => {
			// Arrange
			const exerciseData = {
				id: 'dummy_exercise_id',
				lessonId: 'dummy_lesson_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = {
				status: 200,
				body: { ...exerciseData },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.put(`${baseUrl}/api/exercises/${exerciseData.id}`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.UPDATE_EXERCISE_REQUEST },
				{
					type: exercisesActions.ActionTypes.UPDATE_EXERCISE_SUCCESS,
					payload: { exercise: exerciseData },
				},
			];

			// Act & assert
			store.dispatch(exercisesActions.updateExercise(exerciseData, exerciseData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an UPDATE_EXERCISE_FAILURE action when the exercise edition logic has failed', () => {
			// Arrange
			const exerciseData = {
				id: 'dummy_exercise_id',
				lessonId: 'dummy_lesson_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = { status: 500 };

			fetchMock.put(`${baseUrl}/api/exercises/${exerciseData.id}`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.UPDATE_EXERCISE_REQUEST },
				{
					type: exercisesActions.ActionTypes.UPDATE_EXERCISE_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(exercisesActions.updateExercise(exerciseData, exerciseData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});

	describe('Exercise deletion', () => {
		it('should create an DELETE_EXERCISE_REQUEST action when the exercise deletion logic is initialized', () => {
			// Arrange
			const expectedActions = [
				{ type: exercisesActions.ActionTypes.DELETE_EXERCISE_REQUEST },
			];

			// Act
			store.dispatch(exercisesActions.deleteExercise('dummy_exercise_id'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create an DELETE_EXERCISE_SUCCESS action when the exercise deletion logic is successful', () => {
			// Arrange
			const exerciseData = {
				id: 'dummy_exercise_id',
				lessonId: 'dummy_lesson_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = {
				status: 200,
				body: { ...exerciseData },
				headers: { 'content-type': 'application/json' },
			};

			const lessonFetchHttpResponse = {
				status: 200,
				body: { id: 'dummy_lesson_id', title: 'dummy_lesson_title', description: 'dummy_lesson_desc' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/lessons/dummy_lesson_id`, lessonFetchHttpResponse);
			fetchMock.delete(`${baseUrl}/api/exercises/${exerciseData.id}`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.DELETE_EXERCISE_REQUEST },
				{
					type: exercisesActions.ActionTypes.DELETE_EXERCISE_SUCCESS,
					payload: { exercise: exerciseData },
				},
				{ type: lessonsActionTypes.FETCH_LESSON_REQUEST },
			];

			// Act & assert
			store.dispatch(exercisesActions.deleteExercise(exerciseData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an FETCH_CONCEPT_EXERCISE action after a successful exercise deletion logic if exercise had no lessonId but a conceptId ', () => {
			// Arrange
			const exerciseData = {
				id: 'dummy_exercise_id',
				conceptId: 'dummy_concept_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = {
				status: 200,
				body: { ...exerciseData },
				headers: { 'content-type': 'application/json' },
			};

			const conceptFetchHttpResponse = {
				status: 200,
				body: { id: 'dummy_concept_id', title: 'dummy_concept_title', description: 'dummy_concept_desc' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/concepts/dummy_concept_id`, conceptFetchHttpResponse);
			fetchMock.delete(`${baseUrl}/api/exercises/${exerciseData.id}`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.DELETE_EXERCISE_REQUEST },
				{
					type: exercisesActions.ActionTypes.DELETE_EXERCISE_SUCCESS,
					payload: { exercise: exerciseData },
				},
				{ type: conceptsActionTypes.FETCH_CONCEPT_REQUEST },
			];

			// Act & assert
			store.dispatch(exercisesActions.deleteExercise(exerciseData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it('should create an DELETE_EXERCISE_FAILURE action when the exercise deletion logic has failed', () => {
			// Arrange
			const exerciseData = {
				id: 'dummy_exercise_id',
				conceptId: 'dummy_concept_id',
				title: 'Dummy exercise',
				description: 'dummy exercise description',
			};

			const httpResponse = { status: 500 };

			fetchMock.delete(`${baseUrl}/api/exercises/${exerciseData.id}`, httpResponse);

			const expectedActions = [
				{ type: exercisesActions.ActionTypes.DELETE_EXERCISE_REQUEST },
				{
					type: exercisesActions.ActionTypes.DELETE_EXERCISE_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Act & assert
			store.dispatch(exercisesActions.deleteExercise(exerciseData.id))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
