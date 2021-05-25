import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flexbox, color } from 'styled-system';
import { labelStyle } from 'theme/formStyles';
import { getTypographyStyleByName } from '../typography';

const StyledLabelComponent = styled('label')(
	flexbox,
	color,
	{ ...labelStyle },
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
 */
const LabelComponent = ({ children, forId, textStyle, ...otherProps }) => {
	const typography = useMemo(() => getTypographyStyleByName(textStyle), [textStyle]);

	return (
		<StyledLabelComponent htmlFor={forId} {...typography} {...otherProps}>
			{children}
		</StyledLabelComponent>
	);
};

LabelComponent.propTypes = {
	children: PropTypes.string.isRequired,
	textStyle: PropTypes.string,
	forId: PropTypes.string,
};

LabelComponent.defaultProps = {
	textStyle: 'brevier',
	forId: '',
};

export default LabelComponent;
