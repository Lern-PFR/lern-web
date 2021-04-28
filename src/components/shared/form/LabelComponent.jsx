import PropTypes from 'prop-types';
import { labelStyle } from 'theme/formStyles';
import { Brevier } from 'components/shared/typography';

/**
 * @name LabelComponent
 * @description A component used to display styled label element.
 *
 * @author Christopher Walker
 *
 * @param {string}	[element]		: The id of the element that the label is associated to.
 * @param {string}	children		: The test to be displayed in the label.
 */
const LabelComponent = ({ children, forId, ...otherProps }) => (
	<Brevier tag="label" {...labelStyle} {...otherProps} htmlFor={forId}>
		{children}
	</Brevier>
);

LabelComponent.propTypes = {
	children: PropTypes.string.isRequired,
	forId: PropTypes.string,
};

LabelComponent.defaultProps = {
	forId: '',
};

export default LabelComponent;
