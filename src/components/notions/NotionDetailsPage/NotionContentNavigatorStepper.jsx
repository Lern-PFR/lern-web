import PropTypes from 'prop-types';
import styled from 'styled-components';
import { stepper, stepperCurrent } from 'theme/pages/notions/notionDetailsPage';

const StepperButton = styled('button')(
	{
		...stepper,
		backgroundColor: (({ isCurrent }) => (isCurrent ? stepperCurrent.backgroundColor : stepper.backgroundColor)),
	}
);

/**
 * @name NotionContentNavigatorStepper
 * @description A stepper button used to navigate between a notion's content list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {bool}	isCurrent	Whether the stepper represents the currently displayed document.
 * @param {string}	label		The label to display on hover.
 * @param {func}	onClick		Method to trigger when the user clicks the button.
 */
const NotionContentNavigatorStepper = ({ isCurrent, label, onClick, ...otherProps }) => (
	<StepperButton onClick={onClick} label={label} isCurrent={isCurrent} {...otherProps} />
);

NotionContentNavigatorStepper.propTypes = {
	isCurrent: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

NotionContentNavigatorStepper.defaultProps = {
	isCurrent: false,
};

export default NotionContentNavigatorStepper;
