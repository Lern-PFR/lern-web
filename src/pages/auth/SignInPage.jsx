import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { SignInForm } from 'components/auth/signin';
import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { BodyCopy, Canon } from 'components/shared/typography';
import { login } from 'redux/actions/users';
import { hero, illustrationSvg, layout, subtitle } from 'theme/pages/auth/signInPage';
import conf from 'conf';
import routes from 'routes';

/**
 * @name SignInPage
 * @description A page accessible to unauthenticated users to sign into the application.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} t	The translation method provided by the withTranslation HoC.
 */
const SignInPage = ({ t }) => {
	const dispatch = useDispatch();

	const onSubmit = useCallback((formData) => {
		const credentials = {
			username: formData?.username,
			password: formData?.password,
		};

		dispatch(login(credentials, routes.home.default));
	}, [dispatch]);

	return (
		<StyledDiv {...layout}>
			<StyledDiv>
				<Canon {...hero} tag="h1">{t('authentication.pages.signin.hero')}</Canon>
				<BodyCopy {...subtitle}>{t('authentication.pages.signin.subtitle')}</BodyCopy>
				<SignInForm onSubmit={onSubmit} />
			</StyledDiv>
			<StyledSvg src={`${conf.svgIllustrationsPath}/sign_in.svg`} {...illustrationSvg} />
		</StyledDiv>
	);
};

SignInPage.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(SignInPage);
