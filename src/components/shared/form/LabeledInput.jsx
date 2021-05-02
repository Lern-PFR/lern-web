// import styled from 'styled-components';
import { StyledDiv } from 'components/shared/layout';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import /* React, */ { forwardRef, useRef } from 'react';
// import { hintStyle, validationStyle } from 'theme/formStyles';
// import { brevier } from 'theme/textStyles';
import InputComponent from './InputComponent';
import LabelComponent from './LabelComponent';
import SubTextComponent from './SubTextComponent';

// const CountSpan = styled('span')(
// 	{
// 		...brevier,
// 		...(({ error }) => (error ? hintStyle : validationStyle)),
// 		float: 'right',
// 	},
// );

// /** */
// function countedInput(LabeledInput) {
// 	class CountedInput extends React.Component {
// 		/** */
// 		componentDidMount() {
// 			const { value } = this.props;
// 			this.handleCharCount(value);
// 		}

// 		handleCharCount = (value) => {
// 			const { maxChars } = this.props;
// 			const charCount = value.length;
// 			this.setState({ charCount });
// 			this.setState({ maxChars });
// 		};

// 		handleChange = (event) => {
// 			const { onChange } = this.props;
// 			this.handleCharCount(event.target.value);
// 			onChange(event);
// 		};

// 		renderCharacterCount = () => {
// 			const { charCount } = this.state;
// 			const { maxChars } = this.state;

// 			return <CountSpan error={charCount >= maxChars}>{charCount / maxChars}</CountSpan>;
// 		};

// 		/** */
// 		render() {
// 			const { forwardedRef, ...rest } = this.props;

// 			return (
// 				<LabeledInput ref={forwardedRef} {...rest} />
// 			);
// 		}
// 	}

// 	CountedInput.propTypes = {
// 		value: PropTypes.oneOfType(
// 			PropTypes.string,
// 			PropTypes.number,
// 		).isRequired,
// 		maxChars: PropTypes.number,
// 		onChange: PropTypes.func,
// 		forwardedRef: PropTypes.string,
// 	};

// 	CountedInput.defaultProps = {
// 		maxChars: -1,
// 		onChange: () => {},
// 		forwardedRef: undefined,
// 	};

// 	return React.forwardRef((props, ref) => <CountedInput {...props} forwardedRef={ref} />);
// }

/**
 * @name LabeledInput
 * @description A component used to display a styled input element with built-in label, hint and validation options.
 *
 * @author Christopher Walker
 *
 * @param {string}	id				: The id of the input.
 * @param {string}	children		: The text to be displayed in the label.
 * @param {string}	[hintText]		: The text to be displayed in the hint.
 * @param {string}	[errorText]		: The text to be displayed in the validation error.
 * @param {bool}	[disabled]		: Whether the input is disabled.
 * @param {string}	[type]			: The type of input, default is text.
 * @param {string}	[placeholder]	: Placeholder text for this input.
 * @param {bool}	[error]			: Whether the subtext is an error display or not.
 */
const LabeledInput = forwardRef(
	({ id, children, hintText, errorText, disabled, type, placeholder, error, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;
		const errText = error ? errorText : '';

		return (
			<StyledDiv display="flex" flexDirection="column" marginTop="10px">
				<InputComponent {...otherProps} id={id} type={type} disabled={disabled} placeholder={placeholder} ref={resolvedRef} error={error} />
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
	hintText: PropTypes.string,
	errorText: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.bool,
};

LabeledInput.defaultProps = {
	hintText: '',
	errorText: '',
	disabled: false,
	type: undefined,
	placeholder: undefined,
	error: false,
};

export default LabeledInput;
