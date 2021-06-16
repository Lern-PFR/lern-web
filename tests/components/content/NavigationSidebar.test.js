import { shallow } from 'enzyme';
import { NavigationSidebar } from 'components/content';

describe('NavigationSidebar', () => {
	it('should match previous snapshot', () => {
		const sut = (<NavigationSidebar />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
