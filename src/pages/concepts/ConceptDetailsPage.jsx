import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import routes from 'routes';
import conf from 'conf';

import { fetchConcept } from 'redux/actions/concepts';
import { getConceptById } from 'redux/selectors/concepts';

import StyledSvg from 'components/shared/styledElements/StyledSvg';
import { LessonContent, Sidebar } from 'components/concepts/conceptDetailsPage';
import { StyledDiv } from 'components/shared/styledElements';
import { SubtleLinkButton } from 'components/shared/buttons';

import { backToModuleSvg, pageLayout } from 'theme/pages/concepts/conceptDetailsPage';
import { backToParentButtonContentLayout } from 'theme/buttonStyles';
import { Link } from 'components/shared/navigation';
import { findIndex } from 'lodash';

/**
 * @name ConceptDetailsPage
 * @description A page used to display the current concept and its composing lessons.
 *
 * @author Timothée Simon-Franza
 */
const ConceptDetailsPage = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { conceptId, lessonId = undefined } = useParams();

	/**
	 * @var
	 * @name concept
	 * @description The current concept, retrieved from the Redux state.
	 * @type {object|undefined}
	 */
	const concept = useSelector((state) => getConceptById(state, conceptId));

	/**
	 * @var
	 * @name currentContentIndex
	 * @description A local state used to determinate the lesson to display from the current concept.
	 * @type {object, func}
	 */
	const [currentContentIndex, setCurrentContentIndex] = useState(0);

	/**
	 * @constant
	 * @name backToModuleLink
	 * @description The redirection link towards the current concept's parent module.
	 * @type {string}
	 */
	const backToModuleLink = useMemo(() => (
		concept?.moduleId ? generatePath(routes.modules.moduleDetails, { moduleId: concept?.moduleId }) : undefined
	), [concept?.moduleId]);

	/**
	 * @callback
	 * @description useEffect called on mount to retrieve the current concept's data using its id.
	 */
	useEffect(() => {
		dispatch(fetchConcept(conceptId));
	}, [conceptId, dispatch]);

	/**
	 * @callback
	 * @description useEffect if the url contains a lessonId param. Used to automatically display the lesson it identifies.
	 */
	useEffect(() => {
		if (concept?.lessons && lessonId) {
			const newIndex = findIndex(concept.lessons, (({ id }) => id === lessonId));
			setCurrentContentIndex(newIndex || 0);
		}
	}, [concept?.lessons, lessonId]);

	/**
	 * @constant
	 * @name currentLesson
	 * @description The lesson to display, determined by the currentContentIndex local state variable.
	 * @type {object}
	 */
	const currentLesson = useMemo(() => (concept?.lessons?.[currentContentIndex]), [concept?.lessons, currentContentIndex]);

	/**
	 * @function
	 * @name onQuestionAnswerSubmit
	 * @description Callback method to pass to the sidebar element to call the API on question form submit.
	 */
	const onQuestionAnswerSubmit = useCallback(() => {}, []);

	return (
		<StyledDiv {...pageLayout}>
			{concept && currentLesson && (
				<>
					<StyledDiv paddingTop="24px">
						<SubtleLinkButton>
							<Link to={backToModuleLink}>
								<StyledDiv {...backToParentButtonContentLayout}>
									<StyledSvg src={`${conf.svgPath}/chevronLeft.svg`} {...backToModuleSvg} />
									{t('concepts.links.back_to_module')}
								</StyledDiv>
							</Link>
						</SubtleLinkButton>
						<LessonContent {...currentLesson} />
					</StyledDiv>
					<Sidebar
						currentLesson={currentLesson}
						conceptContent={concept?.lessons}
						conceptTitle={concept?.title}
						onQuestionAnswerSubmit={onQuestionAnswerSubmit}
						onContentStepperClick={setCurrentContentIndex}
					/>
				</>
			)}
		</StyledDiv>
	);
};

export default ConceptDetailsPage;
