import PropTypes from 'prop-types';
import { StyledDiv } from 'components/shared/styledElements';
import { Paragon, Pica } from 'components/shared/typography';
import { lessonTitle, conceptTitle as conceptTitleStyle, sidebar } from 'theme/pages/concepts/conceptDetailsPage';
import ConceptContentNavigator from './ConceptContentNavigator';
import QuestionForm from './QuestionForm';

/**
 * @name Sidebar
 * @description The sidebar to display on the concept details page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	conceptTitle				The current concept's title.
 * @param {object}	currentLesson				The current lesson.
 * @param {array}	conceptContent				An array of all lessons and exercises composing the current concept.
 * @param {func}	onQuestionAnswerSubmit		Method to trigger upon submission of the question form.
 * @param {func}	onCurrentDocumentRedirect	Method to trigger when the user clicks on a navigation stepper to redirect him to the desired document.
 */
const Sidebar = ({ conceptTitle, currentLesson, conceptContent, onQuestionAnswerSubmit, onCurrentDocumentRedirect }) => (
	<aside>
		<StyledDiv {...sidebar}>
			<Paragon tag="h1" {...conceptTitleStyle}>{conceptTitle}</Paragon>
			<Pica tag="h2" {...lessonTitle}>{currentLesson.title}</Pica>
			<ConceptContentNavigator
				currentDocOrder={currentLesson.order}
				conceptContent={conceptContent}
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
	</aside>
);

Sidebar.propTypes = {
	conceptTitle: PropTypes.string.isRequired,
	currentLesson: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
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
	conceptContent: PropTypes.arrayOf(
		PropTypes.oneOfType([
			// Lessons
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				content: PropTypes.string.isRequired,
				order: PropTypes.number.isRequired,
				contentType: PropTypes.oneOf(['lesson']).isRequired,
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
				contentType: PropTypes.oneOf(['exercise']).isRequired,
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
	conceptContent: [],
};

export default Sidebar;
