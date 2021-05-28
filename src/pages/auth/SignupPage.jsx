import SignUpForm from 'components/auth/signup/SignUpForm';
import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { Canon, DoublePica } from 'components/shared/typography';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signUp } from 'redux/actions/users';
import { hero, illustrationSvg, layout, subtitle } from 'theme/pages/auth/signUpPage';
import conf from 'conf';

/**
 * @name SignUpPage
 * @description A page accessible to unauthenticated users to create an account.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} 	dispatchSignUp	Dispatched action creator used to send the user creation request to the API.
 * @param {func}	t				The translation method provided by the withTranslation HoC.
 */
const SignUpPage = ({ dispatchSignUp, t }) => {
	const onSubmit = useCallback((formData) => {
		console.log(formData);

		if (false) {
			dispatchSignUp(formData);
		}
	}, [dispatchSignUp]);

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
	dispatchSignUp: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
	const { users: { currentUser } } = state;

	return {
		currentUser,
	};
};

const mapDispatchToProps = {
	dispatchSignUp: signUp,
};

export default compose(
	withTranslation(),
	connect(mapStateToProps, mapDispatchToProps)
)(SignUpPage);
