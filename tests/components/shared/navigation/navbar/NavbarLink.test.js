import { shallow } from 'enzyme';
import { NavbarLink } from 'components/shared/navigation/navbar';

describe('NavbarLink', () => {
	it('should match previous snapshot', () => {
		const sut = (<NavbarLink targetUrl="">test</NavbarLink>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
