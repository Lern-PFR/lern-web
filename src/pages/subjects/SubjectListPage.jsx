import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import { getSubjects } from 'redux/selectors/subjects';
import { fetchSubjectList } from 'redux/actions/subjects';
import { Canon } from 'components/shared/typography';
import { subjectListPageMock } from 'mockedData';
import { layout, sectionList } from 'theme/pages/subjects/subjectListPage';
import { SubjectCard, SubjectListSectionTitle } from 'components/subjects/subjectListPage';

/**
 * @name SubjectListPage
 * @description A page used to display all available subjects.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} t The translation method provided by the withTranslation HoC.
 */
const SubjectListPage = ({ t }) => {
	const dispatch = useDispatch();

	// @TODO: remove data mock usage once authentication has been merged.
	let subjects = useSelector(getSubjects);
	subjects = subjectListPageMock.subjects;

	useEffect(() => {
		dispatch(fetchSubjectList());
	}, [dispatch]);

	return (
		<StyledDiv {...layout}>
			<Canon as="h1">{t('subjects.list_page.hero')}</Canon>

			<StyledDiv as="section">
				<SubjectListSectionTitle>{t('subjects.list_page.sections.active_subjects')}</SubjectListSectionTitle>
				<StyledList {...sectionList}>
					{subjects.map((subject) => (<SubjectCard key={subject.id} {...subject} />))}
				</StyledList>
			</StyledDiv>

			<StyledDiv as="section">
				<SubjectListSectionTitle>{t('subjects.list_page.sections.my_subjects')}</SubjectListSectionTitle>
				<StyledList {...sectionList}>
					{subjects.map((subject) => (<SubjectCard key={subject.id} {...subject} />))}
				</StyledList>
			</StyledDiv>

			<StyledDiv as="section">
				<SubjectListSectionTitle>{t('subjects.list_page.sections.other_available_subjects')}</SubjectListSectionTitle>
				<StyledList {...sectionList}>
					{subjects.map((subject) => (<SubjectCard key={subject.id} {...subject} />))}
				</StyledList>
			</StyledDiv>
		</StyledDiv>
	);
};

SubjectListPage.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(SubjectListPage);
