import { ExerciseCreationForm, NavigationSidebar } from 'components/content';
import StyledDiv from 'components/shared/styledElements/StyledDiv';
import { DoublePica } from 'components/shared/typography';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { createExercise } from 'redux/actions/exercises';
import { fetchLesson } from 'redux/actions/lessons';
import { fetchConcept } from 'redux/actions/concepts';
import { fetchModule } from 'redux/actions/modules';
import { fetchSubject } from 'redux/actions/subjects';
import { getLessonById } from 'redux/selectors/lessons';
import { getConceptById } from 'redux/selectors/concepts';
import { getModuleById } from 'redux/selectors/modules';
import { contentSection, layout, title } from 'theme/contentEditionCommon/genericLayout';

/**
 * @name ExerciseCreationPage
 * @description A page used to create a lesson.
 *
 * @author Christopher Walker
 */
const ExerciseCreationPage = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { lessonId } = useParams();
	const lesson = useSelector((state) => getLessonById(state, lessonId));
	const concept = useSelector((state) => getConceptById(state, lesson?.conceptId));
	const module = useSelector((state) => getModuleById(state, concept?.moduleId));

	useEffect(() => {
		dispatch(fetchLesson(lessonId));
	}, [dispatch, lessonId]);

	useEffect(() => {
		if (lesson?.conceptId) {
			dispatch(fetchConcept(lesson?.conceptId));
		}
	}, [dispatch, lesson?.conceptId]);

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
		const exerciseCreationData = {
			title: 'string',
			description: 'stringstri',
			content: 'string',
			lessonId: lesson.id,
			lessonVersion: lesson.version,
			question: { ...formData },
		};

		dispatch(createExercise(exerciseCreationData));
	}, [lesson?.id, lesson?.version, dispatch]);

	return (
		<StyledDiv {...layout}>
			{lesson && concept && module && (
				<>
					<NavigationSidebar currentlyUpdatingSubjectId={module?.subjectId} contentCreationOptions={{ contentType: 'exercise', parentId: lessonId }} />
					<StyledDiv {...contentSection}>
						<DoublePica as="h1" {...title}>{t('exercises.creation.title')}</DoublePica>
						<ExerciseCreationForm onSubmit={onSubmit} />
					</StyledDiv>
				</>
			)}
		</StyledDiv>
	);
};

export default ExerciseCreationPage;
