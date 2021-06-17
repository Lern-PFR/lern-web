import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { hasMaxLength, hasMinLength, isRequired } from 'lib/shared/inputValidation';
import { isFormValid, validateField, validateForm } from 'lib/shared/formUtils';
import { LabeledInput, LabeledTextArea } from 'components/shared/form';
import { PrimaryButton } from 'components/shared/buttons';
import { StyledForm } from 'components/shared/styledElements';

import { form, formSubmit } from 'theme/contentEditionCommon/genericLayout';

/**
 * @constant
 * @name initialState
 * @description The form's initial state value.
 *
 * @author Timothée Simon-Franza
 */
const initialState = {
	title: '',
	description: '',
};

/**
 * @constant
 * @name validationRules
 * @description The validation rules for each field.
 *
 * @author Timothée Simon-Franza
 */
const validationRules = {
	title: {
		required: isRequired('required'),
		hasMinLength: hasMinLength(3, 'min_length'),
		hasMaxLength: hasMaxLength(50, 'max_length'),
	},
	description: {
		required: isRequired('required'),
		hasMinLength: hasMinLength(10, 'min_length'),
		hasMaxLength: hasMaxLength(300, 'max_length'),
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
	title: { id: 'title', name: 'title', hasPlaceholder: true },
	description: { id: 'description', name: 'description', inputType: 'textarea', hasPlaceholder: true },
};

/**
 * @name SubjectCreationForm
 * @description A form component used to create a subject.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} onSubmit The method to trigger on form validation.
 */
const SubjectCreationForm = ({ onSubmit }) => {
	const { t } = useTranslation();
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
			return t(`subjects.creation.form.fields.${fieldName}.validation_rules.${Object.values(errors[fieldName])?.[0]}`);
		}

		return '';
	};

	return (
		<StyledForm onSubmit={handleSubmit} {...form}>
			{Object.values(inputsDefinition).map(({ id, name, inputType = 'text', hasPlaceholder }) => (
				inputType === 'textarea'
					? (
						<LabeledTextArea
							key={id}
							id={id}
							name={name}
							type={inputType}
							onChange={handleChange}
							onBlur={handleBlur}
							hasError={errors[name] && Object.keys(errors[name])?.length > 0}
							errorText={getErrorMessageByFieldName(name)}
							placeholder={hasPlaceholder ? t(`subjects.edition.form.fields.${name}.placeholder`) : undefined}
							ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
							defaultValue={formState[name]}
						>
							{t(`subjects.edition.form.fields.${name}.label`)}
						</LabeledTextArea>
					)
					: (
						<LabeledInput
							key={id}
							id={id}
							name={name}
							type={inputType}
							onChange={handleChange}
							onBlur={handleBlur}
							hasError={errors[name] && Object.keys(errors[name])?.length > 0}
							errorText={getErrorMessageByFieldName(name)}
							placeholder={hasPlaceholder ? t(`subjects.edition.form.fields.${name}.placeholder`) : undefined}
							ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
							defaultValue={formState[name]}
						>
							{t(`subjects.edition.form.fields.${name}.label`)}
						</LabeledInput>
					)
			))}
			<PrimaryButton type="submit" {...formSubmit}>
				{t('subjects.creation.form.action.submit')}
			</PrimaryButton>
		</StyledForm>
	);
};

SubjectCreationForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default SubjectCreationForm;
