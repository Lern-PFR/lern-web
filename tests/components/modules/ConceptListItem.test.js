import { shallow } from 'enzyme';
import ConceptListItem from 'components/modules/ConceptListItem';

describe('ConceptListItem', () => {
	it('should match previous snapshot', () => {
		const sut = (<ConceptListItem id="abcd" title="abcd" description="dummy description" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot with lessons', () => {
		const lessons = [
			{ id: '1', title: 'lesson 1', description: 'Lorem ipsum dolor sit amet.' },
			{ id: '2', title: 'lesson 2', description: 'Lorem ipsum dolor sit amet.' },
			{ id: '3', title: 'lesson 3', description: 'Lorem ipsum dolor sit amet.' },
		];

		const sut = (<ConceptListItem id="abcd" title="abcd" description="dummy description" lessons={lessons} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
