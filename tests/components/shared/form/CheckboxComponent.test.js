import { shallow } from 'enzyme';
import CheckboxComponent from 'components/shared/form/CheckboxComponent';
import { cleanup } from '@testing-library/react';

describe('CheckboxComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<CheckboxComponent id="cb" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked state', () => {
		const sut = (<CheckboxComponent checked id="cb" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<CheckboxComponent disabled id="cb" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled and checked states', () => {
		const sut = (<CheckboxComponent disabled checked id="cb" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
