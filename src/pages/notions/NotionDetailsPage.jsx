import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import { StyledDiv } from 'components/shared/layout';
import { pageLayout } from 'theme/pages/notions/notionDetailsPage';
import { fetchNotion } from 'redux/actions/notions';
import { LessonContent, Sidebar } from 'components/notions/NotionDetailsPage';
import { notionDetailsMock } from 'mockedData';

/**
 * @name NotionDetailsPage
 * @description A page used to display a the current notion and its composing lessons.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}			content				An array of the current notion's lessons and exercises.
 * @param {func}			dispatchFetchNotion	Dispatched action creator used to retrieve the current notion.
 * @param {number|string}	[lessonId]			The current lesson's id.
 * @param {number|string}	notionId			The current notion's id.
 * @param {object}			notion				The current notion.
 */
const NotionDetailsPage = ({ content, dispatchFetchNotion, lessonId, notionId, notion }) => {
	useEffect(() => {
		dispatchFetchNotion(notionId);
	}, [dispatchFetchNotion, notionId]);

	/**
	 * @field currentIndex
	 * @description The index of the current document to display.
	 *
	 * This value should match the order attribute of the lessons and exercises of the current notion.
	 */
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (lessonId) {
			setCurrentIndex(content.filter(({ id }) => _.isEqual(id, lessonId))[0]?.order || 0);
		}
	}, [content, lessonId]);

	/**
	 * @name onQuestionAnswerSubmit
	 * @description The method to trigger upon submission of the question form.
	 *
	 * @author Timothée Simon-Franza
	 */
	const onQuestionAnswerSubmit = () => {
	};

	return (
		<StyledDiv {...pageLayout}>
			<LessonContent
				{...content[currentIndex]}
				question={content[currentIndex].exercise?.question?.statement}
			/>
			<Sidebar
				currentLesson={content[currentIndex]}
				notionContent={content}
				notionName={notion.title}
				onQuestionAnswerSubmit={onQuestionAnswerSubmit}
				onCurrentDocumentRedirect={(index) => setCurrentIndex(index)}
			/>
		</StyledDiv>
	);
};

NotionDetailsPage.propTypes = {
	lessonId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	notionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	notion: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		moduleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}).isRequired,
	content: PropTypes.arrayOf(
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
	).isRequired,
	// Dispatched redux action creators
	dispatchFetchNotion: PropTypes.func.isRequired,
};

NotionDetailsPage.defaultProps = {
	lessonId: undefined,
};

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state, ownProps) => {
	const { match: { params: { notionId, lessonId = undefined } } } = ownProps;

	// @TODO: replace with real information once data can be retrieved from the API.
	const { exercises, lessons } = notionDetailsMock;

	const content = [
		...lessons.map((lesson) => ({ ...lesson, contentType: 'lesson' })),
		...exercises.map((exercise) => ({ ...exercise, contentType: 'exercise' })),
	];

	_.sortBy(content, 'order');

	return {
		notionId,
		notion: notionDetailsMock.notion,
		content,
		lessonId,
		lessons: notionDetailsMock.lessons,
		exercises: notionDetailsMock.exercises,
	};
};

const mapDispatchToProps = {
	dispatchFetchNotion: fetchNotion,
};

export default compose(
	withTranslation(),
	connect(mapStateToProps, mapDispatchToProps)
)(NotionDetailsPage);
