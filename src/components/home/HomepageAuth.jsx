import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearSubjectList, fetchSubjectList } from 'redux/actions/subjects';
import { clearProgressionList, fetchProgressionList } from 'redux/actions/progression';

import { PrimaryButton, SubtleButton } from 'components/shared/buttons';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { StyledDiv } from 'components/shared/styledElements';
import { BodyCopy, Canon } from 'components/shared/typography';
import {
	layout,
	hero,
	subtitle,
	mainContainer,
	lernButton,
} from 'theme/pages/home/homepageAuth';
import { Link } from 'components/shared/navigation';
import routes from 'routes';
import LatestCourses from './LatestCourses';
import Sidebar from './Sidebar';

/**
 * @name HomepageAuth
 * @description The homepage to display to anonymous (non-connected) users
 *
 * @author Christopher Walker
 *
 * @param {func} t	The translation method provided by the withTranslation HoC.
 */
const HomepageAuth = ({ t, user }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSubjectList());
		dispatch(fetchProgressionList());

		return () => {
			dispatch(clearSubjectList());
			dispatch(clearProgressionList());
		};
	}, [dispatch]);

	return (
		<StyledDiv {...layout}>
			<StyledDiv display="flex" flexDirection="column" {...mainContainer}>
				<StyledDiv>
					<Canon {...hero} tag="h1">{t('home.pages.auth.hero', { user })}</Canon>
					<BodyCopy {...subtitle}>{t('home.pages.auth.subtitle')}</BodyCopy>
					<PrimaryButton>
						<Link to={routes.subjects.default}>{t('home.pages.auth.links.subjects')}</Link>
					</PrimaryButton>
					<SubtleButton {...lernButton}>
						<Link to={routes.subjects.subjectStructure}>{t('home.pages.auth.links.structure')}</Link>
					</SubtleButton>
				</StyledDiv>
				<LatestCourses />
			</StyledDiv>
			<Sidebar />
		</StyledDiv>
	);
};

HomepageAuth.propTypes = {
	t: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

export default withTranslation()(HomepageAuth);
