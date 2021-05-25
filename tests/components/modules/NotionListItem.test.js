import { shallow } from 'enzyme';
import NotionListItem from 'components/modules/NotionListItem';

describe('NotionListItem', () => {
	it('should match previous snapshot', () => {
		const sut = (<NotionListItem id="abcd" name="abcd" description="dummy description" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot with lessons', () => {
		const lessons = [
			{ id: '1', name: 'lesson 1', description: 'Lorem ipsum dolor sit amet.' },
			{ id: '2', name: 'lesson 2', description: 'Lorem ipsum dolor sit amet.' },
			{ id: '3', name: 'lesson 3', description: 'Lorem ipsum dolor sit amet.' },
		];

		const sut = (<NotionListItem id="abcd" name="abcd" description="dummy description" lessons={lessons} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
