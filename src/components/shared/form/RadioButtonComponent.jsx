import styled from 'styled-components';
import {
	border,
	display,
	layout,
	shadow,
	space,
	color,
} from 'styled-system';
import PropTypes from 'prop-types';
import { disabled as disabledStyle } from 'theme/buttonStyles';
import { radioButtonStyle } from 'theme/formStyles';
import { forwardRef, useRef } from 'react';

const StyledRadioButtonComponent = styled('input')(
	border,
	display,
	layout,
	shadow,
	space,
	color,
	{ ...radioButtonStyle },
);

/**
 * @name RadioButtonComponent
 * @description A component used to display styled radio button element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]		: Whether the radio button is disabled.
 * @param {bool}	[checked]		: Whether the radio button is checked.
 * @param {string}	name			: The name of the radio group this button is part of.
 * @param {string}	id				: The id of the radio button.
 */
const RadioButtonComponent = forwardRef(
	({ id, name, checked, disabled, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledRadioButtonComponent
				{...(disabled ? disabledStyle : {})}
				type="radio"
				disabled={disabled}
				defaultChecked={checked}
				id={id}
				name={name}
				ref={resolvedRef}
				{...otherProps}
			/>
		);
	}
);

RadioButtonComponent.displayName = 'RadioButtonComponent';

RadioButtonComponent.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

RadioButtonComponent.defaultProps = {
	disabled: false,
	checked: false,
};

export default RadioButtonComponent;
