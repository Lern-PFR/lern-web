import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DoublePica } from 'components/shared/typography';
import { modal, modalBackdrop, modalHeader, modalWrapper } from 'theme/modalStyles';
import { StyledDiv } from '../styledElements';

/**
 * @name Modal
 * @description A generic modal usable inside any page
 *
 * @author Yann Hodiesne
 *
 * @param {node}	children	The components to render inside the modal
 * @param {bool}	isShowing	Determines if the modal is currently being shown to the user
 * @param {string}	title		The title of the modal, displayed inside its header
 */
const Modal = ({ children, isShowing, title }) => {
	if (!isShowing) {
		return null;
	}

	return ReactDOM.createPortal(
		<StyledDiv {...modalBackdrop}>
			<StyledDiv className="modal-wrapper" {...modalWrapper}>
				<StyledDiv className="modal" {...modal}>
					<StyledDiv className="modal-header" {...modalHeader}>
						<DoublePica tag="h2">{title}</DoublePica>
					</StyledDiv>
					<div>
						{children}
					</div>
				</StyledDiv>
			</StyledDiv>
		</StyledDiv>,
		document.body
	);
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isShowing: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

export default Modal;
