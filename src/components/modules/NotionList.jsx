import PropTypes from 'prop-types';
import { StyledDiv, StyledList, StyledListItem } from 'components/shared/layout';
import { Paragon, BodyCopy, GreatPrimer } from 'components/shared/typography';
import { lessonDescription, lessonList, lessonListItem, notionDescription, notionList, notionName } from 'theme/pages/modules/moduleDetailsPage';

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
			<StyledDiv key={id}>
				<Paragon tag="h2" {...notionName}>{name}</Paragon>
				<BodyCopy {...notionDescription}>{description}</BodyCopy>
				<StyledList listStyle="none" {...lessonList}>
					{lessons && lessons.map(({ id: lessonId, name: lessonName, description: lessonDesc }) => (
						<StyledListItem key={lessonId} {...lessonListItem}>
							<GreatPrimer>{lessonName}</GreatPrimer>
							<BodyCopy {...lessonDescription}>{lessonDesc}</BodyCopy>
						</StyledListItem>
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
