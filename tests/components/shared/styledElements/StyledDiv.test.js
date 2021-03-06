import { shallow } from 'enzyme';
import { StyledDiv } from 'components/shared/styledElements';

describe('StyledDiv', () => {
	it('should match previous snapshot', () => {
		const sut = (<StyledDiv><p>Hello, world!</p></StyledDiv>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
