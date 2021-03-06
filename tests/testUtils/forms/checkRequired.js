/* istanbul ignore file */
import { act, fireEvent, render } from '@testing-library/react';

import { resolveSelector } from './selector';

/**
 * @function
 * @name checkRequired
 * @description Test if the given form contains an input with the required rule and its hint text
 *
 * @author Yann Hodiesne
 *
 * Note: this function should be awaited.
 *
 * @param {string} selector	: The name or the selector for the input to look for.
 * @param {string} name		: The name of the input to look for.
 * @param {object} form		: The form to test on.
 */
export default async (selector, name, { prefix, sut, mockOnSubmit }) => {
	const { container } = render(sut);

	const resolvedSelector = resolveSelector(selector);

	await act(async () => {
		fireEvent.input(
			container.querySelector(`input${resolvedSelector}`),
			{ target: { value: '' } }
		);
		await fireEvent.submit(container.querySelector('button[type="submit"]'));
	});

	expect(mockOnSubmit).not.toHaveBeenCalled();
	expect(container.textContent).toMatch(new RegExp(`${prefix}.fields.${name}.validation_rules.required`));
};
