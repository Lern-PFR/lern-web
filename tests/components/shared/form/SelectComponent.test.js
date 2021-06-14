import { shallow } from 'enzyme';
import SelectComponent from 'components/shared/form/SelectComponent';
import { cleanup } from '@testing-library/react';

describe('SelectComponent', () => {
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
		const sut = (<SelectComponent id="select" options={options} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<SelectComponent disabled id="select" options={options} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for select with custom placeholder', () => {
		const sut = (<SelectComponent id="select" placeholder="Select an option" options={options} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for select with validation error', () => {
		const sut = (<SelectComponent id="select" hasError options={options} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for select with custom noOptionsMessage', () => {
		const sut = (<SelectComponent id="select" options={[]} noOptionsMessage="Sorry, we couldn't find any options" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for select with pre-selected option', () => {
		const sut = (<SelectComponent id="select" selectedOptions={options[1]} options={options} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for multiple option select', () => {
		const sut = (<SelectComponent id="select" multiple options={options} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for multiple option select with pre-selected options', () => {
		const sut = (<SelectComponent id="select" multiple options={options} selectedOptions={[options[0], options[2]]} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
