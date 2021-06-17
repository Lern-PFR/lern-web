import PropTypes from 'prop-types';
import { StyledListItem } from 'components/shared/styledElements';
import { generatePath } from 'react-router';
import { BodyCopy, GreatPrimer } from 'components/shared/typography';
import { withTranslation } from 'react-i18next';
import { SubtleButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import routes from 'routes/keys';
import { lessonDescription, lessonListItem, lessonTitle } from 'theme/pages/modules/moduleDetailsPage';
import { backToListButton } from 'theme/pages/subjects/subjectDetailsPage';

/**
 * @name LessonListItem
 * @description An item used to display an overview of a lesson.
 *
 * @author Timothée Simon-Franza
 *
 * @param {bool}			[disabled]	Whether the access to the current lesson is disabled to the current user.
 * @param {string|number}	id			The current lesson's id.
 * @param {string}			title		The current lesson's title.
 * @param {string|number}	conceptId	The lesson's parent concept's id.
 * @param {string}			description	The current lesson's description.
 * @param {func}			t			The translation method provided by the withTranslation HoC.
 */
const LessonListItem = ({ disabled, id, title, conceptId, description, t }) => (
	<StyledListItem key={id} {...lessonListItem}>
		<GreatPrimer {...lessonTitle}>{title}</GreatPrimer>
		<BodyCopy {...lessonDescription}>{description}</BodyCopy>
		<SubtleButton {...backToListButton}>
			<Link to={generatePath(routes.concepts.lessonDetails, { conceptId, lessonId: id })} disabled={disabled}>
				{t('lessons.links.access')}
			</Link>
		</SubtleButton>
	</StyledListItem>
);

LessonListItem.propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	title: PropTypes.string.isRequired,
	conceptId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	description: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

LessonListItem.defaultProps = {
	disabled: false,
};

export default withTranslation()(LessonListItem);
