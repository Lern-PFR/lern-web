import styled from 'styled-components';
import {
	border,
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
	layout,
	shadow,
	color,
);

/**
 * @name TextAreaComponent
 * @description A component used to display styled textarea element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]			: Whether the textarea is disabled.
 * @param {string}	[placeholder]		: Placeholder text for this textarea.
 * @param {bool}	[hasError]			: Whether the textarea contains a validation error.
 * @param {string}	id					: The id of the textarea.
 */

const TextAreaComponent = forwardRef(
	({ id, disabled, placeholder, hasError, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledTextAreaComponent
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
