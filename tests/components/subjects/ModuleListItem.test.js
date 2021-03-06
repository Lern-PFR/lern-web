import { shallow } from 'enzyme';
import ModuleListItem from 'components/subjects/ModuleList/ModuleListItem';

describe('ModuleListItem', () => {
	it('should match previous snapshot', () => {
		const sut = (<ModuleListItem id="abcd" title="abcd" description="dummy description" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous disabled-state snapshot', () => {
		const sut = (<ModuleListItem id="abcd" title="abcd" description="dummy description" disabled />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
