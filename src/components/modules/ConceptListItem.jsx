import PropTypes from 'prop-types';
import { StyledList, StyledListItem } from 'components/shared/styledElements';
import { withTranslation } from 'react-i18next';
import routes from 'routes/keys';

import { BodyCopy, Paragon } from 'components/shared/typography';
import { OutlinedButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';

import { lessonList, conceptDataContainer, conceptDescription, conceptName, startConceptButton } from 'theme/pages/modules/moduleDetailsPage';

import LessonListItem from './LessonListItem';

/**
 * @name ConceptListItem
 * @description An item used to display information about a concept and its composing lessons.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string|number}	id			The current concept's id.
 * @param {string}			title		The current concept's title.
 * @param {string}			description	The current concept's description.
 * @param {array}			[lessons]	The current concept's lessons.
 * @param {func}			t			The translation method provided by the withTranslation HoC.
 */
const ConceptListItem = ({ id, title, description, lessons, t }) => (
	<StyledListItem {...conceptDataContainer}>
		<Paragon tag="h2" {...conceptName}>{title}</Paragon>
		<BodyCopy {...conceptDescription}>{description}</BodyCopy>
		<OutlinedButton {...startConceptButton}>
			<Link to={routes.concepts.conceptDetails.replace(':conceptId', id)}>
				{t('concepts.links.start')}
			</Link>
		</OutlinedButton>
		<StyledList listStyle="none" {...lessonList}>
			{lessons && lessons.map(({ id: lessonId, name: lessonName, description: lessonDesc }) => (
				<LessonListItem key={lessonId} id={lessonId} name={lessonName} conceptId={id} description={lessonDesc} />
			))}
		</StyledList>
	</StyledListItem>
);
ConceptListItem.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	lessons: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})),
	t: PropTypes.func.isRequired,
};

ConceptListItem.defaultProps = {
	lessons: [],
};

export default withTranslation()(ConceptListItem);
