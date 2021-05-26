import { shallow } from 'enzyme';
import { LessonContent } from 'components/notions/NotionDetailsPage';

describe('LessonContent', () => {
	const lessonData = {
		name: 'test lesson',
		content: 'test lesson content',
		description: 'test lesson description',
	};

	it('should match previous snapshot (no question provided)', () => {
		const wrapper = shallow(<LessonContent {...lessonData} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot (with question provided)', () => {
		const wrapper = shallow(<LessonContent {...lessonData} question="test lesson question" />);
		expect(wrapper).toMatchSnapshot();
	});
});
