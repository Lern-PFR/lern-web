import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as userAnswersActions from 'redux/actions/userAnswers';
import { baseUrl } from 'lib/shared/http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	userAnswers: {
		isLoading: false,
		items: [],
	},
};

describe('User answers related redux actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	describe('User answer creation', () => {
		it('should create a USER_ANSWER_CREATION_REQUEST action when the user answer creation logic is initialized.', () => {
			// Arrange
			const expectedActions = [
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_CREATION_REQUEST },
			];

			// Act
			store.dispatch(userAnswersActions.createUserAnswer('dummy_question_id', 'dummy_answer_id'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a USER_ANSWER_CREATION_SUCCESS action and call the USER_ANSWER_FETCH_REQUEST action when the user answer creation logic is successful.', () => {
			// Arrange
			const expectedActions = [
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_CREATION_REQUEST },
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_CREATION_SUCCESS },
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_FETCH_REQUEST },
			];

			// Arrange
			const httpResponse = {
				status: 200,
				body: {},
				headers: { 'content-type': 'application/json' },
			};

			const questionAnswerHttpResponse = {
				status: 200,
				body: {
					question: {
						id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
						answers: [],
					},
					answerId: 'dummy_answer_id',
					answer: {},
				},
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/results/question/dummy_question_id`, questionAnswerHttpResponse);
			fetchMock.post(`${baseUrl}/api/results`, httpResponse);

			// Act && assert
			store.dispatch(userAnswersActions.createUserAnswer('dummy_question_id', 'dummy_answer_id'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a USER_ANSWER_CREATION_FAILURE action when the user answer creation logic has failed.', () => {
			// Arrange
			const expectedActions = [
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_CREATION_REQUEST },
				{
					type: userAnswersActions.ActionTypes.USER_ANSWER_CREATION_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Arrange
			const httpResponse = { status: 500 };

			fetchMock.post(`${baseUrl}/api/results`, httpResponse);

			// Act && assert
			store.dispatch(userAnswersActions.createUserAnswer('dummy_question_id', 'dummy_answer_id'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});

	describe('User answer retrieval', () => {
		it('should create a USER_ANSWER_FETCH_REQUEST action when the user answer retrieval logic is initialized.', () => {
			// Arrange
			const expectedActions = [
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_FETCH_REQUEST },
			];

			// Act
			store.dispatch(userAnswersActions.retrieveAnswerByQuestionId('dummy_question_id'));

			// Assert
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('should create a USER_ANSWER_FETCH_SUCCESS action when the user answer retrieval logic is successful.', () => {
			const retrievedAnswer = {
				question: {
					id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
					answers: [],
				},
				answerId: 'dummy_answer_id',
				answer: {},
			};

			// Arrange
			const expectedActions = [
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_FETCH_REQUEST },
				{
					type: userAnswersActions.ActionTypes.USER_ANSWER_FETCH_SUCCESS,
					payload: { answer: retrievedAnswer },
				},
			];

			// Arrange
			const httpResponse = {
				status: 200,
				body: { ...retrievedAnswer },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/results/question/dummy_question_id`, httpResponse);

			// Act && assert
			store.dispatch(userAnswersActions.retrieveAnswerByQuestionId('dummy_question_id'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});

		it('should create a USER_ANSWER_FETCH_FAILURE action when the user answer retrieval logic has failed.', () => {
			// Arrange
			const expectedActions = [
				{ type: userAnswersActions.ActionTypes.USER_ANSWER_FETCH_REQUEST },
				{
					type: userAnswersActions.ActionTypes.USER_ANSWER_FETCH_FAILURE,
					payload: { error: { status: 500, message: 'Internal Server Error' } },
				},
			];

			// Arrange
			const httpResponse = { status: 500 };

			fetchMock.get(`${baseUrl}/api/results/question/dummy_question_id`, httpResponse);

			// Act && assert
			store.dispatch(userAnswersActions.retrieveAnswerByQuestionId('dummy_question_id'))
				.then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
		});
	});
});
