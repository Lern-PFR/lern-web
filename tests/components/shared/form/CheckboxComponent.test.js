import { shallow } from 'enzyme';
import CheckboxComponent from 'components/shared/form/CheckboxComponent';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

	it('should call the onChange method', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<CheckboxComponent onChange={mockedOnChange} id="cb" />);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('checkbox'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should not call the onChange method when checkbox is disabled', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<CheckboxComponent onChange={mockedOnChange} disabled id="cb" />);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('checkbox'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});
});
