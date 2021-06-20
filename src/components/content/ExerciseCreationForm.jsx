import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { isFormValid, validateField, validateForm } from 'lib/shared/formUtils';
import { hasMaxLength, hasMinLength, isRequired } from 'lib/shared/inputValidation';

import { PrimaryButton } from 'components/shared/buttons';
import { LabeledTextArea } from 'components/shared/form';
import { StyledDiv, StyledForm } from 'components/shared/styledElements';

import { form, formSubmit, responseDiv } from 'theme/contentEditionCommon/genericLayout';
import { GreatPrimer } from 'components/shared/typography';
import ResponseItem from './ResponseItem';

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
	content: '',
};

/**
 * @constant
 * @name validationRules
 * @description The validation rules for each field.
 *
 * @author Timothée Simon-Franza
 */
const validationRules = {
	instructions: {
		required: isRequired('required'),
		hasMinLength: hasMinLength(10, 'min_length'),
		hasMaxLength: hasMaxLength(300, 'max_length'),
	},
	explanation: {
		hasMaxLength: hasMaxLength(300, 'max_length'),
	},
};

/**
 * @constant
 * @name inputsDefinition
 * @description The form's input definition object.
 *
 * @author Christopher Walker
 */
const inputsDefinition = {
	instructions: { id: 'instructions', name: 'instructions', inputType: 'textarea', hasPlaceholder: true },
	explanation: { id: 'explanation', name: 'explanation', inputType: 'textarea', hasPlaceholder: true },
};

/**
 * @constant
 * @name inputsDefinition
 * @description The form's input definition object.
 *
 * @author Christopher Walker
 */
const responseFieldsDefinition = {
	answer1: { id: 'answer1', name: 'answer1', inputType: 'responseItem', hasPlaceholder: true, isCorrect: true },
	answer2: { id: 'answer2', name: 'answer2', inputType: 'responseItem', hasPlaceholder: true, isCorrect: false },
	answer3: { id: 'answer3', name: 'answer3', inputType: 'responseItem', hasPlaceholder: true, isCorrect: false },
};

/**
 * @name ExerciseCreationForm
 * @description A form component used to create a lesson.
 *
 * @author Christopher Walker
 *
 * @param {func} onSubmit The method to trigger on form submit.
 */
const ExerciseCreationForm = ({ onSubmit }) => {
	const { t } = useTranslation();
	const [formState, setFormState] = useState(initialState);
	const [errors, setErrors] = useState({});
	const fieldsRef = useRef({});
	const [validAnswer, setValidAnswer] = useState('answer1');

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
		const result = {
			statement: formState.instructions,
			explanation: formState.explanation,
			type: 'SingleChoice',
			answers: [
				{
					text: formState.answer1,
					valid: validAnswer === 'answer1',
				},
				{
					text: formState.answer2,
					valid: validAnswer === 'answer2',
				},
				{
					text: formState.answer3,
					valid: validAnswer === 'answer3',
				},
			],
		};
		onSubmit({ ...result });
	}, [formState, onSubmit, validAnswer]);

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

	const handleValidAnswerChange = useCallback((name) => {
		setValidAnswer(name);
	}, [setValidAnswer]);

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
			return t(`exercises.creation.form.fields.${fieldName}.validation_rules.${Object.values(errors[fieldName])?.[0]}`);
		}

		return '';
	};

	return (
		<StyledForm onSubmit={handleSubmit} {...form}>
			{Object.values(inputsDefinition).map(({ id, name, inputType = 'text', hasPlaceholder }) => (
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
					placeholder={hasPlaceholder ? t(`exercises.creation.form.fields.${name}.placeholder`) : undefined}
					ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
					defaultValue={formState[name]}
				>
					{t(`exercises.creation.form.fields.${name}.label`)}
				</LabeledTextArea>
			))}
			<StyledDiv {...responseDiv}>
				<GreatPrimer>{t('exercises.creation.responses')}</GreatPrimer>
				{Object.values(responseFieldsDefinition).map(({ id, name, hasPlaceholder, isCorrect }) => (
					<ResponseItem
						key={id}
						id={id}
						name={name}
						hasPlaceholder={hasPlaceholder}
						handleCheckedChanged={handleValidAnswerChange}
						handleChange={handleChange}
						handleBlur={handleBlur}
						hasError={errors[name] && Object.keys(errors[name])?.length > 0}
						errorText={getErrorMessageByFieldName(name)}
						checked={isCorrect}
					/>
				))}
			</StyledDiv>
			<PrimaryButton type="submit" {...formSubmit}>
				{t('exercises.creation.form.action.submit')}
			</PrimaryButton>
		</StyledForm>
	);
};

ExerciseCreationForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default ExerciseCreationForm;
