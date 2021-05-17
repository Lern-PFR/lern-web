import { shallow } from 'enzyme';
import NotionContentNavigatorStepper from 'components/notions/NotionDetailsPage/NotionContentNavigatorStepper';

describe('NotionContentNavigatorStepper', () => {
	it('should match previous snapshot', () => {
		const wrapper = shallow(<NotionContentNavigatorStepper label="test" onClick={jest.fn()} />);
		expect(wrapper).toMatchSnapshot();
	});
});
