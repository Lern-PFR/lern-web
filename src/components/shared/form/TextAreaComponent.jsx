import styled from 'styled-components';
import {
	border,
	display,
	layout,
	shadow,
	color,
} from 'styled-system';
import PropTypes from 'prop-types';
import { errorInputStyle, disabledInputStyle, textareaStyle } from 'theme/formStyles';
import { forwardRef, useRef } from 'react';

const StyledTextAreaComponent = styled('textarea')(
	{ ...textareaStyle },
	border,
	display,
	layout,
	shadow,
	color,
);

/**
 * @name TextAreaComponent
 * @description A component used to display styled input element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]			: Whether the input is disabled.
 * @param {string}	[type]				: The type of input, default is text.
 * @param {string}	[placeholder]		: Placeholder text for this input.
 * @param {bool}	[hasError]			: Whether the input contains a validation error.
 * @param {string}	id					: The id of the input.
 */

const TextAreaComponent = forwardRef(
	({ id, disabled, placeholder, type, hasError, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledTextAreaComponent
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				id={id}
				ref={resolvedRef}
				{...(hasError ? errorInputStyle : {})}
				{...(disabled ? disabledInputStyle : {})}
				{...otherProps}
			/>
		);
	}
);

TextAreaComponent.displayName = 'InputComponent';

TextAreaComponent.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	type: PropTypes.string,
};

TextAreaComponent.defaultProps = {
	disabled: false,
	hasError: false,
	type: 'text',
	placeholder: '',
};

export default TextAreaComponent;
