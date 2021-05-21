import PropTypes from 'prop-types';
import { StyledDiv } from 'components/shared/layout';
import { Paragon, Pica } from 'components/shared/typography';
import { lessonTitle, notionTitle, sidebar } from 'theme/pages/notions/notionDetailsPage';
import NotionContentNavigator from './NotionContentNavigator';
import QuestionForm from './questionForm';

/**
 * @name Sidebar
 * @description The sidebar to display on the notion details page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	notionName					The current notion's name.
 * @param {object}	currentLesson				The current lesson.
 * @param {array}	notionContent				An array of all lessons and exercises composing the current notion.
 * @param {func}	onQuestionAnswerSubmit		Method to trigger upon submission of the question form.
 * @param {func}	onCurrentDocumentRedirect	Method to trigger when the user clicks on a navigation stepper to redirect him to the desired document.
 */
const Sidebar = ({ notionName, currentLesson, notionContent, onQuestionAnswerSubmit, onCurrentDocumentRedirect }) => (
	<StyledDiv {...sidebar}>
		<Paragon tag="h1" {...notionTitle}>{notionName}</Paragon>
		<Pica tag="h2" {...lessonTitle}>{currentLesson.name}</Pica>
		<NotionContentNavigator
			currentDocOrder={currentLesson.order}
			notionContent={notionContent}
			redirectTo={onCurrentDocumentRedirect}
		/>
		{currentLesson.exercise && (
			<QuestionForm
				singleChoice={currentLesson.exercise.question.singleChoice}
				answers={currentLesson.exercise.question.answers}
				onSubmit={onQuestionAnswerSubmit}
			/>
		)}
	</StyledDiv>
);

// @TODO: find a way to have PropTypes for an array of multiple shapes.

Sidebar.propTypes = {
	notionName: PropTypes.string.isRequired,
	currentLesson: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		order: PropTypes.number.isRequired,
		exercise: PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			question: PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				singleChoice: PropTypes.bool.isRequired,
				statement: PropTypes.string.isRequired,
				explanation: PropTypes.string,
				answers: PropTypes.arrayOf(PropTypes.shape({
					text: PropTypes.string.isRequired,
					valid: PropTypes.bool.isRequired,
				})).isRequired,
			}).isRequired,
		}),
	}).isRequired,
	notionContent: PropTypes.arrayOf(
		PropTypes.oneOfType([
			// Lessons
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				name: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				content: PropTypes.string.isRequired,
				order: PropTypes.number.isRequired,
				contentType: PropTypes.exact('lesson').isRequired,
				exercise: PropTypes.shape({
					id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
					question: PropTypes.shape({
						id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
						singleChoice: PropTypes.bool.isRequired,
						statement: PropTypes.string.isRequired,
						explanation: PropTypes.string,
						answers: PropTypes.arrayOf(PropTypes.shape({
							text: PropTypes.string.isRequired,
							valid: PropTypes.bool.isRequired,
						})).isRequired,
					}).isRequired,
				}),
			}),
			// Exercises
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				order: PropTypes.number.isRequired,
				contentType: PropTypes.exact('exercise').isRequired,
				question: PropTypes.shape({
					id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
					singleChoice: PropTypes.bool.isRequired,
					statement: PropTypes.string.isRequired,
					explanation: PropTypes.string,
					answers: PropTypes.arrayOf(PropTypes.shape({
						text: PropTypes.string.isRequired,
						valid: PropTypes.bool.isRequired,
					})).isRequired,
				}).isRequired,
			}),
		])
	),
	onQuestionAnswerSubmit: PropTypes.func.isRequired,
	onCurrentDocumentRedirect: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
	notionContent: [],
};

export default Sidebar;
