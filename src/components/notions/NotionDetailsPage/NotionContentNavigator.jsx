import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'react-feather';

import { StyledDiv, StyledList } from 'components/shared/layout';
import { navigator, stepperList } from 'theme/pages/notions/notionDetailsPage';

import NotionContentNavigatorStepper from './NotionContentNavigatorStepper';

// @TODO: Implement a way to use ChevronLeft and ChevronRight elements as 'previous' and 'next' navigation buttons.
// @TODO: Disable said buttons when on first / last element.
// @TODO: Display the name of the document in a tooltip upon hovering a stepper.

/**
 * @name NotionContentNavigator
 * @description A component used to navigate inside a lesson's pages.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	notionContent	An array of the current notion's lessons and exercises.
 * @param {func}	redirectTo		Redirection method to trigger when a stepper is clicked.
 */
const NotionContentNavigator = ({ notionContent, redirectTo }) => (
	<StyledDiv {...navigator}>
		<ChevronLeft />
		<StyledList {...stepperList}>
			{notionContent.map(({ id, order, title = '', name = '' }) => (
				<NotionContentNavigatorStepper key={id} label={title || name} onClick={() => redirectTo(order)} />
			))}
		</StyledList>
		<ChevronRight />
	</StyledDiv>
);

NotionContentNavigator.propTypes = {
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
