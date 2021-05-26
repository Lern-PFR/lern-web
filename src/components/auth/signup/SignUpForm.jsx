import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { LabeledInput } from 'components/shared/form';
import { withTranslation } from 'react-i18next';
import { PrimaryButton } from 'components/shared/buttons';
import { input, submitButton } from 'theme/pages/auth/signUpPage';

/**
 * @constant
 * @name initialState
 * @description The form's initial state value.
 *
 * @author Timothée Simon-Franza
 */
const initialState = {
	lastname: '',
	firstname: '',
	email: '',
	nickname: '',
	password: '',
	passwordConfirmation: '',
};

/**
 * @constant
 * @name inputsDefinition
 * @description The form's input definition object.
 *
 * @author Timothée Simon-Franza
 */
const inputsDefinition = {
	firstname: { id: 'firstname', name: 'firstname', hasPlaceholder: true },
	lastname: { id: 'lastname', name: 'lastname', hasPlaceholder: true },
	email: { id: 'email', name: 'email', inputType: 'email', hasPlaceholder: true },
	nickname: { id: 'nickname', name: 'nickname', hasPlaceholder: true },
	password: { id: 'password', name: 'password', inputType: 'password' },
	passwordConfirmation: { id: 'password-confirmation', name: 'password-confirmation', inputType: 'password', labelKey: 'password_confirmation' },
};

/**
 * @name SignUpForm
 * @description The form used in the SignUp page to create an account.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func}	onSubmit	The method to trigger on form submission.
 * @param {func}	t			The translation method provided by the withTranslation HoC.
 */
const SignUpForm = ({ onSubmit, t }) => {
	const [formState, setFormState] = useState(initialState);

	/**
	 * @function
	 * @name handleSubmit
	 * @description Handles the form's submit event, performs form validation and calls the onSubmit method if all is in order.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {object} event The event originating from the form's submission.
	 */
	const handleSubmit = useCallback((event) => {
		event?.preventDefault();
		const { passwordConfirmation, ...userCreationData } = formState;

		onSubmit(userCreationData);
	}, [formState, onSubmit]);

	/**
	 * @function
	 * @name onChange
	 * @description Updates the formState object with the new value.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {string} name		The name of the input the event originated from.
	 * @param {string} value	The new value to update the state with.
	 */
	const onChange = (event) => {
		event.preventDefault();
		const { target: { name, value } } = event;

		setFormState((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<form onSubmit={handleSubmit}>
			{Object.values(inputsDefinition).map(({ id, name, inputType = 'text', labelKey = undefined, hasPlaceholder }) => (
				<LabeledInput
					key={id}
					id={id}
					name={name}
					type={inputType}
					onChange={onChange}
					placeholder={hasPlaceholder ? t(`authentication.pages.signup.form.fields.${labelKey ?? name}.placeholder`) : undefined}
					{...input}
				>
					{t(`authentication.pages.signup.form.fields.${labelKey ?? name}.label`)}
				</LabeledInput>
			))}
			<PrimaryButton type="submit" {...submitButton}>
				{t('authentication.pages.signup.form.action.submit')}
			</PrimaryButton>
		</form>
	);
};

SignUpForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default withTranslation()(SignUpForm);
