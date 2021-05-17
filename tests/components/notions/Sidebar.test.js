import { shallow } from 'enzyme';
import { Sidebar } from 'components/notions/NotionDetailsPage';

describe('Sidebar', () => {
	const props = {
		notionName: 'test notion',
		currentLesson: {
			id: 1,
			name: 'test lesson',
			content: 'test lesson content',
			description: 'test lesson description',
		},
		notionContent: [
			{
				id: 1,
				name: 'lesson 1',
				description: 'another lesson description',
				content: 'lesson 1\'s content',
				order: 1,
				contentType: 'lesson',
			},
			{
				id: 2,
				name: 'lesson 2',
				description: 'another lesson description',
				content: 'lesson 2\'s content',
				order: 1,
				contentType: 'lesson',
			},
			{
				id: 'exercise-2',
				contentType: 'exercise',
				question: {
					id: 'question-2',
					singleChoice: true,
					statement: 'Do you like angular ?',
					explanation: 'It\'s only a taste preference, really.',
					answers: [
						{ id: 'answer-2-0', text: 'Yes', valid: false },
						{ id: 'answer-2-1', text: 'I\'ve never tried it', valid: false },
						{ id: 'answer-2-2', text: 'Hell no', valid: true },
					],
				},
			},
		],
		onQuestionAnswerSubmit: jest.fn(),
		onCurrentDocumentRedirect: jest.fn(),
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
