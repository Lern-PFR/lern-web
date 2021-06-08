/* istanbul ignore file */
import { act, fireEvent, render, screen } from '@testing-library/react';

/**
 * @function
 * @name appendField
 * @description Test if the given form can append fields with the given name
 *
 * @author Yann Hodiesne
 *
 * Note: this function should be awaited.
 *
 * @param {string} name : The name for the fields to look for.
 * @param {object} form : The form to test on.
 */
export default async (name, { prefix, sut }) => {
	render(sut);

	await act(async () => {
		fireEvent.click(screen.getByRole('button', { name: new RegExp(`${prefix}.inputs.${name}.append`) }));
		fireEvent.click(screen.getByRole('button', { name: new RegExp(`${prefix}.action`) }));
	});

	expect(screen.getAllByLabelText(new RegExp(`${prefix}.inputs.${name}.label`)).length).toEqual(2);
};
