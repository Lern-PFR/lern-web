import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { generatePath } from 'react-router';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import routes from 'routes/keys';
import conf from 'conf';
import { notionDetailsMock } from 'mockedData';

import { fetchNotion } from 'redux/actions/notions';
import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { LessonContent, Sidebar } from 'components/notions/NotionDetailsPage';
import { SubtleLinkButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import { backToModuleSvg, pageLayout } from 'theme/pages/notions/notionDetailsPage';
import { backToParentButtonContentLayout } from 'theme/buttonStyles';
/**
 * @name NotionDetailsPage
 * @description A page used to display a the current notion and its composing lessons.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}			content				An array of the current notion's lessons and exercises.
 * @param {func}			dispatchFetchNotion	Dispatched action creator used to retrieve the current notion.
 * @param {number|string}	[lessonId]			The current lesson's id.
 * @param {object}			module				The notion's parent module.
 * @param {number|string}	notionId			The current notion's id.
 * @param {object}			notion				The current notion.
 * @param {func}			t					The translation method provided by the withTranslation HoC.
 */
const NotionDetailsPage = ({ content, dispatchFetchNotion, lessonId, module, notionId, notion, t }) => {
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
		<StyledDiv>
			<StyledDiv {...pageLayout}>
				<StyledDiv paddingTop="24px">
					<SubtleLinkButton padding="0">
						<Link to={generatePath(routes.modules.moduleDetails, { moduleId: module.id })}>
							<StyledDiv {...backToParentButtonContentLayout}>
								<StyledSvg src={`${conf.svgPath}/chevronLeft.svg`} {...backToModuleSvg} />
								{t('notions.links.back_to_module', { module })}
							</StyledDiv>
						</Link>
					</SubtleLinkButton>
					<LessonContent
						{...content[currentIndex]}
						question={content[currentIndex].exercise?.question?.statement}
					/>
				</StyledDiv>
				<Sidebar
					currentLesson={content[currentIndex]}
					notionContent={content}
					notionName={notion.title}
					onQuestionAnswerSubmit={onQuestionAnswerSubmit}
					onCurrentDocumentRedirect={(index) => setCurrentIndex(index)}
				/>
			</StyledDiv>
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
	).isRequired,
	module: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	t: PropTypes.func.isRequired,
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
	const { exercises, lessons, modules, notion } = notionDetailsMock;

	const content = [
		...lessons.map((lesson) => ({ ...lesson, contentType: 'lesson' })),
		...exercises.map((exercise) => ({ ...exercise, contentType: 'exercise' })),
	];

	_.sortBy(content, 'order');

	return {
		notionId,
		notion,
		content,
		lessonId,
		module: _.head(_.filter(modules, ({ id }) => _.isEqual(id, notion.moduleId))),
	};
};

const mapDispatchToProps = {
	dispatchFetchNotion: fetchNotion,
};

export default compose(
	withTranslation(),
	connect(mapStateToProps, mapDispatchToProps)
)(NotionDetailsPage);
