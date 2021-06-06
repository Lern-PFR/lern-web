import { cleanup, act, fireEvent, render } from '@testing-library/react';
import { SignUpForm } from 'components/auth/signup';
import { containInput, checkRequired, matchSnapshot, setupForm, checkEmailPattern } from '../../testUtils/forms';
import { Patterns } from '../../testUtils/forms/patterns';

describe('Signup form', () => {
	let sut;

	beforeEach(() => {
		sut = setupForm(<SignUpForm onSubmit={jest.fn()} />, 'authentication.pages.signup.form');
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
			['firstname', 'text'],
			['lastname', 'text'],
			['email', 'email'],
			['nickname', 'text'],
			['password', 'password'],
			['password-confirmation', 'password'],
		])('should contain the %s input typed as "%s"', (name, type) => {
			containInput(name, type, sut);
		});
	});

	describe('form inputs validation', () => {
		it.each([
			['firstname', 'firstname'],
			['lastname', 'lastname'],
			['email', 'email'],
			['nickname', 'nickname'],
			['password', 'password'],
			['password-confirmation', 'password_confirmation'],
		])('should trigger a "required" validation error if %s input is empty on submit', async (selector, name) => {
			await checkRequired(selector, name, sut);
		});

		it.each([
			['type=email', 'email', Patterns.EMAIL],
		])('should trigger an "email" validation error if %s input is invalid', async (selector, name, pattern) => {
			await checkEmailPattern(selector, name, pattern, sut);
		});
	});

	describe('onChange form validation', () => {
		// Note : we only test this on firstname since all fields have the same handleChange callback.

		it('should trigger validation onChange until form is submitted at least once', async () => {
			const { container } = render(<SignUpForm onSubmit={jest.fn()} />);
			const firstnameInput = container.querySelector('input[name="firstname"]');

			await act(async () => {
				fireEvent.input(firstnameInput, { target: 'abcd' });
				fireEvent.input(firstnameInput, { target: '' });
			});

			expect(container.textContent).not.toMatch(new RegExp('authentication.pages.signup.form.fields.firstname.validation_rules.required'));
		});

		it('should trigger validation onChange after form has been submitted at least once', async () => {
			const { container } = render(<SignUpForm onSubmit={jest.fn()} />);
			const firstnameInput = container.querySelector('input[name="firstname"]');

			await act(async () => {
				fireEvent.submit(container.querySelector('button[type="submit"]'));
				fireEvent.input(firstnameInput, { target: 'abcd' });
				// Should not have a "required" validation error since it holds value.
				expect(container.textContent).not.toMatch(new RegExp('authentication.pages.signup.form.fields.firstname.validation_rules.required'));

				fireEvent.input(firstnameInput, { target: '' });
			});

			expect(container.textContent).toMatch(new RegExp('authentication.pages.signup.form.fields.firstname.validation_rules.required'));
		});
	});

	describe('onSubmit', () => {
		it('should call the onSubmit prop method with the form\'s inputs\' values.', async () => {
			const mockedOnSubmit = jest.fn();
			const { container } = render(<SignUpForm onSubmit={mockedOnSubmit} />);

			const expectedFormData = {
				firstname: 'john',
				lastname: 'doe',
				nickname: 'johnDoe',
				email: 'johndoe@domain.com',
				password: 'Azerty1998*',
				'password-confirmation': 'Azerty1998*',
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
