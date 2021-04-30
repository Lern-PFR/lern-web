import { shallow } from 'enzyme';
import { StyledListItem } from 'components/shared/layout';

describe('StyledListItem', () => {
	it('should match previous snapshot', () => {
		const sut = (<StyledListItem>Hello, world!</StyledListItem>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
