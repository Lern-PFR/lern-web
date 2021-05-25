import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { labelStyle } from 'theme/formStyles';
import DynamicTextComponent from 'components/shared/typography/DynamicTextComponent';
import { getTypographyStyleByName } from '../typography';

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
const LabelComponent = ({ children, textStyle, forId, ...otherProps }) => {
	const typography = useMemo(() => getTypographyStyleByName(textStyle), [textStyle]);

	return (
		<DynamicTextComponent
			tag="label"
			htmlFor={forId}
			{...typography}
			{...labelStyle}
			{...otherProps}
		>
			{children}
		</DynamicTextComponent>
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
