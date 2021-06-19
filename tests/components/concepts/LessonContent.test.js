import { shallow } from 'enzyme';
import { LessonContent } from 'components/concepts/conceptDetailsPage';

describe('LessonContent', () => {
	const lessonData = {
		title: 'test lesson',
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
