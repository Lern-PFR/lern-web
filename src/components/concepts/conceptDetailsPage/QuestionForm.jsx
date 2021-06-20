import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { StyledList } from 'components/shared/styledElements';
import { answersList, answerListItem, answerFormSubmitButton, validAnswerListItem } from 'theme/pages/concepts/conceptDetailsPage';
import { PrimaryButton } from 'components/shared/buttons';
import { withTranslation } from 'react-i18next';
import { LabeledCheckbox, LabeledRadioButton } from 'components/shared/form';

// @TODO: Implement the "see explanation" button and its logic.

/**
 * @name QuestionForm
 * @description The form used by the user to answer a lesson's question if there is one.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	answers						The list of possible answers to the current questions.
 * @param {func}	onSubmit					The method to trigger upon submission of the form.
 * @param {bool}	[singleChoice]				Whether the question has multiple valid answers.
 * @param {bool}	[answerHasBeenSubmitted]	Optional submitted answer object. Set if the user has already submitted an answer.
 */
const QuestionForm = ({ answers, onSubmit, singleChoice, answerHasBeenSubmitted, t }) => {
	const [formData, setFormData] = useState([]);

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

		if (answerHasBeenSubmitted || formData.length === 0) {
			return;
		}
		onSubmit(singleChoice ? formData[0] : formData);
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
					answers.map(({ id, valid, text, isUserAnswer }) => (
						<LabeledRadioButton
							key={id}
							id={id}
							onChange={() => onAnswerSelectionChange(id)}
							name="answer"
							checked={answerHasBeenSubmitted && isUserAnswer}
							value={id}
							disabled={answerHasBeenSubmitted}
							labelTextStyle="bodyCopy"
							{...answerListItem}
							{...(answerHasBeenSubmitted && valid ? validAnswerListItem : {})}
						>
							{text}
						</LabeledRadioButton>
					))
				)}

				{!singleChoice && (
					answers.map(({ id, valid, text, isUserAnswer }) => (
						<LabeledCheckbox
							key={id}
							id={id}
							onChange={() => onAnswerSelectionChange(id)}
							name="answer"
							checked={answerHasBeenSubmitted && isUserAnswer}
							value={id}
							disabled={answerHasBeenSubmitted}
							labelTextStyle="bodyCopy"
							{...answerListItem}
							{...(answerHasBeenSubmitted && valid ? validAnswerListItem : {})}
						>
							{text}
						</LabeledCheckbox>
					))
				)}
			</StyledList>
			<PrimaryButton
				data-testid="question-form-submit-btn"
				type="submit"
				{...answerFormSubmitButton}
				disabled={(answerHasBeenSubmitted) || formData.length === 0}
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
	answerHasBeenSubmitted: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

QuestionForm.defaultProps = {
	answerHasBeenSubmitted: false,
	singleChoice: false,
};

export default withTranslation()(QuestionForm);
