import { shallow } from 'enzyme';
import { Modal } from 'components/shared/modal';

describe('Modal', () => {
	it('should not render anything when isShowing is false', () => {
		const sut = (
			<Modal isShowing={false} title="Title">
				<p>Content</p>
			</Modal>
		);

		const wrapper = shallow(sut);

		expect(wrapper.isEmptyRender()).toBe(true);
	});

	it('should render correctly when isShowing is true', () => {
		const sut = (
			<Modal isShowing title="Title">
				<p>Content</p>
			</Modal>
		);

		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
