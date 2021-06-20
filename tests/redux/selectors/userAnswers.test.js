import { getUserAnswer } from 'redux/selectors/userAnswers';

describe('user answer selector', () => {
	it('should return the userAnswer state\'s first item array element', () => {
		const mockedStore = {
			userAnswers: {
				items: [
					{
						question: {
							id: 'dummy_question_id',
							answers: [],
						},
						answerId: 'dummy_answer_id',
						answer: {},
					},
				],
			},
		};
		expect(getUserAnswer(mockedStore)).toEqual(mockedStore.userAnswers.items[0]);
	});

	it('should return undefined if no userAnswer is present', () => {
		const mockedStore = {
			userAnswers: {
				items: [],
			},
		};

		expect(getUserAnswer(mockedStore)).toEqual(undefined);
	});
});
