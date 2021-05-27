import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { LabeledInput } from 'components/shared/form';
import { withTranslation } from 'react-i18next';
import { PrimaryButton } from 'components/shared/buttons';
import { input, submitButton } from 'theme/pages/auth/signUpPage';
import { hasMaxLength, hasMinLength, isEmailAddress, isRequired } from 'lib/shared/inputValidation';
import { isFormValid, validateField, validateForm } from 'lib/shared/formUtils';
import _ from 'lodash';

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
	'password-confirmation': '',
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
	firstname: {
		required: isRequired('required'),
		hasMinLength: hasMinLength(3, 'min_length'),
		hasMaxLength: hasMaxLength(50, 'max_length'),
	},
	lastname: {
		required: isRequired('required'),
		hasMinLength: hasMinLength(3, 'min_length'),
		hasMaxLength: hasMaxLength(100, 'max_length'),
	},
	email: {
		required: isRequired('required'),
		format: isEmailAddress('email_format'),
	},
	nickname: {
		required: isRequired('required'),
		hasMinLength: hasMinLength(3, 'min_length'),
		hasMaxLength: hasMaxLength(50, 'max_length'),
	},
	password: {
		required: isRequired('required'),
		hasMinLength: hasMinLength(8, 'min_length'),
		hasMaxLength: hasMaxLength(100, 'max_length'),
	},
	'password-confirmation': {
		required: isRequired('required'),
		hasMinLength: hasMinLength(8, 'min_length'),
		hasMaxLength: hasMaxLength(100, 'max_length'),
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
	firstname: { id: 'firstname', name: 'firstname', hasPlaceholder: true },
	lastname: { id: 'lastname', name: 'lastname', hasPlaceholder: true },
	email: { id: 'email', name: 'email', inputType: 'email', hasPlaceholder: true },
	nickname: { id: 'nickname', name: 'nickname', hasPlaceholder: true },
	password: { id: 'password', name: 'password', inputType: 'password' },
	'password-confirmation': { id: 'password-confirmation', name: 'password-confirmation', inputType: 'password', labelKey: 'password_confirmation' },
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
	const [errors, setErrors] = useState({});
	const fieldsRef = useRef({});

	validationRules['password-confirmation'] = {
		...validationRules['password-confirmation'],
		matchPassword: (value) => (_.isEqual(value, fieldsRef.current?.password?.value) ? '' : 'match_password'),
	};

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

		const formValidationResult = validateForm(fieldsRef.current, validationRules);
		setErrors(formValidationResult);

		if (!isFormValid(errors)) {
			return;
		}

		// Removes the 'password-confirmation' field value from the object sent to the onSubmit method.
		const { 'password-confirmation': passwordConf, ...userCreationData } = formState;

		onSubmit(userCreationData);
	}, [errors, formState, onSubmit]);

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
	const handleChange = (event) => {
		event.preventDefault();
		const { target: { name, value: newValue } } = event;

		setFormState((prevState) => ({ ...prevState, [name]: newValue }));

		// Removes previous errors for current field.
		const { [name]: removedError, ...rest } = errors;
		// Performs validation check on the field and updates the errors state.
		setErrors({ ...rest, [name]: validateField(newValue, validationRules[name]) });
	};

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
	const handleBlur = (event) => {
		const { target: { name, value } } = event;

		// Removes previous errors for current field.
		const { [name]: removedError, ...rest } = errors;

		// Performs validation check on the field and updates the errors state.
		setErrors({ ...rest, [name]: validateField(value, validationRules[name]) });
	};

	/**
	 *
	 * @param {*} fieldName
	 * @returns
	 */
	const getErrorMessageByFieldName = (fieldName, fieldLabelKey = undefined) => {
		if (errors[fieldName] && Object.keys(errors[fieldName])?.length > 0) {
			return t(`authentication.pages.signup.form.fields.${fieldLabelKey ?? fieldName}.validation_rules.${Object.values(errors[fieldName])?.[0]}`);
		}

		return '';
	};

	return (
		<form onSubmit={handleSubmit}>
			{Object.values(inputsDefinition).map(({ id, name, inputType = 'text', labelKey = undefined, hasPlaceholder }) => (
				<LabeledInput
					key={id}
					id={id}
					name={name}
					type={inputType}
					onChange={handleChange}
					onBlur={handleBlur}
					hasError={errors[name] && Object.keys(errors[name])?.length > 0}
					errorText={getErrorMessageByFieldName(name, labelKey)}
					placeholder={hasPlaceholder ? t(`authentication.pages.signup.form.fields.${labelKey ?? name}.placeholder`) : undefined}
					ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
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
