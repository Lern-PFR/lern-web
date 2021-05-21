import { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { StyledListItem } from 'components/shared/layout';
import { RadioButtonComponent } from 'components/shared/form';
import { BodyCopy } from 'components/shared/typography';
import { answerListItem, answerListItemInput } from 'theme/pages/notions/notionDetailsPage';

/**
 * @name QuestionFormLabeledRadioButton
 * @description A labeled radio button component to be used in the QuestionForm component.
 *
 * @author Timothée Simon-Franza
 *
 * @param {bool}	[disabled]		: Whether the radio button is disabled.
 * @param {bool}	[checked]		: Whether the radio button is checked.
 * @param {string}	id				: The id of the radio button.
 * @param {string}	name			: The name of the radio group this button is part of.
 * @param {string}	children		: Text to display in the label.
 */
const QuestionFormLabeledRadioButton = forwardRef(({ children, id, name, checked, disabled, ...otherProps }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	return (
		<StyledListItem {...answerListItem} {...otherProps}>
			<RadioButtonComponent name={name} disabled={disabled} checked={checked} id={id} ref={resolvedRef} {...answerListItemInput} />
			<BodyCopy tag="label" htmlFor={id} color={disabled ? tuna.darker1 : 'initial'}>
				{children}
			</BodyCopy>
		</StyledListItem>
	);
});

QuestionFormLabeledRadioButton.displayName = 'LabeledRadioButton';

QuestionFormLabeledRadioButton.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

QuestionFormLabeledRadioButton.defaultProps = {
	disabled: false,
	checked: false,
};

export default QuestionFormLabeledRadioButton;
