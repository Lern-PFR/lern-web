import { shallow } from 'enzyme';
import TextAreaComponent from 'components/shared/form/TextAreaComponent';
import { cleanup } from '@testing-library/react';

describe('RadioButtonComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<TextAreaComponent id="ta" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<TextAreaComponent disabled id="ta" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for input with custom placeholder', () => {
		const sut = (<TextAreaComponent id="ta" placeholder="Enter details here" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for input with validation error', () => {
		const sut = (<TextAreaComponent id="ta" hasError />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for input with custom size', () => {
		const sut = (<TextAreaComponent id="ta" rows="4" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
