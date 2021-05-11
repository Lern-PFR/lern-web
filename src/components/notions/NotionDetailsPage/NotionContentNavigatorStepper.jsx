import PropTypes from 'prop-types';
import styled from 'styled-components';
import { stepper } from 'theme/pages/notions/notionDetailsPage';

const StepperButton = styled('button')(
	{
		...stepper,
	}
);

/**
 * @name NotionContentNavigatorStepper
 * @description A stepper button used to navigate between a notion's content list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	label	The label to display on hover.
 * @param {func}	onClick	Method to trigger when the user clicks the button.
 */
const NotionContentNavigatorStepper = ({ label, onClick }) => (
	<StepperButton onClick={onClick} label={label} {...stepper} />
);

NotionContentNavigatorStepper.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default NotionContentNavigatorStepper;
