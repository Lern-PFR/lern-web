import { useSelector } from 'react-redux';
import { getSubjects } from 'redux/selectors/subjects';
import { useTranslation } from 'react-i18next';
import { StyledDiv, StyledList, StyledSvg } from 'components/shared/styledElements';
import { Paragon, GreatPrimer } from 'components/shared/typography';
import { continueButton, latestContainer, latestList, timelineTitle as timelineTitleStyle } from 'theme/pages/home/homepageAuth';
import { OutlinedLinkButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import conf from 'conf';
import routes from 'routes';
import SubjectListItem from './SubjectListItem';

/**
 * @name LatestCourses
 * @description The list of latest courses this user has accessed
 *
 * @author Christopher Walker
 */
const LatestCourses = () => {
	const { t } = useTranslation();
	const latestCourses = useSelector((state) => getSubjects(state));

	return (
		<StyledDiv {...latestContainer}>
			<Paragon tag="h1" {...timelineTitleStyle}>{t('home.pages.auth.latest')}</Paragon>
			{latestCourses.active.length > 0 && (
				<StyledList {...latestList}>
					{latestCourses.active.map((course) => (
						<SubjectListItem key={course.id} {...course} />
					))}
				</StyledList>
			)}
			{latestCourses.active.length === 0 && (
				<StyledDiv>
					<GreatPrimer>
						{ t('home.pages.auth.no_active') }
					</GreatPrimer>
					<StyledSvg src={`${conf.svgIllustrationsPath}/homepage_auth_no_active.svg`} />
					<OutlinedLinkButton {...continueButton}>
						<Link to={routes.subjects.default}>{t('home.pages.auth.links.subjects')}</Link>
					</OutlinedLinkButton>
				</StyledDiv>
			)}
		</StyledDiv>
	);
};

export default LatestCourses;
