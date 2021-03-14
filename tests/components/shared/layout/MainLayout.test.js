import { shallow } from 'enzyme';
import { MainLayout } from 'components/shared/layout';

describe('MainLayout', () => {
	it('should match previous snapshot', () => {
		const sut = (<MainLayout><p>Hello, world!</p></MainLayout>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
