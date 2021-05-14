import { shallow } from 'enzyme';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabeledRadioButton } from 'components/shared/form';

describe('LabeledRadioButton', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<LabeledRadioButton id="lcb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked state', () => {
		const sut = (<LabeledRadioButton checked id="lcb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<LabeledRadioButton disabled id="lcb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked and disabled states', () => {
		const sut = (<LabeledRadioButton disabled checked id="lcb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the onChange method when clicking on the radio button', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} id="cb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('radio'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should call the onChange method when clicking on the label', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} id="cb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByText('Labeled Radio Button'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should not call the onChange method when clicking on the disabled radio button', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} disabled id="cb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('radio'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});

	it('should not call the onChange method when clicking on the disabled label', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledRadioButton onChange={mockedOnChange} disabled id="cb" name="rg">Labeled Radio Button</LabeledRadioButton>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByText('Labeled Radio Button'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});
});
