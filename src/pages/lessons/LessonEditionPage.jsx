import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { fetchConcept } from 'redux/actions/concepts';
import { fetchLesson, updateLesson } from 'redux/actions/lessons';
import { fetchModule } from 'redux/actions/modules';
import { fetchSubject } from 'redux/actions/subjects';
import { getConceptById } from 'redux/selectors/concepts';
import { getLessonById, getLessonOrderOptions } from 'redux/selectors/lessons';

import { getModuleById } from 'redux/selectors/modules';
import { LessonEditionForm, NavigationSidebar, LessonQuestionList } from 'components/content';
import { StyledDiv } from 'components/shared/styledElements';
import { DoublePica } from 'components/shared/typography';

import { contentSection, layout, title } from 'theme/contentEditionCommon/genericLayout';

/**
 * @name LessonEditionPage
 * @description A page used to edit a lesson.
 *
 * @autor Timothée Simon-Franza
 */
const LessonEditionPage = () => {
	const { lessonId } = useParams();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const lesson = useSelector((state) => getLessonById(state, lessonId));
	const lessonOrderOptions = useSelector((state) => getLessonOrderOptions(state, lesson?.conceptId));
	const concept = useSelector((state) => getConceptById(state, lesson?.conceptId));
	const module = useSelector((state) => getModuleById(state, concept?.moduleId));

	useEffect(() => {
		dispatch(fetchLesson(lessonId));
	}, [dispatch, lessonId]);

	useEffect(() => {
		if (lesson?.conceptId) {
			dispatch(fetchConcept(lesson.conceptId));
		}
	}, [dispatch, lesson?.conceptId]);

	useEffect(() => {
		if (concept?.moduleId) {
			dispatch(fetchModule(concept?.moduleId));
		}
	}, [dispatch, concept?.moduleId]);

	useEffect(() => {
		if (module?.subjectId) {
			dispatch(fetchSubject(module?.subjectId));
		}
	}, [dispatch, module?.subjectId]);

	const onSubmit = useCallback((formData) => {
		const lessonEditionData = {
			...formData,
			conceptId: lesson.conceptId,
		};

		dispatch(updateLesson(lessonEditionData, lesson.id, module?.subjectId));
	}, [dispatch, lesson, module?.subjectId]);

	return (
		<StyledDiv {...layout}>
			<NavigationSidebar currentlyUpdatingSubjectId={module?.subjectId} currentlyUpdatingElementId={lessonId} />
			<StyledDiv {...contentSection}>
				<DoublePica as="h1" {...title}>{t('lessons.edition.title')}</DoublePica>
				{!lesson && <></>}
				{lesson && (
					<>
						<LessonEditionForm onSubmit={onSubmit} lesson={lesson} lessonOrderOptions={lessonOrderOptions} />
						<LessonQuestionList exerciseList={lesson.exercises ?? []} lessonId={lesson.id} />
					</>
				)}
			</StyledDiv>
		</StyledDiv>
	);
};

export default LessonEditionPage;
