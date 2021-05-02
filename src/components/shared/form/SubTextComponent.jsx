import PropTypes from 'prop-types';
import { hintStyle, validationStyle } from 'theme/formStyles';
import { Brevier } from 'components/shared/typography';

/**
 * @name SubTextComponent
 * @description A component used to display styled subtext element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[error]			: Whether the subtext is an error display or not.
 * @param {string}	children		: The text to be displayed in the subtext.
 */
const SubTextComponent = ({ error, children, ...otherProps }) => (
	<Brevier tag="div" {...(error ? validationStyle : hintStyle)} {...otherProps}>
		{children}
	</Brevier>
);

SubTextComponent.propTypes = {
	children: PropTypes.string.isRequired,
	error: PropTypes.bool,
};

SubTextComponent.defaultProps = {
	error: false,
};

export default SubTextComponent;
