import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import { Paragon } from 'components/shared/typography';
import { timelineTitle as timelineTitleStyle } from 'theme/pages/home/homepageAuth';
import SubjectListItem from './SubjectListItem';

/**
 * @name LatestCourses
 * @description The list of latest courses this user has accessed
 *
 * @author Christopher Walker
 *
 * @param {object} latestCourses	The list of latest courses accessed by this user.
 * @param {func} t					The translation method provided by the withTranslation HoC.
 */
const LatestCourses = ({ t, latestCourses }) => (
	<StyledDiv>
		<Paragon tag="h1" {...timelineTitleStyle}>{t('home.pages.auth.timeline')}</Paragon>
		<StyledList>
			{latestCourses.map((course) => (
				<SubjectListItem key={course.id} {...course} />
			))}
		</StyledList>
	</StyledDiv>
);

LatestCourses.propTypes = {
	t: PropTypes.func.isRequired,
	latestCourses: PropTypes.string.isRequired,
};

export default (withTranslation)(LatestCourses);
