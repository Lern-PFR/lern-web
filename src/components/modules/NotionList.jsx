import PropTypes from 'prop-types';
import { StyledDiv, StyledList } from 'components/shared/layout';
import { Paragon, BodyCopy } from 'components/shared/typography';
import { lessonList, notionDataContainer, notionDescription, notionList, notionName } from 'theme/pages/modules/moduleDetailsPage';
import LessonListItem from './LessonListItem';

/**
 * @name NotionList
 * @description A component used to display a module's notion list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array} notions The list of notions to display.
 */
const NotionList = ({ notions }) => (
	<StyledList listStyle="none" {...notionList}>
		{notions && notions.map(({ id, name, description, lessons }) => (
			<StyledDiv key={id} {...notionDataContainer}>
				<Paragon tag="h2" {...notionName}>{name}</Paragon>
				<BodyCopy {...notionDescription}>{description}</BodyCopy>
				<StyledList listStyle="none" {...lessonList}>
					{lessons && lessons.map(({ id: lessonId, name: lessonName, description: lessonDesc }) => (
						<LessonListItem key={lessonId} id={lessonId} name={lessonName} description={lessonDesc} />
					))}
				</StyledList>
			</StyledDiv>
		))}
	</StyledList>
);

NotionList.propTypes = {
	notions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		lessons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})),
	})).isRequired,
};

export default NotionList;
