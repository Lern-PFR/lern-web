import { shallow } from 'enzyme';
import LessonQuestionListItem from 'components/content/LessonQuestionListItem';

describe('LessonQuestionListItem', () => {
	it('should match previous snapshot', () => {
		const mockedQuestion = {
			id: 'dummy_question_id_1',
			title: 'dummy_question_title_1',
			description: 'dummy_question_desc_1',
			questions: [{ statement: 'oui', type: 'SingleChoice' }],
		};
		const sut = (<LessonQuestionListItem key="abcd" exercise={mockedQuestion} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
