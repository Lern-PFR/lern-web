import { shallow } from 'enzyme';
import { ModalFooter } from 'components/shared/modal';

describe('ModalFooter', () => {
	it('should render correctly', () => {
		const sut = (
			<ModalFooter>
				<p>Content</p>
			</ModalFooter>
		);

		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
