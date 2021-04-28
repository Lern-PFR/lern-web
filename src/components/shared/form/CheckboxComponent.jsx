import styled from 'styled-components';
import {
	border,
	display,
	layout,
	shadow,
	color,
} from 'styled-system';
import PropTypes from 'prop-types';
import { disabled as disabledStyle } from 'theme/buttonStyles';
import { checkboxStyle } from 'theme/formStyles';
import { jasmine, tuna } from 'theme/colors';

const StyledCheckboxComponent = styled('input')(
	border,
	display,
	layout,
	shadow,
	color,
	{
		...checkboxStyle,
		appearance: 'none',
		MozAppearance: 'none',
		WebkitAppearance: 'none',
		position: 'relative',
		borderColor: (({ disabled }) => (disabled ? tuna.default : 'initial')),
		backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : 'initial')),

		'&:focus': {
			outline: 'none',
		},

		'&::before': {
			position: 'absolute',
			top: 0,
			left: 0,
			content: '',
			fontSize: '12px',
			fontWeight: 700,
			color: 'transparent',
			display: 'inline-block',
			width: '100%',
			height: '100%',
			textAlign: 'center',
			borderColor: (({ disabled }) => (disabled ? tuna.default : 'initial')),
		},

		'&:indeterminate:before': {
			content: '"\\2013"',
			color: 'white',
			backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : 'black')),
			borderColor: (({ disabled }) => (disabled ? tuna.default : 'initial')),
		},

		'&:checked:before': {
			content: '"\\2713"',
			color: 'white',
			backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : 'black')),
			borderColor: (({ disabled }) => (disabled ? tuna.default : 'initial')),
		},
	},
);

/**
 * @name CheckboxComponent
 * @description A component used to display styled checkbox element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]		: Whether the checkbox is disabled.
 * @param {bool}	[checked]		: Whether the checkbox is checked.
 * @param {string}	id				: The id of the checkbox.
 */
const CheckboxComponent = ({ id, checked, disabled, indeterminate, ...otherProps }) => (
	<StyledCheckboxComponent
		{...otherProps}
		{...(disabled ? disabledStyle : {})}
		type="checkbox"
		indeterminate={indeterminate}
		disabled={disabled}
		defaultChecked={checked}
		id={id}
	/>
);

CheckboxComponent.propTypes = {
	id: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
	indeterminate: PropTypes.bool,
};

CheckboxComponent.defaultProps = {
	disabled: false,
	checked: false,
	indeterminate: false,
};

export default CheckboxComponent;
