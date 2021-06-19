import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { createConcept } from 'redux/actions/concepts';
import { fetchModule } from 'redux/actions/modules';
import { fetchSubject } from 'redux/actions/subjects';
import { getModuleById } from 'redux/selectors/modules';

import { StyledDiv } from 'components/shared/styledElements';
import { contentSection, layout, title } from 'theme/contentEditionCommon/genericLayout';
import { ConceptCreationForm, NavigationSidebar } from 'components/content';
import { DoublePica } from 'components/shared/typography';

/**
 * @name ConceptCreationPage
 * @description A page used to create a concept.
 *
 * @author Timothée Simon-Franza
 */
const ConceptCreationPage = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { moduleId } = useParams();
	const module = useSelector((state) => getModuleById(state, moduleId));

	useEffect(() => {
		dispatch(fetchModule(moduleId));
	}, [dispatch, moduleId]);

	useEffect(() => {
		if (module?.subjectId) {
			dispatch(fetchSubject(module.subjectId));
		}
	}, [dispatch, module]);

	const onSubmit = useCallback((formData) => {
		const conceptCreationData = {
			...formData,
			moduleId: module.id,
			order: module?.concepts?.length ?? 0,
		};

		dispatch(createConcept(conceptCreationData));
	}, [dispatch, module]);

	return (
		<StyledDiv {...layout}>
			<NavigationSidebar currentlyUpdatingSubjectId={module?.subjectId} contentCreationOptions={{ contentType: 'concept', parentId: moduleId }} />
			<StyledDiv {...contentSection}>
				<DoublePica as="h1" {...title}>{t('concepts.creation.title')}</DoublePica>
				<ConceptCreationForm onSubmit={onSubmit} />
			</StyledDiv>
		</StyledDiv>
	);
};

export default ConceptCreationPage;
