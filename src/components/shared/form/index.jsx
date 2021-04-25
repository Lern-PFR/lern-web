import { StyledDiv } from 'components/shared/layout';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import CheckboxComponent from './CheckboxComponent';
import LabelComponent from './LabelComponent';
import LegendComponent from './LegendComponent';
import FieldsetComponent from './FieldsetComponent';
/**
 * @name LabeledCheckbox
 * @description A component used to display styled checkbox element.
 *
 * @param {bool}	[disabled]		: Whether the checkbox is disabled.
 * @param {bool}	[checked]		: Whether the checkbox is checked.
 * @param {string}	id				: The id of the checkbox.
 * @param {string}	children		: text to display in the label.
 */
const LabeledCheckbox = ({ children, id, checked, disabled, ...otherProps }) => (
	<StyledDiv {...otherProps} display="flex" alignItems="center">
		<CheckboxComponent disabled={disabled} checked={checked} id={id} />
		<LabelComponent element={id} color={disabled ? tuna.darker1 : 'initial'}>
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

export {
	LabeledCheckbox,
	CheckboxComponent,
	LabelComponent,
	LegendComponent,
	FieldsetComponent,
};
