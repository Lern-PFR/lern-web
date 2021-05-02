import styled from 'styled-components';
import { StyledDiv } from 'components/shared/layout';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { forwardRef, useRef } from 'react';
import { infoStyle } from 'theme/formStyles';
import InputComponent from './InputComponent';
import LabelComponent from './LabelComponent';
import SubTextComponent from './SubTextComponent';

const InfoSpan = styled('span')(
	{ ...infoStyle },
);

// const InfoTextSpan = styled('span')(
// 	{ ...infoTextStyle },
// );

/**
 * @name LabeledInput
 * @description A component used to display a styled input element with built-in label, hint and validation options.
 *
 * @author Christopher Walker
 *
 * @param {string}	id				: The id of the input.
 * @param {string}	children		: The text to be displayed in the label.
 * @param {string}	[infoText]		: The text to be displayed in the info bubble.
 * @param {string}	[hintText]		: The text to be displayed in the hint.
 * @param {string}	[errorText]		: The text to be displayed in the validation error.
 * @param {bool}	[disabled]		: Whether the input is disabled.
 * @param {string}	[type]			: The type of input, default is text.
 * @param {string}	[placeholder]	: Placeholder text for this input.
 * @param {bool}	[error]			: Whether the subtext is an error display or not.
 */
const LabeledInput = forwardRef(
	({ id, children, infoText, hintText, errorText, disabled, type, placeholder, error, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;
		const errText = error ? errorText : '';

		return (
			<StyledDiv display="flex" flexDirection="column" marginTop="10px">
				{(infoText
					? (
						<StyledDiv display="flex" alignItems="center">
							<InputComponent {...otherProps} id={id} type={type} disabled={disabled} placeholder={placeholder} ref={resolvedRef} error={error} />
							<InfoSpan />
						</StyledDiv>
					)
					: <InputComponent {...otherProps} id={id} type={type} disabled={disabled} placeholder={placeholder} ref={resolvedRef} error={error} />
				)}
				<LabelComponent order="-1" forId={id} color={disabled ? tuna.darker1 : 'initial'}>
					{children}
				</LabelComponent>
				<SubTextComponent color={disabled ? tuna.darker1 : 'initial'}>
					{hintText}
				</SubTextComponent>
				<SubTextComponent error>
					{errText}
				</SubTextComponent>
			</StyledDiv>
		);
	}
);

LabeledInput.displayName = 'LabeledInput';

LabeledInput.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	infoText: PropTypes.string,
	hintText: PropTypes.string,
	errorText: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.bool,
};

LabeledInput.defaultProps = {
	infoText: '',
	hintText: '',
	errorText: '',
	disabled: false,
	type: undefined,
	placeholder: undefined,
	error: false,
};

export default LabeledInput;
