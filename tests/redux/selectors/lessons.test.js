import { extractFirstQuestionFromLesson, getLessonOrderOptions } from 'redux/selectors/lessons';

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

	describe('getLessonOrderOptions', () => {
		it('should return a single entry array if the current module has no concepts', () => {
			const mockedStore = {
				concepts: {
					items: [
						{ id: 'abcd', title: 'dummy_concept_title', description: 'dummy_concept_description' },
					],
				},
			};
			const expectedResult = [{ label: 0, value: 0 }];
			const actualResult = getLessonOrderOptions(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return a an array of length n from the current modules\'s concept list.', () => {
			const mockedStore = {
				concepts: {
					items: [
						{
							id: 'abcd',
							title: 'dummy_concept_title',
							description: 'dummy_concept_description',
							lessons: [
								{ id: 'dummy_lesson_id_0', title: 'dummy_lesson_title_0', description: 'dummy_lesson_desc_0' },
								{ id: 'dummy_lesson_id_1', title: 'dummy_lesson_title_1', description: 'dummy_lesson_desc_1' },
								{ id: 'dummy_lesson_id_2', title: 'dummy_lesson_title_2', description: 'dummy_lesson_desc_2' },
								{ id: 'dummy_lesson_id_3', title: 'dummy_lesson_title_3', description: 'dummy_lesson_desc_3' },
							],
						},
					],
				},
			};
			const expectedResult = [
				{ label: 0, value: 0 },
				{ label: 1, value: 1 },
				{ label: 2, value: 2 },
				{ label: 3, value: 3 },
			];

			const actualResult = getLessonOrderOptions(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
