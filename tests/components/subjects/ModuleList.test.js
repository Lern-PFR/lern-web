import { shallow } from 'enzyme';
import ModuleList from 'components/subjects/ModuleList';

describe('ModuleList', () => {
	it('should match previous snapshot', () => {
		const sut = (<ModuleList modules={[]} noDataText="" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
