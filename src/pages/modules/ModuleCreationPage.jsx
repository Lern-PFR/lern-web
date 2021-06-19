import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { createModule } from 'redux/actions/modules';
import { ModuleCreationForm, NavigationSidebar } from 'components/content';
import { StyledDiv } from 'components/shared/styledElements';
import { DoublePica } from 'components/shared/typography';

import { layout, contentSection, title } from 'theme/contentEditionCommon/genericLayout';
import { fetchSubject } from 'redux/actions/subjects';
import { getSubjectById } from 'redux/selectors/subjects';

/**
 * @name ModuleCreationPage
 * @description A page used to create a module
 *
 * @author Timothée Simon-Franza
 */
const ModuleCreationPage = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { subjectId } = useParams();
	const subject = useSelector((state) => getSubjectById(state, subjectId));

	useEffect(() => {
		dispatch(fetchSubject(subjectId));
	}, [dispatch, subjectId]);

	const onSubmit = useCallback((formData) => {
		const moduleCreationData = {
			...formData,
			subjectId: subject.id,
			order: subject?.modules?.length ?? 0,
		};

		dispatch(createModule(moduleCreationData));
	}, [dispatch, subject]);

	return (
		<StyledDiv {...layout}>
			<NavigationSidebar currentlyUpdatingSubjectId={subjectId} contentCreationOptions={{ contentType: 'module', parentId: subjectId }} />
			<StyledDiv {...contentSection}>
				<DoublePica as="h1" {...title}>{t('modules.creation.title')}</DoublePica>
				<ModuleCreationForm onSubmit={onSubmit} />
			</StyledDiv>
		</StyledDiv>
	);
};

export default ModuleCreationPage;
