import { StyledDiv } from 'components/shared/styledElements';
import { BodyCopy, LongPrimer, Trafalgar } from 'components/shared/typography';
import PropTypes from 'prop-types';
import { lessonContent, lessonContentContainer, lessonDescription, lessonTitle, lessonTitleContainer } from 'theme/pages/concepts/conceptDetailsPage';

/**
 * @name LessonContent
 * @description A component used to display a lesson's content.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} name			The current lesson's title.
 * @param {string} content		The current lesson's content.
 * @param {string} description	A short description of the current lesson.
 * @param {string} [question]	The question's statement, if any.
 */
const LessonContent = ({ name, content, description, question }) => (
	<StyledDiv {...lessonContentContainer}>
		<StyledDiv {...lessonTitleContainer}>
			<Trafalgar {...lessonTitle} tag="h2">{name}</Trafalgar>
			<LongPrimer {...lessonDescription}>{description}</LongPrimer>
		</StyledDiv>
		<StyledDiv>
			<BodyCopy {...lessonContent}>{content}</BodyCopy>
			{question && (
				<BodyCopy>
					<strong>Question : </strong>
					{question}
				</BodyCopy>
			)}
		</StyledDiv>
	</StyledDiv>
);

LessonContent.propTypes = {
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	question: PropTypes.string,
};

LessonContent.defaultProps = {
	question: null,
};

export default LessonContent;
