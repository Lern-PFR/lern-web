import { StyledDiv } from 'components/shared/layout';
import { BodyCopy, LongPrimer, Trafalgar } from 'components/shared/typography';
import PropTypes from 'prop-types';
import { lessonContent, lessonContentContainer, lessonDescription, lessonTitle } from 'theme/pages/notions/notionDetailsPage';

/**
 * @name LessonContent
 * @description A component used to display a lesson's content.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} name			The current lesson's title.
 * @param {string} content		The current lesson's content.
 * @param {string} description	A short description of the current lesson.
 */
const LessonContent = ({ name, content, description }) => (
	<StyledDiv {...lessonContentContainer}>
		<StyledDiv>
			<Trafalgar {...lessonTitle} tag="h2">{name}</Trafalgar>
			<LongPrimer {...lessonDescription}>{description}</LongPrimer>
		</StyledDiv>
		<BodyCopy {...lessonContent}>{content}</BodyCopy>
	</StyledDiv>
);

LessonContent.propTypes = {
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default LessonContent;
