import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { hasMaxLength, hasMinLength, isRequired } from 'lib/shared/inputValidation';
import { isFormValid, validateField, validateForm } from 'lib/shared/formUtils';
import { StyledForm } from 'components/shared/styledElements';
import { form, formSubmit } from 'theme/contentEditionCommon/genericLayout';
import { LabeledInput, LabeledSelect, LabeledTextArea } from 'components/shared/form';
import { PrimaryButton } from 'components/shared/buttons';

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
	content: {
		required: isRequired('required'),
	},
	order: {
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
	title: { id: 'title', name: 'title', hasPlaceholder: true },
	description: { id: 'description', name: 'description', inputType: 'textarea', hasPlaceholder: true },
	content: { id: 'content', name: 'content', inputType: 'textarea', hasPlaceholder: false },
	order: { id: 'order', name: 'order', inputType: 'select', hasPlaceholder: false },
};

/**
 * @name LessonEditionForm
 * @description A form component used to edit a lesson.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object}	lesson				The lesson to edit.
 * @param {array}	lessonOrderOptions	Options to provide the order select input.
 * @param {func}	onSubmit			The method to trigger on form submission.
 */
const LessonEditionForm = ({ lesson, conceptOrderOptions, onSubmit }) => {
	const initialState = useMemo(() => ({
		title: lesson.title,
		description: lesson.description,
		content: lesson.content,
		order: (lesson.order !== null && lesson.order !== undefined) ? { label: lesson.order, value: lesson.order } : null,
	}), [lesson]);

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
	 * @param {object} event The event originating from the form's submission.
	 */
	const handleSubmit = useCallback((event) => {
		event?.preventDefault();

		hasFormBeenSubmitted.current = true;
		const formValidationResult = validateForm(fieldsRef.current, validationRules);
		setErrors(formValidationResult);

		if (!isFormValid(formValidationResult)) {
			return;
		}

		const result = {
			...formState,
			order: formState.order.value ?? formState.order,
		};

		onSubmit(result);
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
	 * @name handleOrderSelectChange
	 * @description An intermediate handleChange method for the order select field.
	 *
	 * @author Timothée Simon-Franza
	 */
	const handleOrderSelectChange = useCallback(({ value }) => {
		handleChange({ target: { name: 'order', value } });
	}, [handleChange]);

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
	 * @function
	 * @name getErrorMessageByFieldName
	 * @description Returns the translated validation error message for the provided fieldname if it exists.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {string} fieldName The name of the field we want the validation message of.
	 *
	 * @returns {string}
	 */
	const getErrorMessageByFieldName = (fieldName) => {
		if (errors[fieldName] && Object.keys(errors[fieldName])?.length > 0) {
			return t(`lessons.edition.form.fields.${fieldName}.validation_rules.${Object.values(errors[fieldName])?.[0]}`);
		}

		return '';
	};

	return (
		<StyledForm onSubmit={handleSubmit} {...form}>
			{Object.values(inputsDefinition).map(({ id, name, inputType = 'text', hasPlaceholder }) => {
				switch (inputType) {
					case 'textarea': {
						return (
							<LabeledTextArea
								key={id}
								id={id}
								name={name}
								type={inputType}
								onChange={handleChange}
								rows={6}
								onBlur={handleBlur}
								hasError={errors[name] && Object.keys(errors[name])?.length > 0}
								errorText={getErrorMessageByFieldName(name)}
								placeholder={hasPlaceholder ? t(`lessons.edition.form.fields.${name}.placeholder`) : undefined}
								ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
								defaultValue={formState[name]}
							>
								{t(`lessons.edition.form.fields.${name}.label`)}
							</LabeledTextArea>
						);
					}
					case 'select': {
						return (
							<LabeledSelect
								key={id}
								id={id}
								name={name}
								type={inputType}
								onChange={handleOrderSelectChange}
								onBlur={handleBlur}
								options={conceptOrderOptions}
								hasError={errors[name] && Object.keys(errors[name])?.length > 0}
								errorText={getErrorMessageByFieldName(name)}
								placeholder={hasPlaceholder ? t(`lessons.edition.form.fields.${name}.placeholder`) : undefined}
								ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
								defaultValue={formState[name]}
								required
							>
								{t(`lessons.edition.form.fields.${name}.label`)}
							</LabeledSelect>
						);
					}
					default: {
						return (
							<LabeledInput
								key={id}
								id={id}
								name={name}
								type={inputType}
								onChange={handleChange}
								onBlur={handleBlur}
								hasError={errors[name] && Object.keys(errors[name])?.length > 0}
								errorText={getErrorMessageByFieldName(name)}
								placeholder={hasPlaceholder ? t(`lessons.edition.form.fields.${name}.placeholder`) : undefined}
								ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
								defaultValue={formState[name]}
							>
								{t(`lessons.edition.form.fields.${name}.label`)}
							</LabeledInput>
						);
					}
				}
			})}
			<PrimaryButton type="submit" {...formSubmit}>
				{t('lessons.edition.form.action.submit')}
			</PrimaryButton>
		</StyledForm>
	);
};

LessonEditionForm.propTypes = {
	lesson: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		order: PropTypes.number.isRequired,
	}).isRequired,
	lessonOrderOptions: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
			]).isRequired,
			label: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.node,
			]).isRequired,
		}),
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default LessonEditionForm;
