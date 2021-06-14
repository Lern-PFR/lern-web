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
 * @param {bool}	[disabled]			Whether the textarea is disabled.
 * @param {string}	[placeholder]		Placeholder text for this textarea.
 * @param {bool}	[hasError]			Whether the textarea contains a validation error.
 * @param {number}	[rows]				The number of rows of text visible to the user.
 * @param {string}	id					The id of the textarea.
 */

const TextAreaComponent = forwardRef(
	({ id, rows, disabled, placeholder, hasError, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledTextAreaComponent
				disabled={disabled}
				placeholder={placeholder}
				id={id}
				ref={resolvedRef}
				rows={rows}
				{...(hasError ? errorInputStyle : {})}
				{...(disabled ? disabledInputStyle : {})}
				{...otherProps}
			/>
		);
	}
);

TextAreaComponent.displayName = 'TextAreaComponent';

TextAreaComponent.propTypes = {
	id: PropTypes.string.isRequired,
	rows: PropTypes.number,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
};

TextAreaComponent.defaultProps = {
	rows: 2,
	disabled: false,
	hasError: false,
	placeholder: '',
};

export default TextAreaComponent;
