import { shallow } from 'enzyme';
import InputComponent from 'components/shared/form/InputComponent';
import { cleanup } from '@testing-library/react';

describe('RadioButtonComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<InputComponent id="inp" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<InputComponent disabled id="inp" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for input with custom placeholder', () => {
		const sut = (<InputComponent id="inp" placeholder="Enter details here" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for input with validation error', () => {
		const sut = (<InputComponent id="inp" hasError />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for input with specified type', () => {
		const sut = (<InputComponent id="inp" type="password" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
