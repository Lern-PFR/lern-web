import { shallow } from 'enzyme';
import { useModal } from 'components/shared/modal';

/**
 * @name TestComponent
 * @description A component used to test useModal
 *
 * @author Yann Hodiesne
 */
const TestComponent = () => {
	const { isShowing, toggle } = useModal();

	return (
		<>
			{isShowing && (
				<p>
					showing
				</p>
			)}
			<button type="button" onClick={toggle}>
				Toggle
			</button>
		</>
	);
};

describe('useModal', () => {
	let sut;

	beforeEach(() => {
		sut = <TestComponent />;
	});

	it('should return isShowing = false by default', () => {
		const wrapper = shallow(sut);

		expect(wrapper.text()).not.toContain('showing');
	});

	it('should return isShowing = true after calling toggle once', () => {
		const wrapper = shallow(sut);

		wrapper.find('button').simulate('click');

		expect(wrapper.text()).toContain('showing');
	});

	it('should return isShowing = false after calling toggle twice', () => {
		const wrapper = shallow(sut);

		wrapper.find('button').simulate('click');
		wrapper.find('button').simulate('click');

		expect(wrapper.text()).not.toContain('showing');
	});
});
