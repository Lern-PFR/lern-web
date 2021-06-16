import PropTypes from 'prop-types';
import styled from 'styled-components';
import { stepper, stepperCurrent } from 'theme/pages/concepts/conceptDetailsPage';

const StepperButton = styled('button')(
	{
		...stepper,
		backgroundColor: (({ isCurrent }) => (isCurrent ? stepperCurrent.backgroundColor : stepper.backgroundColor)),
	}
);

/**
 * @name ConceptContentNavigatorStepper
 * @description A stepper button used to navigate between a concept's content list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {bool}	isCurrent	Whether the stepper represents the currently displayed document.
 * @param {string}	label		The label to display on hover.
 * @param {func}	onClick		Method to trigger when the user clicks the button.
 */
const ConceptContentNavigatorStepper = ({ isCurrent, label, onClick, ...otherProps }) => (
	<StepperButton onClick={onClick} label={label} isCurrent={isCurrent} {...otherProps} />
);

ConceptContentNavigatorStepper.propTypes = {
	isCurrent: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

ConceptContentNavigatorStepper.defaultProps = {
	isCurrent: false,
};

export default ConceptContentNavigatorStepper;
