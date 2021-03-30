import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DoublePica } from 'components/shared/typography';

const StyledModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1040;
	background-color: rgba(0, 0, 0, 0.5);
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1050;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		outline: 0;
		display: flex;
		align-items: center;
	}
	.modal {
		z-index: 100;
		background: #fff;
		position: relative;
		margin: auto;
		border-radius: 5px;
		max-width: 500px;
		width: 80%;
		padding: 0 1rem 1rem 1rem;
	}
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

/**
 * @name Modal
 * @description A generic modal usable inside any page
 *
 * @author Yann Hodiesne
 *
 * @param {node}	children	: The components to render inside the modal
 * @param {bool}	isShowing	: Determines if the modal is currently being shown to the user
 * @param {string}	title		: The title of the modal, displayed inside its header
 */
const Modal = ({ children, isShowing, title }) => {
	if (!isShowing) {
		return null;
	}

	return ReactDOM.createPortal(
		<StyledModal>
			<div className="modal-wrapper">
				<div className="modal">
					<div className="modal-header">
						<DoublePica tag="h2">{title}</DoublePica>
					</div>
					<div>
						{children}
					</div>
				</div>
			</div>
		</StyledModal>,
		document.body
	);
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isShowing: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

export default Modal;
