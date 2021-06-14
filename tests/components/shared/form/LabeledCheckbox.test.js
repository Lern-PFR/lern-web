import { shallow } from 'enzyme';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabeledCheckbox } from 'components/shared/form';

describe('LabeledCheckbox', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<LabeledCheckbox id="lcb">Labeled Checkbox</LabeledCheckbox>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked state', () => {
		const sut = (<LabeledCheckbox checked id="lcb">Labeled Checkbox</LabeledCheckbox>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<LabeledCheckbox disabled id="lcb">Labeled Checkbox</LabeledCheckbox>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checked and disabled states', () => {
		const sut = (<LabeledCheckbox disabled checked id="lcb">Labeled Checkbox</LabeledCheckbox>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for checkbox with custom label text style', () => {
		const sut = (<LabeledCheckbox id="lcb" textStyle="bodycopy">Labeled Checkbox</LabeledCheckbox>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the onChange method when clicking on checkbox', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledCheckbox onChange={mockedOnChange} id="cb">Labeled Checkbox</LabeledCheckbox>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('checkbox'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should call the onChange method when clicking on label', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledCheckbox onChange={mockedOnChange} id="cb">Labeled Checkbox</LabeledCheckbox>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByText('Labeled Checkbox'));
		});

		expect(mockedOnChange).toHaveBeenCalled();
	});

	it('should not call the onChange method when clicking on disabled checkbox', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledCheckbox onChange={mockedOnChange} disabled id="cb">Labeled Checkbox</LabeledCheckbox>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('checkbox'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});

	it('should not call the onChange method when clicking on disabled label', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (<LabeledCheckbox onChange={mockedOnChange} disabled id="cb">Labeled Checkbox</LabeledCheckbox>);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByText('Labeled Checkbox'));
		});

		expect(mockedOnChange).not.toHaveBeenCalled();
	});
});
