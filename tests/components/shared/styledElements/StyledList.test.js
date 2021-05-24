import { shallow } from 'enzyme';
import { StyledList } from 'components/shared/styledElements';

describe('StyledList', () => {
	it('should match previous snapshot', () => {
		const sut = (<StyledList><li>Hello, world!</li></StyledList>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
