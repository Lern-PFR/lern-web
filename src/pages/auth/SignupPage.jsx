import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { Canon, DoublePica } from 'components/shared/typography';
import { SignUpForm } from 'components/auth/signup';
import { signUp } from 'redux/actions/users';
import { hero, illustrationSvg, layout, subtitle } from 'theme/pages/auth/signUpPage';
import conf from 'conf';
import routes from 'routes';

/**
 * @name SignUpPage
 * @description A page accessible to unauthenticated users to create an account.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} t	The translation method provided by the withTranslation HoC.
 */
const SignUpPage = ({ t }) => {
	const dispatch = useDispatch();

	const onSubmit = useCallback((formData) => {
		// Removes the 'password-confirmation' field value from the object sent to the onSubmit method.
		const { 'password-confirmation': passwordConf, ...userCreationData } = formData;

		dispatch(signUp(userCreationData, routes.auth.postSignup));
	}, [dispatch]);

	return (
		<StyledDiv {...layout}>
			<StyledDiv>
				<Canon {...hero} tag="h1">{t('authentication.pages.signup.hero')}</Canon>
				<DoublePica {...subtitle}>{t('authentication.pages.signup.subtitle')}</DoublePica>
				<SignUpForm onSubmit={onSubmit} />
			</StyledDiv>
			<StyledSvg src={`${conf.svgIllustrationsPath}/sign_up.svg`} {...illustrationSvg} />
		</StyledDiv>
	);
};

SignUpPage.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(SignUpPage);
