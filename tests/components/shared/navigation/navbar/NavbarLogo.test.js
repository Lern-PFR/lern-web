import { shallow } from 'enzyme';
import { NavbarLogo } from 'components/shared/navigation/navbar';

describe('NavbarLogo', () => {
	it('should match previous snapshot', () => {
		const sut = (<NavbarLogo />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
