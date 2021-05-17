import PropTypes from 'prop-types';
import { BodyCopy } from 'components/shared/typography';

import { StyledList, StyledListItem } from 'components/shared/layout';
import { answersList, answerListItem, answerFormSubmitButton } from 'theme/pages/notions/notionDetailsPage';
import { PrimaryButton } from 'components/shared/buttons';
import { withTranslation } from 'react-i18next';

// @TODO: Implement a way to know if the form has been submitted.
// @TODO: Once the form has been submitted, disable the submit button.
// @TODO: Implement the "see explanation" button and its logic.

/**
 * @name QuestionForm
 * @description The form used by the user to answer a lesson's question if there is one.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	answers			The list of possible answers to the current questions.
 * @param {func}	onSubmit		The method to trigger upon submission of the form.
 * @param {bool}	[singleChoice]	Whether the question has multiple valid answers.
 */
const QuestionForm = ({ answers, onSubmit, singleChoice, t }) => {
	/**
	 * @name handleSubmit
	 * @description An intermedierary method to handle form submission side effects and format data.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {object} event The form submission event object.
	 */
	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(event);
	};

	return (
		<form data-testid="question-form" onSubmit={handleSubmit}>
			<StyledList {...answersList}>
				{answers.map(({ id, isValid, text }) => (
					<StyledListItem key={id} {...answerListItem}>
						<input id={id} type={singleChoice ? 'radio' : 'checkbox'} name="answer" value={id} isValid={isValid} />
						<BodyCopy tag="label" htmlFor={id}>{text}</BodyCopy>
					</StyledListItem>
				))}
			</StyledList>
			<PrimaryButton type="submit" {...answerFormSubmitButton}>{t('exercises.validate-answer')}</PrimaryButton>
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
	t: PropTypes.func.isRequired,
};

QuestionForm.defaultProps = {
	singleChoice: false,
};

export default withTranslation()(QuestionForm);
