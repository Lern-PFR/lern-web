import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import { StyledDiv } from 'components/shared/layout';
import { pageLayout } from 'theme/pages/notions/notionDetailsPage';
import { fetchNotion } from 'redux/actions/notions';
import { BodyCopy, Trafalgar } from 'components/shared/typography';
import { Sidebar } from 'components/notions/NotionDetailsPage';
import { notionDetailsMock } from 'mockedData';
/**
 * @name NotionDetailsPage
 * @description A page used to display a the current notion and its composing lessons.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func}			dispatchFetchNotion	Dispatched action creator used to retrieve the current notion.
 * @param {number|string}	notionId			The current notion's id.
 * @param {object}			notion				The current notion.
 * @param {array}			lessons				The list of notions linked to the current notion.
 * @param {array}			exercises			The list of exercises linked to the current notion or its composing lessons.
 * @param {array}			questions			The list of questions linked to the current notion's exercises.
 */
const NotionDetailsPage = ({ dispatchFetchNotion, notionId, notion, lessons, exercises }) => {
	useEffect(() => {
		dispatchFetchNotion(notionId);
	}, [dispatchFetchNotion, notionId]);

	const [currentLesson, setCurrentLesson] = useState(lessons[0] ?? null);

	/**
	 *
	 */
	const onQuestionAnswerSubmit = () => {};
	/**
	 *
	 */
	const onCurrentDocumentRedirect = useCallback((elementType, id = undefined) => {
		if (elementType === 'lesson' && id) {
			const selectedLesson = lessons.filter(({ id: pId }) => _.isEqual(pId, id));
			if (selectedLesson.length > 0) {
				setCurrentLesson(selectedLesson[0]);
			}
		}
	}, [lessons]);

	return (
		<StyledDiv {...pageLayout}>
			<StyledDiv>
				<Trafalgar>{currentLesson.name}</Trafalgar>
				<BodyCopy>{currentLesson.content}</BodyCopy>
			</StyledDiv>
			<Sidebar
				notionName={notion.title}
				currentLesson={currentLesson}
				lessons={lessons}
				exercises={exercises}
				onQuestionAnswerSubmit={onQuestionAnswerSubmit}
				onCurrentDocumentRedirect={onCurrentDocumentRedirect}
			/>
		</StyledDiv>
	);
};

NotionDetailsPage.propTypes = {
	notionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	notion: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		moduleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
	// Dispatched redux action creators
	dispatchFetchNotion: PropTypes.func.isRequired,
};

NotionDetailsPage.defaultProps = {
	exercises: [],
};

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state, ownProps) => {
	const { match: { params: { id: notionId } } } = ownProps;

	// @TODO: replace with real information once data can be retrieved from the API.

	return {
		notionId,
		notion: notionDetailsMock.notion,
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
