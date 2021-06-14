import { StyledDiv } from 'components/shared/styledElements';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { forwardRef, useRef } from 'react';
import InputComponent from './InputComponent';
import LabelComponent from './LabelComponent';
import SubTextComponent from './SubTextComponent';

/**
 * @name LabeledInput
 * @description A component used to display a styled input element with built-in label, hint and validation options.
 *
 * @author Christopher Walker
 *
 * @param {string}	id					: The id of the input.
 * @param {string}	children			: The text to be displayed in the label.
 * @param {string}	[textStyle]			The text style for this input and its label.
 * @param {string}	[hintText]			: The text to be displayed in the hint.
 * @param {string}	[errorText]			: The text to be displayed in the validation error.
 * @param {bool}	[disabled]			: Whether the input is disabled.
 * @param {string}	[type]				: The type of input, default is text.
 * @param {string}	[placeholder]		: Placeholder text for this input.
 * @param {bool}	[hasError]	: Whether the subtext is an error display or not.
 */
const LabeledInput = forwardRef(
	({ textStyle, id, children, hintText, errorText, disabled, type, placeholder, hasError, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;
		const errText = hasError ? errorText : '';

		return (
			<StyledDiv display="flex" flexDirection="column">
				<InputComponent textStyle={textStyle} id={id} type={type} disabled={disabled} placeholder={placeholder} ref={resolvedRef} hasError={hasError} {...otherProps} />
				<LabelComponent textStyle={textStyle} order="-1" forId={id} disabled={disabled} hasError={hasError}>
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

LabeledInput.displayName = 'LabeledInput';

LabeledInput.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	textStyle: PropTypes.string,
	hintText: PropTypes.string,
	errorText: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	hasError: PropTypes.bool,
};

LabeledInput.defaultProps = {
	textStyle: 'brevier',
	hintText: '',
	errorText: '',
	disabled: false,
	type: undefined,
	placeholder: undefined,
	hasError: false,
};

export default LabeledInput;
