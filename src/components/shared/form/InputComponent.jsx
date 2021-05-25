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
import { inputStyle, errorInputStyle } from 'theme/formStyles';
import { forwardRef, useRef } from 'react';

const StyledInputComponent = styled('input')(
	{ ...inputStyle },
	border,
	display,
	layout,
	shadow,
	color,
);

/**
 * @name InputComponent
 * @description A component used to display styled input element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]			: Whether the input is disabled.
 * @param {string}	[type]				: The type of input, default is text.
 * @param {string}	[placeholder]		: Placeholder text for this input.
 * @param {bool}	[isErrorMessage]	: Whether the input contains a validation error.
 * @param {string}	id					: The id of the input.
 */

const InputComponent = forwardRef(
	({ id, disabled, placeholder, type, isErrorMessage, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledInputComponent
				{...(disabled ? disabledStyle : {})}
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				id={id}
				ref={resolvedRef}
				{...(isErrorMessage ? errorInputStyle : {})}
				{...otherProps}
			/>
		);
	}
);

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	isErrorMessage: PropTypes.bool,
	type: PropTypes.string,
};

InputComponent.defaultProps = {
	disabled: false,
	isErrorMessage: false,
	type: 'text',
	placeholder: '',
};

export default InputComponent;
