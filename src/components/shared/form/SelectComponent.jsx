import styled from 'styled-components';
import {
	border,
	flexbox,
	layout,
	margin,
	padding,
} from 'styled-system';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { forwardRef, useRef, useMemo } from 'react';
import { errorSelectStyle, selectStyle } from 'theme/formStyles';
import { primary, crimson, jasmine } from 'theme/colors';
import { getTypographyStyleByName } from '../typography';

const StyledSelect = styled(ReactSelect)(
	border,
	flexbox,
	layout,
	margin,
	padding,
);

/**
 * @name SelectComponent
 * @description A component used to display a styled select element.
 *
 * @author Christopher Walker
 *
 * @param {string|number}	id					The id of the select element.
 * @param {array}			options				The array of options to display.
 * @param {array}			[selectedOptions]	The array of pre-selected options.
 * @param {string}			[textStyle]			The text style for this select.
 * @param {bool}			[disabled]			Whether or not the element is disabled.
 * @param {bool}			[required]			Whether or not the element is required.
 * @param {bool}			[hasError]			Whether or not the select contains a validation error.
 * @param {string|number}	[placeholder]		The placeholder text to display.
 * @param {bool}			[multiple]			Whether or not multiple options can be selected.
 * @param {string}			[noOptionsMessage]	Text to display when no options were found.
 */
const SelectComponent = forwardRef(
	({ id, disabled, required, multiple, placeholder, options, selectedOptions, hasError, textStyle, noOptionsMessage, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;
		const typographyStyle = useMemo(() => getTypographyStyleByName(textStyle), [textStyle]);

		return (
			<StyledSelect
				noOptionsMessage={() => noOptionsMessage}
				isClearable={!required}
				isDisabled={disabled}
				defaultValue={selectedOptions || ''}
				isMulti={multiple}
				placeholder={placeholder}
				id={id}
				options={options}
				ref={resolvedRef}
				styles={hasError && !disabled ? errorSelectStyle : selectStyle}
				theme={(theme) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: hasError ? crimson.default : primary.default,
						primary25: jasmine.darker1,
						primary50: primary.lighter1,
					},
				})}
				{...typographyStyle}
				{...otherProps}
			/>
		);
	}
);

SelectComponent.displayName = 'SelectComponent';

SelectComponent.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	textStyle: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	hasError: PropTypes.bool,
	multiple: PropTypes.bool,
	placeholder: PropTypes.string,
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
	noOptionsMessage: PropTypes.string,
};

SelectComponent.defaultProps = {
	textStyle: 'brevier',
	disabled: false,
	required: false,
	hasError: false,
	multiple: false,
	placeholder: ' - ',
	selectedOptions: [],
	noOptionsMessage: 'No options',
};

export default SelectComponent;
