import PropTypes from 'prop-types';
import { StyledDiv, StyledHr } from 'components/shared/styledElements';
import { GreatPrimer } from 'components/shared/typography';
import { sectionTitleContainer, sectionTitle, sectionTitleSeparator } from 'theme/pages/subjects/subjectListPage';

/**
 * @name SubjectListSectionTitle
 * @description A component used to display section titles inside the Subject list page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} children The translated title to display.
 */
const SubjectListSectionTitle = ({ children }) => (
	<StyledDiv {...sectionTitleContainer}>
		<GreatPrimer as="h2" {...sectionTitle}>{children}</GreatPrimer>
		<StyledHr {...sectionTitleSeparator} />
	</StyledDiv>
);

SubjectListSectionTitle.propTypes = {
	children: PropTypes.string.isRequired,
};

export default SubjectListSectionTitle;
