import { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { StyledListItem } from 'components/shared/layout';
import { CheckboxComponent } from 'components/shared/form';
import { BodyCopy } from 'components/shared/typography';
import { answerListItem } from 'theme/pages/notions/notionDetailsPage';

/**
 * @name QuestionFormLabeledCheckbox
 * @description A labeled checkbox component to be used in the QuestionForm component.
 *
 * @author Timothée Simon-Franza
 *
 * @param {bool}	[disabled]		: Whether the checkbox is disabled.
 * @param {bool}	[checked]		: Whether the checkbox is checked.
 * @param {string}	id				: The id of the checkbox.
 * @param {string}	children		: Text to display in the label.
 */
const QuestionFormLabeledCheckbox = forwardRef(({ children, id, checked, disabled, ...otherProps }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	return (
		<StyledListItem {...answerListItem} {...otherProps}>
			<CheckboxComponent disabled={disabled} checked={checked} id={id} ref={resolvedRef} />
			<BodyCopy tag="label" htmlFor={id} color={disabled ? tuna.darker1 : 'initial'}>
				{children}
			</BodyCopy>
		</StyledListItem>
	);
});

QuestionFormLabeledCheckbox.displayName = 'LabeledCheckbox';

QuestionFormLabeledCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

QuestionFormLabeledCheckbox.defaultProps = {
	disabled: false,
	checked: false,
};

export default QuestionFormLabeledCheckbox;
