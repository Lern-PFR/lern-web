import { shallow } from 'enzyme';
import { LabeledTextArea } from 'components/shared/form';
import { cleanup } from '@testing-library/react';

describe('RadioButtonComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<LabeledTextArea id="ta">Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<LabeledTextArea disabled id="ta">Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled TextArea with custom placeholder', () => {
		const sut = (<LabeledTextArea id="ta" placeholder="Enter details here">Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled TextArea with hint', () => {
		const sut = (<LabeledTextArea id="ta" hintText="User hint">Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled TextArea with validation error and disabled state', () => {
		const sut = (<LabeledTextArea id="ta" errorText="Validation error" hasError disabled>Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled TextArea with validation error', () => {
		const sut = (<LabeledTextArea id="ta" errorText="Validation error" hasError>Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled TextArea with custom size', () => {
		const sut = (<LabeledTextArea id="ta" rows="5">Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled TextArea with custom label text style', () => {
		const sut = (<LabeledTextArea id="ta" textStyle="bodycopy">Labeled TextArea</LabeledTextArea>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
