import { shallow } from 'enzyme';
import { HomepageAnon } from 'components/home';

describe('HomepageAnon', () => {
	it('should match previous snapshot', () => {
		const wrapper = shallow(<HomepageAnon />);

		expect(wrapper).toMatchSnapshot();
	});
});
