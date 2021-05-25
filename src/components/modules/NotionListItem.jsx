import PropTypes from 'prop-types';
import { StyledList, StyledListItem } from 'components/shared/styledElements';
import { withTranslation } from 'react-i18next';
import routes from 'routes/keys';

import { BodyCopy, Paragon } from 'components/shared/typography';
import { OutlinedButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';

import { lessonList, notionDataContainer, notionDescription, notionName, startNotionButton } from 'theme/pages/modules/moduleDetailsPage';

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
 * @param {func}			t			The translation method provided by the withTranslation HoC.
 */
const NotionListItem = ({ id, name, description, lessons, t }) => (
	<StyledListItem {...notionDataContainer}>
		<Paragon tag="h2" {...notionName}>{name}</Paragon>
		<BodyCopy {...notionDescription}>{description}</BodyCopy>
		<OutlinedButton {...startNotionButton}>
			<Link to={routes.notions.notionDetails.replace(':notionId', id)}>
				{t('notions.links.start')}
			</Link>
		</OutlinedButton>
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
	t: PropTypes.func.isRequired,
};

NotionListItem.defaultProps = {
	lessons: [],
};

export default withTranslation()(NotionListItem);
