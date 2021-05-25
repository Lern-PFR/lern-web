import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import routes from 'routes/keys';
import { navbar, navbarLinkList } from 'theme/navbar';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import NavbarLink from './NavbarLink';
import NavbarLogo from './NavbarLogo';
import { PrimaryButton } from '../buttons';
import Link from '../navigation/Link';

// @TODO: Add routing.
/**
 * @name Navbar
 * @description The main navbar component.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object}	[currentUser]	The current authentified user.
 * @param {func}	t				The translation method provided by the withTranslation HoC.
 */
const Navbar = ({ currentUser, t }) => (
	<StyledDiv as="nav" {...navbar}>
		<NavbarLogo />
		<StyledList {...navbarLinkList}>
			<NavbarLink targetUrl="">{t('navigation.menu.home')}</NavbarLink>
			{currentUser && <NavbarLink targetUrl="">{t('navigation.menu.my_courses')}</NavbarLink> }
			<NavbarLink targetUrl="">{t('navigation.menu.about')}</NavbarLink>
			<NavbarLink targetUrl="">{t('navigation.menu.contact_us')}</NavbarLink>
		</StyledList>
		{currentUser && (
			<StyledDiv>
				<p>user</p>
			</StyledDiv>
		)}
		{!currentUser && (
			<PrimaryButton>
				<Link to={routes.auth.login}>{t('navigation.menu.sign_in')}</Link>
			</PrimaryButton>
		)}
	</StyledDiv>
);

Navbar.propTypes = {
	currentUser: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		nickname: PropTypes.string.isRequired,
	}),
	t: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
	currentUser: undefined,
};

export default withTranslation()(Navbar);
