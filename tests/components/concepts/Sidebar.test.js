import { shallow } from 'enzyme';
import { Sidebar } from 'components/concepts/conceptDetailsPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Sidebar', () => {
	const mockStore = configureMockStore([thunk]);

	const props = {
		conceptTitle: 'test concept',
		currentLesson: {
			id: 0,
			title: 'test lesson',
			content: 'test lesson content',
			description: 'test lesson description',
			order: 0,
		},
		conceptContent: [
			{
				id: 1,
				title: 'test lesson',
				content: 'test lesson content',
				description: 'test lesson description',
				order: 0,
			},
			{
				id: 1,
				title: 'lesson 1',
				description: 'another lesson description',
				content: 'lesson 1\'s content',
				order: 1,
			},
			{
				id: 2,
				title: 'lesson 2',
				description: 'another lesson description',
				content: 'lesson 2\'s content',
				order: 2,
			},
		],
		onQuestionAnswerSubmit: jest.fn(),
		onContentStepperClick: jest.fn(),
	};

	const propsWithQuestion = {
		...props,
		currentLesson: {
			...props.currentLesson,
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
		},
	};

	it('should match previous snapshot (without question)', () => {
		const store = mockStore({});
		const wrapper = shallow(
			<Provider store={store}>
				<Sidebar {...props} />
			</Provider>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot (with question)', () => {
		const store = mockStore({
			userAnswers: { items: [{ questionId: 'dummy_question_id', answerId: 'dummy_answer_id_1' }] },
		});

		const wrapper = shallow(
			<Provider store={store}>
				<Sidebar {...propsWithQuestion} />
			</Provider>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
