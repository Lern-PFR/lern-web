import { shallow } from 'enzyme';
import { LabeledInput } from 'components/shared/form';
import { cleanup } from '@testing-library/react';

describe('RadioButtonComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<LabeledInput id="inp">Labeled Input</LabeledInput>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<LabeledInput disabled id="inp">Labeled Input</LabeledInput>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled input with custom placeholder', () => {
		const sut = (<LabeledInput id="inp" placeholder="Enter details here">Labeled Input</LabeledInput>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled input with hint', () => {
		const sut = (<LabeledInput id="inp" hintText="User hint">Labeled Input</LabeledInput>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled input with validation error and disabled state', () => {
		const sut = (<LabeledInput id="inp" errorText="Validation error" hasError disabled>Labeled Input</LabeledInput>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled input with validation error', () => {
		const sut = (<LabeledInput id="inp" errorText="Validation error" hasError>Labeled Input</LabeledInput>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled input with specified type', () => {
		const sut = (<LabeledInput id="inp" type="password">Labeled Input</LabeledInput>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
