import { getLessons, getLessonById, getLessonOrderOptions, extractFirstQuestionFromLesson } from 'redux/selectors/lessons';

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

	describe('getLessons', () => {
		it('should return the lesson list if it exists.', () => {
			const mockedStore = {
				lessons: {
					items: [
						{ id: 0, title: 'dummy lesson 0', version: 0 },
						{ id: 1, title: 'dummy lesson 1', version: 0 },
						{ id: 2, title: 'dummy lesson 2', version: 0 },
						{ id: 3, title: 'dummy lesson 3', version: 0 },
					],
				},
			};

			expect(getLessons(mockedStore)).toEqual(mockedStore.lessons.items);
		});

		it('should return an empty array if the lesson state is not set.', () => {
			const mockedStore = { };
			const expectedResult = [];

			expect(getLessons(mockedStore)).toEqual(expectedResult);
		});
	});

	describe('getLessonById', () => {
		it('should return the lesson whose id equals the one in parameter.', () => {
			const mockedStore = {
				lessons: {
					items: [
						{ id: 'abcd', title: 'dummy lesson 0', version: 0 },
						{ id: 'efgh', title: 'dummy lesson 1', version: 0 },
						{ id: 'ijkl', title: 'dummy lesson 2', version: 0 },
						{ id: 'mnop', title: 'dummier lesson', version: 0 },
					],
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy lesson 1', version: 0 };

			const actualResult = getLessonById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should get the lesson with the hightest "version" if multiple lessons have the same id.', () => {
			const mockedStore = {
				lessons: {
					items: [
						{ id: 'abcd', title: 'dummy lesson 0', version: 0 },
						{ id: 'abcd', title: 'updated dummy lesson 0', version: 1 },
						{ id: 'efgh', title: 'dummy lesson 1', version: 0 },
						{ id: 'mnop', title: 'dummier lesson', version: 0 },
					],
				},
			};

			const expectedResult = { id: 'abcd', title: 'updated dummy lesson 0', version: 1 };

			const actualResult = getLessonById(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if no lesson contains the provided id.', () => {
			const mockedStore = {
				lessons: {
					items: [
						{ id: 'abcd', title: 'dummy lesson 0', version: 0 },
						{ id: 'efgh', title: 'dummy lesson 1', version: 0 },
						{ id: 'ijkl', title: 'dummy lesson 2', version: 0 },
						{ id: 'mnop', title: 'dummier lesson', version: 0 },
					],
				},
			};

			const expectedResult = undefined;

			const actualResult = getLessonById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if the lesson state has no item.', () => {
			const mockedStore = {
				lesson: {
					items: [],
				},
			};

			const expectedResult = undefined;

			const actualResult = getLessonById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
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
