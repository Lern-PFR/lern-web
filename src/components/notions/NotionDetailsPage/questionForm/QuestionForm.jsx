import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { StyledList } from 'components/shared/layout';
import { answersList, answerListItem, answerFormSubmitButton, validAnswerListItem } from 'theme/pages/notions/notionDetailsPage';
import { PrimaryButton } from 'components/shared/buttons';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import QuestionFormLabeledCheckbox from './QuestionFormLabeledCheckbox';
import QuestionFormLabeledRadioButton from './QuestionFormLabeledRadioButton';

// @TODO: Implement the "see explanation" button and its logic.

/**
 * @name QuestionForm
 * @description The form used by the user to answer a lesson's question if there is one.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	answers				The list of possible answers to the current questions.
 * @param {func}	onSubmit			The method to trigger upon submission of the form.
 * @param {bool}	[singleChoice]		Whether the question has multiple valid answers.
 * @param {array}	[submittedAnswer]	Optional submitted answer object. Set if the user has already submitted an answer.
 */
const QuestionForm = ({ answers, onSubmit, singleChoice, submittedAnswer, t }) => {
	const [formData, setFormData] = useState(submittedAnswer || []);

	/**
	 * @author Timothée Simon-Franza
	 * @description Ensures the formData state value is properly reset whenever the form's answers props change.
	 */
	useEffect(() => {
		setFormData(submittedAnswer || []);
	}, [answers, submittedAnswer]);

	/**
	 * @function
	 * @name handleSubmit
	 * @description An intermedierary method to handle form submission side effects and format data.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {object} event The form submission event object.
	 */
	const handleSubmit = (event) => {
		event.preventDefault();

		if (submittedAnswer) {
			return;
		}
		onSubmit(formData);
	};

	/**
	 * @function
	 * @name onAnswerSelectionChange
	 * @description Updates the local state with the new selected data.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {string|number} answerId The id of the clicked answer.
	 */
	const onAnswerSelectionChange = useCallback((answerId) => {
		if (singleChoice) {
			setFormData([answerId]);
		} else {
			const newFormData = formData.includes(answerId)
				? formData.filter((value) => value !== answerId)
				: [...formData, answerId];

			setFormData(newFormData);
		}
	}, [formData, singleChoice]);

	return (
		<form data-testid="question-form" onSubmit={handleSubmit}>
			<StyledList {...answersList}>
				{singleChoice && (
					answers.map(({ id, valid, text }) => (
						<QuestionFormLabeledRadioButton
							key={id}
							id={id}
							onChange={() => onAnswerSelectionChange(id)}
							name="answer"
							type={singleChoice ? 'radio' : 'checkbox'}
							defaultChecked={submittedAnswer && submittedAnswer.includes(id)}
							value={id}
							{...answerListItem}
							{...(submittedAnswer && valid ? validAnswerListItem : {})}
						>
							{text}
						</QuestionFormLabeledRadioButton>
					))
				)}

				{!singleChoice && (
					answers.map(({ id, valid, text }) => (
						<QuestionFormLabeledCheckbox
							key={id}
							id={id}
							onChange={() => onAnswerSelectionChange(id)}
							name="answer"
							type={singleChoice ? 'radio' : 'checkbox'}
							defaultChecked={submittedAnswer && submittedAnswer.includes(id)}
							value={id}
							{...answerListItem}
							{...(submittedAnswer && valid ? validAnswerListItem : {})}
						>
							{text}
						</QuestionFormLabeledCheckbox>
					))
				)}
			</StyledList>
			<PrimaryButton
				data-testid="question-form-submit-btn"
				type="submit"
				{...answerFormSubmitButton}
				disabled={(submittedAnswer && submittedAnswer !== []) || _.isEmpty(formData)}
			>
				{t('exercises.validate-answer')}
			</PrimaryButton>
		</form>
	);
};

QuestionForm.propTypes = {
	answers: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		text: PropTypes.string.isRequired,
		valid: PropTypes.bool.isRequired,
	})).isRequired,
	onSubmit: PropTypes.func.isRequired,
	singleChoice: PropTypes.bool,
	submittedAnswer: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
	),
	t: PropTypes.func.isRequired,
};

QuestionForm.defaultProps = {
	singleChoice: false,
	submittedAnswer: undefined,
};

export default withTranslation()(QuestionForm);
