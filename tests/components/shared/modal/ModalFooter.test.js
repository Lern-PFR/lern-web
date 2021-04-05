import { shallow } from 'enzyme';
import { ModalFooter } from 'components/shared/modal';

describe('ModalFooter', () => {
	it('should match previoys snapshot', () => {
		const sut = (
			<ModalFooter>
				<p>Content</p>
			</ModalFooter>
		);

		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
