import { StyledDiv } from 'components/shared/layout';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { forwardRef, useRef } from 'react';
import RadioButtonComponent from './RadioButtonComponent';
import LabelComponent from './LabelComponent';

/**
 * @name LabeledRadioButton
 * @description A component used to display styled radio button element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]		: Whether the radio button is disabled.
 * @param {bool}	[checked]		: Whether the radio button is checked.
 * @param {string}	id				: The id of the radio button.
 * @param {string}	name			: The name of the radio group this button is part of.
 * @param {string}	children		: Text to display in the label.
 */
const LabeledRadioButton = forwardRef(
	({ children, id, name, checked, disabled, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledDiv display="flex" alignItems="center">
				<RadioButtonComponent name={name} disabled={disabled} checked={checked} id={id} ref={resolvedRef} {...otherProps} />
				<LabelComponent forId={id} color={disabled ? tuna.darker1 : 'initial'}>
					{children}
				</LabelComponent>
			</StyledDiv>
		);
	}
);

LabeledRadioButton.displayName = 'LabeledRadioButton';

LabeledRadioButton.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

LabeledRadioButton.defaultProps = {
	disabled: false,
	checked: false,
};

export default LabeledRadioButton;
