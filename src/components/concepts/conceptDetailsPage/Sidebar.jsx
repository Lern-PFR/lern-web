import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { createUserAnswer, retrieveAnswerByQuestionId } from 'redux/actions/userAnswers';
import { extractFirstQuestionFromLesson } from 'redux/selectors/lessons';
import { getUserAnswer } from 'redux/selectors/userAnswers';

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
 * @param {func}	onCurrentDocumentRedirect	Method to trigger when the user clicks on a navigation stepper to redirect him to the desired document.
 */
const Sidebar = ({ conceptTitle, currentLesson, conceptContent, onContentStepperClick }) => {
	const question = useSelector((state) => extractFirstQuestionFromLesson(state, currentLesson));

	const userAnswer = useSelector(getUserAnswer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (question?.id) {
			dispatch(retrieveAnswerByQuestionId(question.id));
		}
	}, [dispatch, question?.id]);

	/**
	 * @function
	 * @name onQuestionAnswerSubmit
	 * @description Callback method to pass to the sidebar element to call the API on question form submit.
	 */
	const onQuestionAnswerSubmit = useCallback((answerId) => {
		if (question?.id && answerId && (question?.answers ?? []).filter(({ id }) => (id === answerId)).length > 0) {
			dispatch(createUserAnswer(question.id, answerId));
		}
	}, [dispatch, question]);

	return (
		<aside>
			<StyledDiv {...sidebar}>
				<Paragon tag="h1" {...conceptTitleStyle}>{conceptTitle}</Paragon>
				<Pica tag="h2" {...lessonTitle}>{currentLesson.title}</Pica>
				<ConceptContentNavigator
					currentDocOrder={currentLesson.order}
					conceptContent={conceptContent}
					redirectTo={onContentStepperClick}
				/>
				{question && (
					<QuestionForm
						singleChoice={question.type === 'SingleChoice'}
						answers={question.answers}
						answerHasBeenSubmitted={!!userAnswer && (userAnswer?.questionId === question.id)}
						onSubmit={onQuestionAnswerSubmit}
					/>
				)}
			</StyledDiv>
		</aside>
	);
};

Sidebar.propTypes = {
	conceptTitle: PropTypes.string.isRequired,
	currentLesson: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		order: PropTypes.number.isRequired,
	}).isRequired,
	conceptContent: PropTypes.arrayOf(
		PropTypes.shape({
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
		}),
	),
	onContentStepperClick: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
	conceptContent: [],
};

export default Sidebar;
