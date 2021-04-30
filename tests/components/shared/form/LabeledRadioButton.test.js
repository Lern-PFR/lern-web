import { shallow } from 'enzyme';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabeledRadioButton } from 'components/shared/form';

describe('LabeledRadioButton', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<LabeledRadioButton id="lcb" name="rg">Primary button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked state', () => {
		const sut = (<LabeledRadioButton checked id="lcb" name="rg">Primary button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<LabeledRadioButton disabled id="lcb" name="rg">Primary button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked and disabled states', () => {
		const sut = (<LabeledRadioButton disabled checked id="lcb" name="rg">Primary button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the onChange method when clicking on checkbox', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} id="cb" name="rg">Primary button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('radio'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should call the onChange method when clicking on label', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} id="cb" name="rg">Primary button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByText('Primary button'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should not call the onChange method when clicking on disabled checkbox', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} disabled id="cb" name="rg">Primary button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('radio'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});

	it('should not call the onChange method when clicking on disabled label', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} disabled id="cb" name="rg">Primary button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByText('Primary button'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});
});
