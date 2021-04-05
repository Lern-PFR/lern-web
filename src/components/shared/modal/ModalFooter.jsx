import PropTypes from 'prop-types';
import { modalFooter } from 'theme/modalStyles';
import { StyledDiv } from '../layout';

/**
 * @name ModalFooter
 * @description Styled div using custom theming properties to be used as footer by Modals.
 *
 * @author Yann Hodiesne
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The components to render inside the footer.
 */
const ModalFooter = ({ children, ...otherProps }) => (
	<StyledDiv {...modalFooter} {...otherProps}>
		{children}
	</StyledDiv>
);

ModalFooter.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

export default ModalFooter;
