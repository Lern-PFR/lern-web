import { shallow } from 'enzyme';
import LessonListItem from 'components/modules/LessonListItem';

describe('LessonListItem', () => {
	it('should match previous snapshot', () => {
		const sut = (<LessonListItem id="abcd" name="abcd" description="dummy description" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous disabled-state snapshot', () => {
		const sut = (<LessonListItem id="abcd" name="abcd" description="dummy description" disabled />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});