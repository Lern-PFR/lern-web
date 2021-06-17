import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { layout, flexbox, color, typography } from 'styled-system';
import { disabledStyle, labelStyle } from 'theme/formStyles';
import { getTypographyStyleByName } from '../typography';

const StyledLabelComponent = styled('label')(
	{ ...labelStyle },
	flexbox,
	color,
	typography,
	layout,
);

/**
 * @name LabelComponent
 * @description A component used to display styled label element.
 *
 * @author Christopher Walker
 *
 * @param {string}	[element]		: The id of the element that the label is associated to.
 * @param {string}	[textStyle]	: The text style of the label text.
 * @param {string}	children		: The test to be displayed in the label.
 * @param {bool}	[disabled]		Whether the labels input is disabled or not.
 * @param {bool}	[hasError]		Whether the labels input has an error or not.
 */
const LabelComponent = ({ children, forId, hasError, disabled, textStyle, ...otherProps }) => {
	const typographyStyle = useMemo(() => getTypographyStyleByName(textStyle), [textStyle]);

	return (
		<StyledLabelComponent htmlFor={forId} hasError={hasError} {...typographyStyle} {...otherProps} {...(disabled ? disabledStyle : {})}>
			{children}
		</StyledLabelComponent>
	);
};

LabelComponent.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]).isRequired,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	textStyle: PropTypes.string,
	forId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

LabelComponent.defaultProps = {
	disabled: false,
	hasError: false,
	textStyle: 'brevier',
	forId: '',
};

export default LabelComponent;
