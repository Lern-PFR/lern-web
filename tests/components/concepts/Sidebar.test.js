import { shallow } from 'enzyme';
import { Sidebar } from 'components/concepts/conceptDetailsPage';

describe('Sidebar', () => {
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
			exercise: {
				id: 99,
				question: {
					id: 100,
					name: 'question',
					singleChoice: true,
					statement: 'statement',
					explanation: 'none',
					answers: [
						{ id: 1, text: 'answer 1', valid: false },
						{ id: 2, text: 'answer 2', valid: false },
						{ id: 3, text: 'answer 3', valid: true },
						{ id: 4, text: 'answer 4', valid: false },
					],
				},
			},
		},
	};

	it('should match previous snapshot (without question)', () => {
		const wrapper = shallow(<Sidebar {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot (with question)', () => {
		const wrapper = shallow(<Sidebar {...propsWithQuestion} />);
		expect(wrapper).toMatchSnapshot();
	});
});
