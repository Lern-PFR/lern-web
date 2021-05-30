import { forwardRef, useRef, useMemo } from 'react';
import styled from 'styled-components';
import {
	border,
	display,
	layout,
	shadow,
	color,
} from 'styled-system';
import PropTypes from 'prop-types';
import { inputStyle, errorInputStyle, disabledInputStyle } from 'theme/formStyles';
import { getTypographyStyleByName } from '../typography';

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
 * @param {string}	[textStyle]			The text style for this input.
 * @param {bool}	[disabled]			: Whether the input is disabled.
 * @param {string}	[type]				: The type of input, default is text.
 * @param {string}	[placeholder]		: Placeholder text for this input.
 * @param {bool}	[hasError]			: Whether the input contains a validation error.
 * @param {string}	id					: The id of the input.
 */

const InputComponent = forwardRef(
	({ textStyle, id, disabled, placeholder, type, hasError, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;
		const typographyStyle = useMemo(() => getTypographyStyleByName(textStyle), [textStyle]);

		return (
			<StyledInputComponent
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				id={id}
				ref={resolvedRef}
				{...typographyStyle}
				{...(hasError ? errorInputStyle : {})}
				{...(disabled ? disabledInputStyle : {})}
				{...otherProps}
			/>
		);
	}
);

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {
	id: PropTypes.string.isRequired,
	textStyle: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	type: PropTypes.string,
};

InputComponent.defaultProps = {
	textStyle: 'brevier',
	disabled: false,
	hasError: false,
	type: 'text',
	placeholder: '',
};

export default InputComponent;
