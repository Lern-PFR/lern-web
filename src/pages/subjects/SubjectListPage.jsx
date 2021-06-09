import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import { getSubjectsByTitleOrAuthor } from 'redux/selectors/subjects';
import { clearSubjectList, fetchSubjectList } from 'redux/actions/subjects';
import { BodyCopy, Canon } from 'components/shared/typography';
import { layout, searchInput, sectionList } from 'theme/pages/subjects/subjectListPage';
import { SubjectCard, SubjectListSectionTitle } from 'components/subjects/subjectListPage';
import { InputComponent } from 'components/shared/form';

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
	const [searchValue, setSearchValue] = useState('');

	const subjects = useSelector((state) => getSubjectsByTitleOrAuthor(state, searchValue));

	useEffect(() => {
		dispatch(fetchSubjectList());

		return () => dispatch(clearSubjectList());
	}, [dispatch]);

	/**
	 * @function
	 * @name handleSearchInputChange
	 * @description Handles the onChange event for the search input.
	 *
	 * @author Timothée Simon-Franza
	 *
	 * @param {object} e				The onChange event.
	 * @param {object} e.target			The input triggering the event.
	 * @param {string} e.target.value	The current value of the input.
	 */
	const handleSearchInputChange = useCallback(({ target: { value } }) => {
		setSearchValue(value);
	}, [setSearchValue]);

	return (
		<StyledDiv {...layout}>
			<Canon as="h1">{t('subjects.list_page.hero')}</Canon>

			<InputComponent
				id="subject-list-search-input"
				type="text"
				onChange={handleSearchInputChange}
				placeholder={t('subjects.list_page.search_input.placeholder')}
				{...searchInput}
			/>

			<StyledDiv as="section">
				<SubjectListSectionTitle>{t('subjects.list_page.sections.active_subjects')}</SubjectListSectionTitle>
				<StyledList {...sectionList}>
					{subjects && subjects.length > 0 && subjects.map((subject) => (<SubjectCard key={subject.id} {...subject} />))}
					{(!subjects || subjects.length === 0) && <BodyCopy>{t('subjects.list_page.no_data')}</BodyCopy>}
				</StyledList>
			</StyledDiv>

			<StyledDiv as="section">
				<SubjectListSectionTitle>{t('subjects.list_page.sections.my_subjects')}</SubjectListSectionTitle>
				<StyledList {...sectionList}>
					{subjects && subjects.length > 0 && subjects.map((subject) => (<SubjectCard key={subject.id} {...subject} />))}
					{(!subjects || subjects.length === 0) && <BodyCopy>{t('subjects.list_page.no_data')}</BodyCopy>}
				</StyledList>
			</StyledDiv>

			<StyledDiv as="section">
				<SubjectListSectionTitle>{t('subjects.list_page.sections.other_available_subjects')}</SubjectListSectionTitle>
				<StyledList {...sectionList}>
					{subjects && subjects.length > 0 && subjects.map((subject) => (<SubjectCard key={subject.id} {...subject} />))}
					{(!subjects || subjects.length === 0) && <BodyCopy>{t('subjects.list_page.no_data')}</BodyCopy>}
				</StyledList>
			</StyledDiv>
		</StyledDiv>
	);
};

SubjectListPage.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(SubjectListPage);
