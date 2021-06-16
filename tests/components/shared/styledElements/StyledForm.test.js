import { shallow } from 'enzyme';
import { StyledForm } from 'components/shared/styledElements';

describe('StyledForm', () => {
	it('should match previous snapshot', () => {
		const sut = (<StyledForm />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
