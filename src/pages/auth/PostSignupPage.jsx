import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { BodyCopy, Canon } from 'components/shared/typography';
import conf from 'conf';
import { hero, layout, subtitle } from 'theme/pages/auth/postSignupPage';
import { illustrationSvg } from 'theme/pages/auth/signUpPage';

/**
 * @name PostSignupPage
 * @description The page towards which the user is redirected after completing the signup process.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} t	The translation method provided by the withTranslation HoC.
 */
const PostSignupPage = ({ t }) => (
	<StyledDiv {...layout}>
		<StyledDiv>
			<Canon as="h1" {...hero}>{t('authentication.pages.post_signup.hero')}</Canon>
			<BodyCopy {...subtitle}>{t('authentication.pages.post_signup.subtitle')}</BodyCopy>
		</StyledDiv>
		<StyledSvg src={`${conf.svgIllustrationsPath}/mail_box.svg`} {...illustrationSvg} />
	</StyledDiv>
);

PostSignupPage.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(PostSignupPage);
