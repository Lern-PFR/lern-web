import PropTypes from 'prop-types';
import { labelStyle } from 'theme/formStyles';
import { Brevier } from 'components/shared/typography';

/**
 * @name LabelComponent
 * @description A component used to display styled label element.
 *
 * @param {string}	[element]		: The id of the element that the label is associated to.
 * @param {string}	children		: The test to be displayed in the label.
 */
const LabelComponent = ({ children, element, ...otherProps }) => (
	<Brevier tag="label" {...labelStyle} {...otherProps} htmlFor={element}>
		{children}
	</Brevier>
);

LabelComponent.propTypes = {
	children: PropTypes.string.isRequired,
	element: PropTypes.string,
};

LabelComponent.defaultProps = {
	element: '',
};

export default LabelComponent;
