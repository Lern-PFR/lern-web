import { LessonCreationForm, NavigationSidebar } from 'components/content';
import StyledDiv from 'components/shared/styledElements/StyledDiv';
import { DoublePica } from 'components/shared/typography';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { fetchConcept } from 'redux/actions/concepts';
import { createLesson } from 'redux/actions/lessons';
import { fetchModule } from 'redux/actions/modules';
import { fetchSubject } from 'redux/actions/subjects';
import { getConceptById } from 'redux/selectors/concepts';
import { getModuleById } from 'redux/selectors/modules';
import { contentSection, layout, title } from 'theme/contentEditionCommon/genericLayout';

/**
 * @name LessonCreationPage
 * @description A page used to create a lesson.
 *
 * @author Timothée Simon-Franza
 */
const LessonCreationPage = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { conceptId } = useParams();
	const concept = useSelector((state) => getConceptById(state, conceptId));
	const module = useSelector((state) => getModuleById(state, concept?.moduleId));

	useEffect(() => {
		dispatch(fetchConcept(conceptId));
	}, [dispatch, conceptId]);

	useEffect(() => {
		if (concept?.moduleId) {
			dispatch(fetchModule(concept?.moduleId));
		}
	}, [dispatch, concept?.moduleId]);

	// Required to update the navigation sidebar content.
	useEffect(() => {
		if (module?.subjectId) {
			dispatch(fetchSubject(module?.subjectId));
		}
	}, [dispatch, module?.subjectId]);

	const onSubmit = useCallback((formData) => {
		const lessonCreationData = {
			...formData,
			conceptId: concept.id,
			order: concept?.lessons?.length ?? 0,
		};

		dispatch(createLesson(lessonCreationData));
	}, [concept?.id, concept?.lessons?.length, dispatch]);

	return (
		<StyledDiv {...layout}>
			{concept && module && (
				<>
					<NavigationSidebar currentlyUpdatingSubjectId={module?.subjectId} contentCreationOptions={{ contentType: 'lesson', parentId: conceptId }} />
					<StyledDiv {...contentSection}>
						<DoublePica as="h1" {...title}>{t('lessons.creation.title')}</DoublePica>
						<LessonCreationForm onSubmit={onSubmit} />
					</StyledDiv>
				</>
			)}
		</StyledDiv>
	);
};

export default LessonCreationPage;
