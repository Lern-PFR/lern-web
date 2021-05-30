import { shallow } from 'enzyme';
import { LabeledSelect } from 'components/shared/form';
import { cleanup } from '@testing-library/react';

describe('LabeledSelect', () => {
	afterEach(() => {
		cleanup();
	});

	const options = [
		{
			value: 1,
			label: 'One',
		},
		{
			value: '2',
			label: 'Two',
		},
		{
			value: 3,
			label: 'Three',
		},
		{
			value: '4',
			label: 'Four',
		},
	];

	it('should match previous snapshot', () => {
		const sut = (<LabeledSelect id="select" options={options}>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<LabeledSelect disabled id="select" options={options}>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for select with custom placeholder', () => {
		const sut = (<LabeledSelect id="select" placeholder="Select an option" options={options}>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled select with hint', () => {
		const sut = (<LabeledSelect id="select" hintText="User hint">Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled select with validation error and disabled state', () => {
		const sut = (<LabeledSelect id="select" errorText="Validation error" hasError disabled>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled select with validation error', () => {
		const sut = (<LabeledSelect id="select" errorText="Validation error" hasError>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled select with custom noOptionsMessage', () => {
		const sut = (<LabeledSelect id="select" options={[]} noOptionsMessage="Sorry, we couldn't find any options">Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled select with pre-selected option', () => {
		const sut = (<LabeledSelect id="select" selectedOptions={options[1]} options={options}>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for multiple option labeled select', () => {
		const sut = (<LabeledSelect id="select" multiple options={options}>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for multiple option labeled select with pre-selected options', () => {
		const sut = (<LabeledSelect id="select" multiple options={options} selectedOptions={[options[0], options[2]]}>Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for labeled select with custom label text style', () => {
		const sut = (<LabeledSelect id="select" options={options} textStyle="bodycopy">Labeled select</LabeledSelect>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
