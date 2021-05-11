import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'react-feather';

import { StyledDiv, StyledList } from 'components/shared/layout';
import { navigator, stepperList } from 'theme/pages/notions/notionDetailsPage';

import NotionContentNavigatorStepper from './NotionContentNavigatorStepper';

/**
 * @name NotionContentNavigator
 * @description A component used to navigate inside a lesson's pages.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	[exercises]	The current notion's exercises.
 * @param {array}	lessons		The current notion's lessons.
 * @param {func}	redirectTo	Redirection method to trigger when a stepper is clicked.
 */
const NotionContentNavigator = ({ exercises, lessons, redirectTo }) => (
	<StyledDiv {...navigator}>
		<ChevronLeft />
		<StyledList {...stepperList}>
			{lessons.map(({ id, title }) => (
				<NotionContentNavigatorStepper key={id} label={title} onClick={() => redirectTo('lesson', id)} />
			))}
			{exercises.map(({ id, name }) => (
				<NotionContentNavigatorStepper key={id} label={name} onClick={() => redirectTo('exercise', id)} />
			))}
		</StyledList>
		<ChevronRight />
	</StyledDiv>
);

NotionContentNavigator.propTypes = {
	exercises: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			title: PropTypes.string.isRequired,
		})
	),
	lessons: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
	redirectTo: PropTypes.func.isRequired,
};

NotionContentNavigator.defaultProps = {
	exercises: [],
};

export default NotionContentNavigator;
