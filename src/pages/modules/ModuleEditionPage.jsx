import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { fetchModule, updateModule } from 'redux/actions/modules';
import { getModuleById, getModuleOrderOptions } from 'redux/selectors/modules';
import { ModuleConceptList, ModuleEditionForm, NavigationSidebar } from 'components/content';
import { StyledDiv } from 'components/shared/styledElements';
import { DoublePica } from 'components/shared/typography';

import { contentSection, layout, title } from 'theme/contentEditionCommon/genericLayout';
import { fetchSubject } from 'redux/actions/subjects';

/**
 * @name ModuleEditionPage
 * @description A page used to edit a module.
 *
 * @author Timothée Simon-Franza
 */
const ModuleEditionPage = () => {
	const { moduleId } = useParams();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const module = useSelector((state) => getModuleById(state, moduleId));
	const moduleOrderOptions = useSelector((state) => getModuleOrderOptions(state, module?.subjectId));

	useEffect(() => {
		dispatch(fetchModule(moduleId));
	}, [dispatch, moduleId]);

	useEffect(() => {
		if (module?.subjectId) {
			dispatch(fetchSubject(module.subjectId));
		}
	}, [dispatch, module]);

	const onSubmit = useCallback((formData) => {
		const moduleEditionData = {
			...formData,
			subjectId: module.subjectId,
		};

		dispatch(updateModule(moduleEditionData, module.id));
	}, [dispatch, module]);

	// @TODO: add concept list.

	return (
		<StyledDiv {...layout}>
			<NavigationSidebar currentlyUpdatingSubjectId={module?.subjectId} currentlyUpdatingElementId={moduleId} />
			<StyledDiv {...contentSection}>
				<DoublePica as="h1" {...title}>{t('modules.edition.title')}</DoublePica>
				{!module && <></>}
				{module && (
					<>
						<ModuleEditionForm onSubmit={onSubmit} module={module} moduleOrderOptions={moduleOrderOptions} />
						<ModuleConceptList conceptList={module.concepts ?? []} moduleId={module.id} subjectId={module.subjectId} />
					</>
				)}
			</StyledDiv>
		</StyledDiv>
	);
};

export default ModuleEditionPage;
