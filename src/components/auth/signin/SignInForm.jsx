import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { PrimaryButton, OutlinedButton } from 'components/shared/buttons';
import { LabeledInput } from 'components/shared/form';
import { buttonsContainer, input } from 'theme/pages/auth/signInPage';
import { isRequired } from 'lib/shared/inputValidation';
import { isFormValid, validateField, validateForm } from 'lib/shared/formUtils';
import routes from 'routes';
import { Link } from 'components/shared/navigation';
import { StyledDiv } from 'components/shared/styledElements';

/**
 * @constant
 * @name initialState
 * @description The form's initial state value.
 *
 * @author Timothée Simon-Franza
 */
const initialState = {
	username: '',
	password: '',
};

/**
 * @constant
 * @name validationRules
 * @description The validation rules for each field.
 *
 * Note : the 'password-confirmation' field has an additional 'matchPassword' rule
 * 		defined in the component since it requires a ref defined at runtime.
 *
 * @author Timothée Simon-Franza
 */
const validationRules = {
	username: {
		required: isRequired('required'),
	},
	password: {
		required: isRequired('required'),
	},
};

/**
 * @constant
 * @name inputsDefinition
 * @description The form's input definition object.
 *
 * @author Timothée Simon-Franza
 */
const inputsDefinition = {
	username: { id: 'username', name: 'username', hasPlaceholder: true },
	password: { id: 'password', name: 'password', inputType: 'password' },
};

/**
 * @name SignInForm
 * @description The form used in the SignIn page to sign into the application.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} onSubmit	The method to trigger on form submission.
 * @param {func} t			The translation method provided by the withTranslation HoC.
 */
const SignInForm = ({ onSubmit, t }) => {
	const [formState, setFormState] = useState(initialState);
	const [errors, setErrors] = useState({});
	const fieldsRef = useRef({});
	const hasFormBeenSubmitted = useRef(false);

	/**
	 * @function
	 * @name handleSubmit
	 * @description Handles the form's submit event, performs validation and calls the onSubmit method if all is in order.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {object} event	The event originating from the form's submission.
	 */
	const handleSubmit = useCallback((event) => {
		event?.preventDefault();

		hasFormBeenSubmitted.current = true;
		const formValidationResult = validateForm(fieldsRef.current, validationRules);
		setErrors(formValidationResult);

		if (!isFormValid(formValidationResult)) {
			return;
		}

		onSubmit(formState);
	}, [formState, onSubmit, setErrors]);

	/**
	 * @function
	 * @name handleChange
	 * @description Updates the formState object with the new value.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {object} event				The onChange event.
	 * @param {object} event.target			The target which the onChange event originated from.
	 * @param {string} event.target.name	The name of the input the event originated from.
	 * @param {string} event.target.value	The new value to update the state with.
	 */
	const handleChange = useCallback((event) => {
		event.preventDefault();
		const { target: { name, value: newValue } } = event;

		setFormState((prevState) => ({ ...prevState, [name]: newValue }));

		// Prevents the validation error message to be displayed while the user types in for the first time.
		if (hasFormBeenSubmitted.current || errors[name]) {
			const { [name]: removedError, ...rest } = errors; 								// Removes previous errors for current field.
			setErrors({ ...rest, [name]: validateField(newValue, validationRules[name]) });	// Performs validation check on the field and updates the errors state.
		}
	}, [errors, setErrors, setFormState]);

	/**
	 * @function
	 * @name handleBlur
	 * @description Performs validation checks for the input generating the blur event.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {object} event				The onBlur event.
	 * @param {object} event.target			The target which the onBlur event originated from.
	 * @param {string} event.target.name	The name of the input the event originated from.
	 * @param {string} event.target.value	The current value of the input the event originated from.
	 */
	const handleBlur = useCallback((event) => {
		const { target: { name, value } } = event;

		// Removes previous errors for current field.
		const { [name]: removedError, ...rest } = errors;

		// Performs validation check on the field and updates the errors state.
		setErrors({ ...rest, [name]: validateField(value, validationRules[name]) });
	}, [errors, setErrors]);

	/**
	 *
	 * @param {*} fieldName
	 * @returns
	 */
	const getErrorMessageByFieldName = (fieldName) => {
		if (errors[fieldName] && Object.keys(errors[fieldName])?.length > 0) {
			return t(`authentication.pages.signin.form.fields.${fieldName}.validation_rules.${Object.values(errors[fieldName])?.[0]}`);
		}

		return '';
	};

	// @TODO: add a redirection to the ForgottenPassword page.
	return (
		<form onSubmit={handleSubmit}>
			{Object.values(inputsDefinition).map(({ id, name, inputType = 'text', hasPlaceholder }) => (
				<LabeledInput
					key={id}
					id={id}
					name={name}
					type={inputType}
					onChange={handleChange}
					onBlur={handleBlur}
					hasError={errors[name] && Object.keys(errors[name])?.length > 0}
					errorText={getErrorMessageByFieldName(name)}
					placeholder={hasPlaceholder ? t(`authentication.pages.signin.form.fields.${name}.placeholder`) : undefined}
					ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
					{...input}
				>
					{t(`authentication.pages.signin.form.fields.${name}.label`)}
				</LabeledInput>
			))}
			<StyledDiv {...buttonsContainer}>
				<PrimaryButton type="submit">
					{t('authentication.pages.signin.form.action.submit')}
				</PrimaryButton>
				<OutlinedButton type="button">
					<Link to={routes.auth.signup}>{t('authentication.pages.signin.links.signup')}</Link>
				</OutlinedButton>
			</StyledDiv>
		</form>
	);
};

SignInForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default withTranslation()(SignInForm);
