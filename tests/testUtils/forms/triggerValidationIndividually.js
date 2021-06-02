/* istanbul ignore file */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getValidValue } from './patterns';

/**
 * @function
 * @name triggerValidationIndividually
 * @description Test if the given form triggers validation individually on a given multi-field
 *
 * @author Yann Hodiesne
 *
 * Note: this function should be awaited.
 *
 * @param {string} name : The name for the fields to look for.
 * @param {string} type : The type of the pattern to test.
 * @param {object} form : The form to test on.
 */
export default async (name, type, { prefix, sut }) => {
	render(sut);

	await act(async () => {
		fireEvent.click(screen.getByRole('button', { name: new RegExp(`${prefix}.inputs.${name}.append`) }));
		await waitFor(() => expect(screen.getAllByLabelText(new RegExp(`${prefix}.inputs.${name}.label`)).length).toEqual(2));

		fireEvent.input(screen.getAllByRole('textbox', { name: new RegExp(`${prefix}.inputs.${name}.label`) })[0], {
			target: { value: getValidValue(type) },
		});
		fireEvent.input(screen.getAllByRole('textbox', { name: new RegExp(`${prefix}.inputs.${name}.label`) })[1], {
			target: { value: '' },
		});
		fireEvent.click(screen.getByRole('button', { name: new RegExp(`${prefix}.action`) }));
	});

	expect(screen.getAllByText(new RegExp(`${prefix}.inputs.${name}.validation_errors.required`)).length).toEqual(1);
};
