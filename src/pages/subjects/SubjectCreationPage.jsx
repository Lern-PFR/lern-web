import { StyledDiv } from 'components/shared/styledElements';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createSubject } from 'redux/actions/subjects';
import { DoublePica } from 'components/shared/typography';
import { NavigationSidebar, SubjectCreationForm } from 'components/subjects/subjectCreationPage';
import { contentSection, layout, title } from 'theme/pages/subjects/subjectCreationPage';

/**
 * @name SubjectCreationPage
 * @description A page used to create a subject.
 *
 * @author Timothée Simon-Franza
 */
const SubjectCreationPage = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const onSubmit = useCallback((formData) => {
		dispatch(createSubject(formData));
	}, [dispatch]);

	return (
		<StyledDiv {...layout}>
			<NavigationSidebar />
			<StyledDiv {...contentSection}>
				<DoublePica as="h1" {...title}>{t('subjects.creation.title')}</DoublePica>
				<SubjectCreationForm onSubmit={onSubmit} />
			</StyledDiv>
		</StyledDiv>
	);
};

export default SubjectCreationPage;
