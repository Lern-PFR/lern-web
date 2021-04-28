import { StyledDiv } from 'components/shared/layout';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import CheckboxComponent from './CheckboxComponent';
import LabelComponent from './LabelComponent';

/**
 * @name LabeledCheckbox
 * @description A component used to display styled checkbox element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]		: Whether the checkbox is disabled.
 * @param {bool}	[checked]		: Whether the checkbox is checked.
 * @param {string}	id				: The id of the checkbox.
 * @param {string}	children		: text to display in the label.
 */
const LabeledCheckbox = ({ children, id, checked, disabled, ...otherProps }) => (
	<StyledDiv display="flex" alignItems="center">
		<CheckboxComponent {...otherProps} disabled={disabled} checked={checked} id={id} />
		<LabelComponent forId={id} color={disabled ? tuna.darker1 : 'initial'}>
			{children}
		</LabelComponent>
	</StyledDiv>
);

LabeledCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

LabeledCheckbox.defaultProps = {
	disabled: false,
	checked: false,
};

export default LabeledCheckbox;
