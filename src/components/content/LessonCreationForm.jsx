import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { isFormValid, validateField, validateForm } from 'lib/shared/formUtils';
import { hasMaxLength, hasMinLength, isRequired } from 'lib/shared/inputValidation';

import Editor from 'rich-markdown-editor';
import { PrimaryButton } from 'components/shared/buttons';
import { LabeledInput, LabeledTextArea } from 'components/shared/form';
import { StyledDiv, StyledForm } from 'components/shared/styledElements';
import SubTextComponent from 'components/shared/form/SubTextComponent';

import { layout, flexbox, color, typography } from 'styled-system';
import { form, formSubmit } from 'theme/contentEditionCommon/genericLayout';
import { labelStyle } from 'theme/formStyles';
import { brevier } from 'theme/textStyles';

const StyledEditor = styled(StyledDiv)({
	padding: '0 2em',
	border: 'solid 1px',
	borderRadius: '6px',
	borderColor: (({ isError }) => (isError ? 'red' : 'black')),
});

const StyledEditorLabel = styled('span')(
	{
		...labelStyle,
		...brevier,
		color: (({ isError }) => (isError ? 'red' : 'inherit')),
	},
	flexbox,
	color,
	typography,
	layout,
);

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
	content: '\\\n',
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
 * @name LessonCreationForm
 * @description A form component used to create a lesson.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} onSubmit The method to trigger on form submit.
 */
const LessonCreationForm = ({ onSubmit }) => {
	const { t } = useTranslation();
	const [formState, setFormState] = useState(initialState);
	const [errors, setErrors] = useState({});
	const fieldsRef = useRef({});

	const hasFormBeenSubmitted = useRef(false);

	const getEditorValue = useRef(null);
	const [editorError, setEditorError] = useState(false);

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

		const result = {
			...formState,
			content: getEditorValue.current !== null ? getEditorValue.current() : formState.content,
		};

		if (result.content.trim().length === 0) {
			setEditorError(true);

			return;
		}

		onSubmit(result);
	}, [formState, onSubmit]);

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

	const handleEditorChange = useCallback((getter) => {
		getEditorValue.current = getter;
	}, [getEditorValue]);

	const handleEditorBlur = useCallback(() => {
		if (getEditorValue.current !== null) {
			if (getEditorValue.current().trim().length === 0 && editorError !== true) {
				setEditorError(true);
			} else if (editorError !== false) {
				setEditorError(false);
			}
		}
	}, [editorError]);

	/**
	 *
	 * @param {*} fieldName
	 * @returns
	 */
	const getErrorMessageByFieldName = (fieldName) => {
		if (errors[fieldName] && Object.keys(errors[fieldName])?.length > 0) {
			return t(`lessons.creation.form.fields.${fieldName}.validation_rules.${Object.values(errors[fieldName])?.[0]}`);
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
							rows={6}
							hasError={errors[name] && Object.keys(errors[name])?.length > 0}
							errorText={getErrorMessageByFieldName(name)}
							placeholder={hasPlaceholder ? t(`lessons.creation.form.fields.${name}.placeholder`) : undefined}
							ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
							defaultValue={formState[name]}
						>
							{t(`lessons.creation.form.fields.${name}.label`)}
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
							placeholder={hasPlaceholder ? t(`lessons.creation.form.fields.${name}.placeholder`) : undefined}
							ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
							defaultValue={formState[name]}
						>
							{t(`lessons.creation.form.fields.${name}.label`)}
						</LabeledInput>
					)
			))}
			<StyledDiv>
				<StyledEditorLabel isError={editorError}>
					{t('lessons.creation.form.fields.content.label')}
				</StyledEditorLabel>
				<StyledEditor isError={editorError}>
					<Editor
						id="lesson-editor"
						placeholder={t('lessons.creation.form.fields.content.placeholder')}
						onChange={handleEditorChange}
						onBlur={handleEditorBlur}
					/>
				</StyledEditor>
				{editorError && (
					<SubTextComponent isErrorMessage>
						{t('lessons.creation.form.fields.content.validation_rules.required')}
					</SubTextComponent>
				)}
			</StyledDiv>
			<PrimaryButton type="submit" {...formSubmit}>
				{t('lessons.creation.form.action.submit')}
			</PrimaryButton>
		</StyledForm>
	);
};

LessonCreationForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default LessonCreationForm;
