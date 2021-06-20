import { extractFirstQuestionFromLesson } from 'redux/selectors/lessons';

describe('Lesson selector', () => {
	const mockedUserAnswer = {
		questionId: 'dummy_question_id',
		question: { id: 'dummy_question_id', answers: [] },
		answerId: 'dummy_answer_id_1',
		answer: {},
	};

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('extractFirstQuestionFromLesson', () => {
		describe('No user answer is present', () => {
			const mockedStore = {
				userAnswers: { items: [] },
			};

			it('should return undefined if the provided lesson has no exercise', () => {
				const mockedLesson = { id: 'dummy_lesson_id', title: 'dummy_lesson_title' };

				expect(extractFirstQuestionFromLesson(mockedStore, mockedLesson)).toEqual(undefined);
			});

			it('should return undefined if the provided lesson\'s first exercise has no question', () => {
				const mockedLesson = {
					id: 'dummy_lesson_id',
					title: 'dummy_lesson_title',
					exercises: [
						{ id: 'dummy_exercise_id_1' },
						{ id: 'dummy_exercise_id_2', question: { id: 'dummy_question_id' } },
					],
				};

				expect(extractFirstQuestionFromLesson(mockedStore, mockedLesson)).toEqual(undefined);
			});

			it('should return the lesson\'s first exercise\'s first question with sorted answers', () => {
				const mockedLesson = {
					id: 'dummy_lesson_id',
					title: 'dummy_lesson_title',
					exercises: [
						{
							id: 'dummy_exercise_id_1',
							questions: [
								{
									id: 'dummy_question_id',
									answers: [
										{ id: 'dummy_answer_id_1', text: 'efgh' },
										{ id: 'dummy_answer_id_2', text: 'abcd' },
									],
								},
							],
						},
					],
				};

				const expectedResult = {
					id: 'dummy_question_id',
					answers: [
						{ id: 'dummy_answer_id_2', text: 'abcd' },
						{ id: 'dummy_answer_id_1', text: 'efgh' },
					],
				};

				expect(extractFirstQuestionFromLesson(mockedStore, mockedLesson)).toEqual(expectedResult);
			});
		});

		describe('User answer is present', () => {
			const mockedStore = {
				userAnswers: { items: [mockedUserAnswer] },
			};

			it('should add a "isUserAnswer" field to each answer with true of false depending on the userAnswer retrieved from state', () => {
				const mockedLesson = {
					id: 'dummy_lesson_id',
					title: 'dummy_lesson_title',
					exercises: [
						{
							id: 'dummy_exercise_id_1',
							questions: [
								{
									id: 'dummy_question_id',
									answers: [
										{ id: 'dummy_answer_id_1', text: 'efgh' },
										{ id: 'dummy_answer_id_2', text: 'abcd' },
									],
								},
							],
						},
					],
				};

				const expectedResult = {
					id: 'dummy_question_id',
					answers: [
						{ id: 'dummy_answer_id_2', text: 'abcd', isUserAnswer: false },
						{ id: 'dummy_answer_id_1', text: 'efgh', isUserAnswer: true },
					],
				};

				expect(extractFirstQuestionFromLesson(mockedStore, mockedLesson)).toEqual(expectedResult);
			});
		});
	});
});
