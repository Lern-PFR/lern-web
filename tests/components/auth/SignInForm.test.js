import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { SignInForm } from 'components/auth/signin';
import { StaticRouter } from 'react-router';
import { containInput, checkRequired, matchSnapshot, setupFormWithRouter } from '../../testUtils/forms';

describe('Signup form', () => {
	let sut;

	beforeEach(() => {
		sut = setupFormWithRouter(<SignInForm onSubmit={jest.fn()} />, 'authentication.pages.signin.form');
	});

	afterEach(() => {
		cleanup();
		jest.restoreAllMocks();
	});

	describe('snapshot testing', () => {
		it('should match previous snapshot', () => {
			matchSnapshot(sut);
		});
	});

	describe('form inputs', () => {
		it.each([
			['username', 'text'],
			['password', 'password'],
		])('should contain the %s input typed as "%s"', (name, type) => {
			containInput(name, type, sut);
		});
	});

	describe('form inputs validation', () => {
		it.each([
			['username', 'username'],
			['password', 'password'],
		])('should trigger a "required" validation error if %s input is empty on submit', async (selector, name) => {
			await checkRequired(selector, name, sut);
		});
	});

	describe('onChange form validation', () => {
		// Note : we only test this on username since all fields have the same handleChange callback.

		it('should trigger validation onChange until form is submitted at least once', async () => {
			const { container } = render(<StaticRouter><SignInForm onSubmit={jest.fn()} /></StaticRouter>);
			const usernameInput = container.querySelector('input[name="username"]');

			await act(async () => {
				fireEvent.input(usernameInput, { target: 'abcd' });
				fireEvent.input(usernameInput, { target: '' });
			});

			expect(container.textContent).not.toMatch(new RegExp('authentication.pages.signin.form.fields.username.validation_rules.required'));
		});

		it('should trigger validation onChange after form has been submitted at least once', async () => {
			const { container } = render(<StaticRouter><SignInForm onSubmit={jest.fn()} /></StaticRouter>);
			const usernameInput = container.querySelector('input[name="username"]');

			await act(async () => {
				fireEvent.submit(container.querySelector('button[type="submit"]'));
				fireEvent.input(usernameInput, { target: 'abcd' });
				// Should not have a "required" validation error since it holds value.
				expect(container.textContent).not.toMatch(new RegExp('authentication.pages.signin.form.fields.username.validation_rules.required'));

				fireEvent.input(usernameInput, { target: '' });
			});

			expect(container.textContent).toMatch(new RegExp('authentication.pages.signin.form.fields.username.validation_rules.required'));
		});
	});

	describe('onSubmit', () => {
		it('should call the onSubmit prop method with the form\'s inputs\' values.', async () => {
			const mockedOnSubmit = jest.fn();
			const { container } = render(<StaticRouter><SignInForm onSubmit={mockedOnSubmit} /></StaticRouter>);

			const expectedFormData = {
				username: 'johnDoe',
				password: 'Azerty1998*',
			};

			await act(async () => {
				await Object.entries(expectedFormData).forEach(async ([name, value]) => {
					await fireEvent.input(container.querySelector(`input[name="${name}"]`), { target: { value } });
				});

				await fireEvent.submit(container.querySelector('button[type="submit"]'));
			});

			expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
			expect(mockedOnSubmit).toHaveBeenCalledWith(expectedFormData);
		});
	});
});
