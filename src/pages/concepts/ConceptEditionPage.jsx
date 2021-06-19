import { ConceptEditionForm, ConceptLessonList, NavigationSidebar } from 'components/content';
import { StyledDiv } from 'components/shared/styledElements';
import { DoublePica } from 'components/shared/typography';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchConcept, updateConcept } from 'redux/actions/concepts';
import { fetchModule } from 'redux/actions/modules';
import { fetchSubject } from 'redux/actions/subjects';
import { getConceptById, getConceptOrderOptions } from 'redux/selectors/concepts';
import { getModuleById } from 'redux/selectors/modules';
import { contentSection, layout, title } from 'theme/contentEditionCommon/genericLayout';

/**
 * @name ConceptEditionPage
 * @description A page used to edit a concept.
 *
 * @author Timothée Simon-Franza
 */
const ConceptEditionPage = () => {
	const { conceptId } = useParams();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const concept = useSelector((state) => getConceptById(state, conceptId));
	const conceptOrderOptions = useSelector((state) => getConceptOrderOptions(state, concept?.moduleId));
	const module = useSelector((state) => getModuleById(state, concept?.moduleId));

	useEffect(() => {
		dispatch(fetchConcept(conceptId));
	}, [conceptId, dispatch]);

	useEffect(() => {
		if (concept?.moduleId) {
			dispatch(fetchModule(concept.moduleId));
		}
	}, [concept, dispatch]);

	useEffect(() => {
		if (module?.subjectId) {
			dispatch(fetchSubject(module.subjectId));
		}
	}, [module, dispatch]);

	const onSubmit = useCallback((formData) => {
		const conceptEditionData = {
			...formData,
			moduleId: concept.moduleId,
		};

		dispatch(updateConcept(conceptEditionData, concept.id, module.subjectId));
	}, [concept, dispatch, module]);

	return (
		<StyledDiv {...layout}>
			<NavigationSidebar currentlyUpdatingSubjectId={module?.subjectId} currentlyUpdatingElementId={conceptId} />
			<StyledDiv {...contentSection}>
				<DoublePica as="h1" {...title}>{t('concepts.edition.title')}</DoublePica>
				{!concept && <></>}
				{concept && (
					<>
						<ConceptEditionForm onSubmit={onSubmit} concept={concept} conceptOrderOptions={conceptOrderOptions} />
						<ConceptLessonList lessonList={concept.lessons ?? []} conceptId={concept.id} />
					</>
				)}
			</StyledDiv>
		</StyledDiv>
	);
};

export default ConceptEditionPage;
