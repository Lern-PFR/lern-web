import { StyledDiv } from 'components/shared/styledElements';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { forwardRef, useRef } from 'react';
import TextAreaComponent from './TextAreaComponent';
import LabelComponent from './LabelComponent';
import SubTextComponent from './SubTextComponent';

/**
 * @name LabeledTextArea
 * @description A component used to display a styled textarea element with built-in label, hint and validation options.
 *
 * @author Christopher Walker
 *
 * @param {string}	id					The id of the textarea.
 * @param {string}	children			The text to be displayed in the label.
 * @param {number}	[rows]				The number of rows of text visible to the user.
 * @param {string}	[hintText]			The text to be displayed in the hint.
 * @param {string}	[errorText]			The text to be displayed in the validation error.
 * @param {bool}	[disabled]			Whether the textarea is disabled.
 * @param {string}	[placeholder]		Placeholder text for this textarea.
 * @param {bool}	[hasError]			Whether the subtext is an error display or not.
 */
const LabeledTextArea = forwardRef(
	({ id, children, rows, hintText, errorText, disabled, placeholder, hasError, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;
		const errText = hasError ? errorText : '';

		return (
			<StyledDiv display="flex" flexDirection="column">
				<TextAreaComponent id={id} disabled={disabled} rows={rows} placeholder={placeholder} ref={resolvedRef} hasError={hasError} {...otherProps} />
				<LabelComponent order="-1" forId={id} disabled={disabled} hasError={hasError}>
					{children}
				</LabelComponent>
				{(!hasError || (hasError && disabled)) && (
					<SubTextComponent color={disabled ? tuna.darker1 : 'initial'}>
						{hintText}
					</SubTextComponent>
				)}
				{hasError && !disabled && (
					<SubTextComponent isErrorMessage={hasError}>
						{errText}
					</SubTextComponent>
				)}
			</StyledDiv>
		);
	}
);

LabeledTextArea.displayName = 'LabeledTextArea';

LabeledTextArea.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	rows: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	hintText: PropTypes.string,
	errorText: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	hasError: PropTypes.bool,
};

LabeledTextArea.defaultProps = {
	rows: 2,
	hintText: '',
	errorText: '',
	disabled: false,
	placeholder: undefined,
	hasError: false,
};

export default LabeledTextArea;
