import { cloneElement } from 'react';
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

const StyledCheckboxComponent = styled('checkbox')(
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
 */
const CheckboxComponent = ({ disabled, ...otherProps }) => (
	<StyledCheckboxComponent {...otherProps}>
		{cloneElement({ ...(disabled ? disabledStyle : {}) })}
	</StyledCheckboxComponent>
);

CheckboxComponent.propTypes = {
	disabled: PropTypes.bool,
};

CheckboxComponent.defaultProps = {
	disabled: false,
};

export default CheckboxComponent;
