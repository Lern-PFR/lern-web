import { shallow } from 'enzyme';
import RadioButtonComponent from 'components/shared/form/RadioButtonComponent';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('RadioButtonComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<RadioButtonComponent id="cb" name="rg" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked state', () => {
		const sut = (<RadioButtonComponent checked id="cb" name="rg" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<RadioButtonComponent disabled id="cb" name="rg" />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the onChange method when clicking on the radio button', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<RadioButtonComponent onChange={mockedOnChange} id="cb" name="rg" />);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('radio'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should not call the onChange method when clicking on the disabled radio button', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<RadioButtonComponent onChange={mockedOnChange} disabled id="cb" name="rg" />);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('radio'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});
});
