import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { getSubjectById } from 'redux/selectors/subjects';
import { fetchSubject, updateSubject } from 'redux/actions/subjects';

import { StyledDiv } from 'components/shared/styledElements';
import { DoublePica } from 'components/shared/typography';
import { NavigationSidebar, SubjectEditionForm, SubjectModuleList } from 'components/content';

import { contentSection, layout, title } from 'theme/contentEditionCommon/genericLayout';

/**
 * @name SubjectEditionPage
 * @description A page used to edit a subject.
 *
 * @author Timothée Simon-Franza
 */
const SubjectEditionPage = () => {
	const { subjectId } = useParams();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const subject = useSelector((state) => getSubjectById(state, subjectId));

	useEffect(() => {
		dispatch(fetchSubject(subjectId));
	}, [dispatch, subjectId]);

	const onSubmit = useCallback((formData) => {
		dispatch(updateSubject(formData, subjectId));
	}, [dispatch, subjectId]);

	return (
		<StyledDiv {...layout}>
			<NavigationSidebar currentlyUpdatingSubjectId={subjectId} currentlyUpdatingElementId={subjectId} />
			<StyledDiv {...contentSection}>
				<DoublePica as="h1" {...title}>{t('subjects.edition.title')}</DoublePica>
				{!subject && <></>}
				{subject && (
					<>
						<SubjectEditionForm onSubmit={onSubmit} subject={subject} />
						<SubjectModuleList moduleList={subject.modules ?? []} subjectId={subject.id} />
					</>
				)}
			</StyledDiv>
		</StyledDiv>
	);
};

export default SubjectEditionPage;
