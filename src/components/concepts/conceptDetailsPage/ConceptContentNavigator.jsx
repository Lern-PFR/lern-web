import PropTypes from 'prop-types';
import _ from 'lodash';
import { ChevronLeft, ChevronRight } from 'react-feather';
import styled from 'styled-components';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import { navigationChevrons, navigator, stepperList } from 'theme/pages/concepts/conceptDetailsPage';

import ConceptContentNavigatorStepper from './ConceptContentNavigatorStepper';

// @TODO: Display the name of the document in a tooltip upon hovering a stepper.

const PreviousButton = styled(ChevronLeft)({ ...navigationChevrons });
const NextButton = styled(ChevronRight)({ ...navigationChevrons });

/**
 * @name ConceptContentNavigator
 * @description A component used to navigate inside a lesson's pages.
 *
 * @author Timothée Simon-Franza
 *
 * @param {number}	currentDocOrder	The current document's order value.
 * @param {array}	conceptContent	An array of the current concept's lessons and exercises.
 * @param {func}	redirectTo		Redirection method to trigger when a stepper is clicked.
 */
const ConceptContentNavigator = ({ currentDocOrder, conceptContent, redirectTo }) => {
	/**
	 * @name onPreviousClick
	 * @description onClick handler method for the 'previous' icon button.
	 *
	 * @author Timothée Simon-Franza
	 */
	const onPreviousClick = () => {
		if (currentDocOrder > 0) {
			redirectTo(currentDocOrder - 1);
		}
	};

	/**
	 * @name onNextClick
	 * @description onClick handler method for the 'next' icon button.
	 *
	 * @author Timothée Simon-Franza
	 */
	const onNextClick = () => {
		if (currentDocOrder < conceptContent.length - 1) {
			redirectTo(currentDocOrder + 1);
		}
	};

	return (
		<StyledDiv {...navigator}>
			<PreviousButton role="button" data-testid="concept-navigation-previous" onClick={onPreviousClick} disabled={currentDocOrder === 0} background="white" />
			<StyledList {...stepperList}>
				{conceptContent.map(({ id, order, title = '', name = '' }) => (
					<ConceptContentNavigatorStepper
						isCurrent={_.isEqual(conceptContent[currentDocOrder]?.id, id)}
						key={id}
						data-testid={`concept-navigation-stepper-${id}`}
						label={title || name}
						onClick={() => redirectTo(order)}
					/>
				))}
			</StyledList>
			<NextButton role="button" data-testid="concept-navigation-next" onClick={onNextClick} disabled={currentDocOrder === (conceptContent.length - 1)} />
		</StyledDiv>
	);
};

ConceptContentNavigator.propTypes = {
	currentDocOrder: PropTypes.number.isRequired,
	conceptContent: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				title: PropTypes.string,
				name: PropTypes.string,
				order: PropTypes.number.isRequired,
			}),
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				name: PropTypes.string.isRequired,
				order: PropTypes.number.isRequired,
			}),
		])
	).isRequired,
	redirectTo: PropTypes.func.isRequired,
};

export default ConceptContentNavigator;
