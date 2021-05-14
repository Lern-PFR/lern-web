import PropTypes from 'prop-types';
import { StyledDiv, StyledList, StyledListItem } from 'components/shared/layout';
import { BodyCopy, Paragon, Pica } from 'components/shared/typography';
import { answerListItem, answersList, lessonTitle, notionTitle, sidebar } from 'theme/pages/notions/notionDetailsPage';
import NotionContentNavigator from './NotionContentNavigator';

/**
 *
 * @param {*} param0
 * @returns
 */
const Sidebar = ({ notionName, currentLesson, notionContent, onQuestionAnswerSubmit, onCurrentDocumentRedirect }) => {
	/**
	 *
	 * @param {*} e
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		onQuestionAnswerSubmit(e);
	};

	return (
		<StyledDiv {...sidebar}>
			<Paragon tag="h1" {...notionTitle}>{notionName}</Paragon>
			<Pica tag="h2" {...lessonTitle}>{currentLesson.name}</Pica>
			<NotionContentNavigator notionContent={notionContent} redirectTo={onCurrentDocumentRedirect} />
			{currentLesson.exercise && (
				<form onSubmit={handleSubmit}>
					<StyledList {...answersList}>
						{currentLesson.exercise.question.answers.map(({ id, isValid, text }) => (
							<StyledListItem key={id} {...answerListItem}>
								<input id={id} type="radio" name="answer" value={id} isValid={isValid} />
								<BodyCopy tag="label" htmlFor={id}>{text}</BodyCopy>
							</StyledListItem>
						))}
					</StyledList>
				</form>
			)}
		</StyledDiv>
	);
};

Sidebar.propTypes = {
	notionName: PropTypes.string.isRequired,
	currentLesson: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
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
				contentTypes: PropTypes.exact('lesson').isRequired,
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
				contentTypes: PropTypes.exact('exercise').isRequired,
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
