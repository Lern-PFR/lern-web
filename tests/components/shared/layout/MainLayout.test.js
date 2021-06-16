import { shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import { MainLayout } from 'components/shared/layout';

describe('MainLayout', () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	it('should match previous snapshot', () => {
		const sut = (<StaticRouter><MainLayout><p>Hello, world!</p></MainLayout></StaticRouter>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
