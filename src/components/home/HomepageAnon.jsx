import { PrimaryButton } from 'components/shared/buttons';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { BodyCopy, Canon } from 'components/shared/typography';
import {
	layout,
	hero,
	subtitle,
	illustrationSvg,
} from 'theme/pages/home/homepageAnon';
import { Link } from 'components/shared/navigation';
import conf from 'conf';
import routes from 'routes';

/**
 * @name HomepageAnon
 * @description The homepage to display to anonymous (non-connected) users
 *
 * @author Christopher Walker
 *
 * @param {func} t	The translation method provided by the withTranslation HoC.
 */
const HomepageAnon = ({ t }) => (
	<StyledDiv {...layout}>
		<StyledDiv>
			<Canon {...hero} tag="h1">{t('home.pages.anon.hero')}</Canon>
			<BodyCopy {...subtitle}>{t('home.pages.anon.subtitle')}</BodyCopy>
			<PrimaryButton>
				<Link to={routes.subjects.subjectCreation}>{t('home.pages.anon.links.discover')}</Link>
			</PrimaryButton>
		</StyledDiv>
		<StyledSvg src={`${conf.svgIllustrationsPath}/homepage_anon.svg`} {...illustrationSvg} />
	</StyledDiv>
);

HomepageAnon.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(HomepageAnon);
