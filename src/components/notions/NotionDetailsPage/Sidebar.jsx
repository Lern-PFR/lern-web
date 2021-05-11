import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { StyledDiv, StyledList } from 'components/shared/layout';
import { Paragon, Pica } from 'components/shared/typography';
import { lessonTitle, notionTitle, sidebar } from 'theme/pages/notions/notionDetailsPage';
import NotionContentNavigator from './NotionContentNavigator';

/**
 *
 * @param {*} param0
 * @returns
 */
const Sidebar = ({ notionName, currentLesson, lessons, exercises, onQuestionAnswerSubmit, onCurrentDocumentRedirect }) => {
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
			<Paragon {...notionTitle}>{notionName}</Paragon>
			<Pica {...lessonTitle}>{currentLesson.name}</Pica>
			<NotionContentNavigator lessons={lessons} exercises={exercises} redirectTo={onCurrentDocumentRedirect} />
			{currentLesson.exercise && (
				<form onSubmit={handleSubmit}>
					<StyledList>
						{currentLesson.exercise.question.answers.map(({ id, isValid, text }) => (
							<Fragment key={id}>
								<label htmlFor={id}>{text}</label>
								<input id={id} type="radio" name="answer" value={id} isValid={isValid} />
							</Fragment>
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
	lessons: PropTypes.arrayOf(PropTypes.shape({
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
	})).isRequired,
	exercises: PropTypes.arrayOf(
		PropTypes.shape({
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
	),
	onQuestionAnswerSubmit: PropTypes.func.isRequired,
	onCurrentDocumentRedirect: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
	exercises: [],
};

export default Sidebar;
