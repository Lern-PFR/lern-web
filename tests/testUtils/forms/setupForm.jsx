/* istanbul ignore file */
import { cloneElement } from 'react';
import { StaticRouter } from 'react-router-dom';

/**
 * @function
 * @name setupForm
 * @description Setup the environment needed to run tests on a form
 *
 * @author Yann Hodiesne
 *
 * @param {object} form		: The form to test on.
 * @param {string} prefix	: The prefix to use to match strings inside the form.
 *
 * @returns The current test object to give to other functions.
 */
export default (form, prefix) => {
	const mockOnSubmit = jest.fn((data) => Promise.resolve(data));

	const sut = cloneElement(form, {
		onSubmit: mockOnSubmit,
	});

	return {
		prefix,
		sut,
		mockOnSubmit,
	};
};

/**
 * @function
 * @name setupFormWithRouter
 * @description Setup the environment needed to run tests on a form wrapped in a StaticRouter component.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} form		: The form to test on.
 * @param {string} prefix	: The prefix to use to match string inside the form.
 *
 * @returns The current test object to give to other functions.
 */
export const setupFormWithRouter = (form, prefix) => {
	const mockOnSubmit = jest.fn((data) => Promise.resolve(data));

	const sut = (
		<StaticRouter>
			{ cloneElement(form, { onSubmit: mockOnSubmit }) }
		</StaticRouter>
	);

	return {
		prefix,
		sut,
		mockOnSubmit,
	};
};
