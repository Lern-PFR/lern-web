import styled from 'styled-components';
import {
	border,
	color,
	display,
	flexbox,
	layout,
	margin,
	padding,
	position,
} from 'styled-system';
import PropTypes from 'prop-types';
import { disabled as disabledStyle } from 'theme/buttonStyles';

const StyledCheckboxComponent = styled('input')(
	{
		cursor: 'pointer',
	},
	border,
	color,
	display,
	flexbox,
	layout,
	margin,
	padding,
	position,
);

/**
 * @name CheckboxComponent
 * @description A component used to display styled checkbox element.
 *
 * @param {bool}	[disabled]		: Whether the checkbox is disabled.
 * @param {bool}	[checked]		: Whether the checkbox is checked.
 * @param {string}	id				: The id of the checkbox.
 */
const CheckboxComponent = ({ id, checked, disabled, ...otherProps }) => (
	<StyledCheckboxComponent {...otherProps} {...(disabled ? disabledStyle : {})} type="checkbox" disabled={disabled} defaultChecked={checked} id={id} />
);

CheckboxComponent.propTypes = {
	id: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

CheckboxComponent.defaultProps = {
	disabled: false,
	checked: false,
};

export default CheckboxComponent;
