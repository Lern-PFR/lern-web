import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { DangerButton, SubtleButton } from 'components/shared/buttons';
import { BodyCopy } from 'components/shared/typography';
import Modal from './Modal';
import ModalFooter from './ModalFooter';

/**
 * @name PromptModal
 * @description Asks the user for confirmation with the given message
 *
 * @author Yann Hodiesne
 *
 * @param {bool}	isShowing	: Determines if the modal is currently being shown to the user
 * @param {string}	message		: The message displayed to the user
 * @param {func}	confirm		: The function to execute when the user clicks on confirm
 * @param {func}	cancel		: The function to execute when the user clicks on cancel
 * @param {string}	confirmText	: The text displayed inside the confirmation button
 * @param {string}	cancelText	: The text displayed inside the cancel button
 * @param {string}	titleText	: The text displayed inside the confirmation button
 * @param {func}	t			: A translation method provided by the withTranslation HoC
 */
const PromptModal = ({ isShowing, message, confirm, cancel, confirmText, cancelText, titleText, t }) => (
	<Modal isShowing={isShowing} title={titleText || t('components.prompt.title')}>
		<BodyCopy ml="1em">{message}</BodyCopy>
		<ModalFooter>
			<SubtleButton onClick={cancel}>
				{cancelText || t('components.prompt.cancel')}
			</SubtleButton>
			<DangerButton onClick={confirm}>
				{confirmText || t('components.prompt.confirm')}
			</DangerButton>
		</ModalFooter>
	</Modal>
);

PromptModal.propTypes = {
	isShowing: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	confirm: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
	titleText: PropTypes.string,
	t: PropTypes.func.isRequired,
};

PromptModal.defaultProps = {
	confirmText: undefined,
	cancelText: undefined,
	titleText: undefined,
};

export default withTranslation()(PromptModal);
