import { StyledDiv } from 'components/shared/styledElements';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { forwardRef, useRef } from 'react';
import SelectComponent from './SelectComponent';
import LabelComponent from './LabelComponent';
import SubTextComponent from './SubTextComponent';

/**
 * @name LabeledSelect
 * @description A component used to display a styled select element with built-in label, hint and validation options.
 *
 * @author Christopher Walker
 *
 * @param {string|number}	id					The id of the select.
 * @param {string}			children			The text to be displayed in the label.
 * @param {array}			options				An associative array representing the list of items to be displayed in the select.
 * @param {array}			[selectedOptions]	An array of ids representing the pre-selected options.
 * @param {bool}			[multiple]			Whether or not multiple values can be selected.
 * @param {string}			[textStyle]			The text style for this select and its label.
 * @param {string}			[hintText]			The text to be displayed in the hint.
 * @param {string}			[errorText]			The text to be displayed in the validation error.
 * @param {bool}			[disabled]			Whether the input is disabled.
 * @param {string}			[placeholder]		Placeholder text for this input.
 * @param {bool}			[hasError]			Whether the subtext is an error display or not.
 * @param {string}			[noOptionsMessage]	Text to display when no options were found.
 */
const LabeledSelect = forwardRef(
	({ textStyle, id, children, options, selectedOptions, multiple, hintText, errorText, disabled, placeholder, hasError, noOptionsMessage, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;
		const errText = hasError ? errorText : '';

		return (
			<StyledDiv display="flex" flexDirection="column">
				<SelectComponent
					textStyle={textStyle}
					id={id}
					disabled={disabled}
					placeholder={placeholder}
					options={options}
					selectedOptions={selectedOptions}
					multiple={multiple}
					ref={resolvedRef}
					hasError={hasError}
					noOptionsMessage={noOptionsMessage}
					{...otherProps}
				/>
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

LabeledSelect.displayName = 'LabeledSelect';

LabeledSelect.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	children: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
			]).isRequired,
			label: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.node,
			]).isRequired,
		}),
	).isRequired,
	selectedOptions: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.shape({
				value: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number,
				]).isRequired,
				label: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number,
					PropTypes.node,
				]).isRequired,
			}),
		),
		PropTypes.shape({
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
			]).isRequired,
			label: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.node,
			]).isRequired,
		}),
	]),
	multiple: PropTypes.bool,
	textStyle: PropTypes.string,
	hintText: PropTypes.string,
	errorText: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	hasError: PropTypes.bool,
	noOptionsMessage: PropTypes.string,
};

LabeledSelect.defaultProps = {
	textStyle: 'brevier',
	hintText: '',
	errorText: '',
	disabled: false,
	multiple: false,
	placeholder: undefined,
	hasError: false,
	selectedOptions: undefined,
	noOptionsMessage: undefined,
};

export default LabeledSelect;
