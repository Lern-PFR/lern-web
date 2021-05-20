import PropTypes from 'prop-types';
import _ from 'lodash';
import { ChevronLeft, ChevronRight } from 'react-feather';
import styled from 'styled-components';
import { StyledDiv, StyledList } from 'components/shared/layout';
import { navigationChevrons, navigator, stepperList } from 'theme/pages/notions/notionDetailsPage';

import NotionContentNavigatorStepper from './NotionContentNavigatorStepper';

// @TODO: Display the name of the document in a tooltip upon hovering a stepper.

const PreviousButton = styled(ChevronLeft)({ ...navigationChevrons });
const NextButton = styled(ChevronRight)({ ...navigationChevrons });

/**
 * @name NotionContentNavigator
 * @description A component used to navigate inside a lesson's pages.
 *
 * @author Timothée Simon-Franza
 *
 * @param {number}	currentDocOrder	The current document's order value.
 * @param {array}	notionContent	An array of the current notion's lessons and exercises.
 * @param {func}	redirectTo		Redirection method to trigger when a stepper is clicked.
 */
const NotionContentNavigator = ({ currentDocOrder, notionContent, redirectTo }) => {
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
		if (currentDocOrder < notionContent.length - 1) {
			redirectTo(currentDocOrder + 1);
		}
	};

	return (
		<StyledDiv {...navigator}>
			<PreviousButton role="button" data-testid="notion-navigatior-previous" onClick={onPreviousClick} disabled={currentDocOrder === 0} background="white" />
			<StyledList {...stepperList}>
				{notionContent.map(({ id, order, title = '', name = '' }) => (
					<NotionContentNavigatorStepper
						isCurrent={_.isEqual(notionContent[currentDocOrder]?.id, id)}
						key={id}
						label={title || name}
						onClick={() => redirectTo(order)}
					/>
				))}
			</StyledList>
			<NextButton role="button" data-testid="notion-navigatior-next" onClick={onNextClick} disabled={currentDocOrder === (notionContent.length - 1)} />
		</StyledDiv>
	);
};

NotionContentNavigator.propTypes = {
	currentDocOrder: PropTypes.number.isRequired,
	notionContent: PropTypes.arrayOf(
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

export default NotionContentNavigator;
