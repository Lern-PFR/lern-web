import PropTypes from 'prop-types';
import { hintStyle, validationStyle } from 'theme/formStyles';
import { Brevier } from 'components/shared/typography';

/**
 * @name SubTextComponent
 * @description A component used to display styled subtext element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[isErrorMessage]	Whether the subtext is an error display or not.
 * @param {string}	children			The text to be displayed in the subtext.
 */
const SubTextComponent = ({ isErrorMessage, children, ...otherProps }) => (
	<Brevier tag="span" {...(isErrorMessage ? validationStyle : hintStyle)} {...otherProps}>
		{children}
	</Brevier>
);

SubTextComponent.propTypes = {
	children: PropTypes.string.isRequired,
	isErrorMessage: PropTypes.bool,
};

SubTextComponent.defaultProps = {
	isErrorMessage: false,
};

export default SubTextComponent;
