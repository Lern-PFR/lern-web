import PropTypes from 'prop-types';
import { StyledList, StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, Paragon } from 'components/shared/typography';
import { lessonList, notionDataContainer, notionDescription, notionName } from 'theme/pages/modules/moduleDetailsPage';

import LessonListItem from './LessonListItem';

/**
 * @name NotionListItem
 * @description An item used to display information about a notion and its composing lessons.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string|number}	id			The current notion's id.
 * @param {string}			name		The current notion's name.
 * @param {string}			description	The current notion's description.
 * @param {array}			[lessons]	The current notion's lessons.
 */
const NotionListItem = ({ id, name, description, lessons }) => (
	<StyledListItem {...notionDataContainer}>
		<Paragon tag="h2" {...notionName}>{name}</Paragon>
		<BodyCopy {...notionDescription}>{description}</BodyCopy>
		<StyledList listStyle="none" {...lessonList}>
			{lessons && lessons.map(({ id: lessonId, name: lessonName, description: lessonDesc }) => (
				<LessonListItem key={lessonId} id={lessonId} name={lessonName} notionId={id} description={lessonDesc} />
			))}
		</StyledList>
	</StyledListItem>
);
NotionListItem.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	lessons: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})),
};

NotionListItem.defaultProps = {
	lessons: [],
};

export default NotionListItem;
