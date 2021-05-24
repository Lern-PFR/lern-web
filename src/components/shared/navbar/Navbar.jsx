import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { navbar, navbarLinkList } from 'theme/navbar';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import NavbarLink from './NavbarLink';
import NavbarLogo from './NavbarLogo';
// @TODO: Add routing.
/**
 * @name Navbar
 * @description The main navbar component.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} t The translation method provided by the withTranslation HoC.
 */
const Navbar = ({ t }) => (
	<StyledDiv as="nav" {...navbar}>
		<NavbarLogo />
		<StyledList {...navbarLinkList}>
			<NavbarLink targetUrl="">{t('navigation.menu.home')}</NavbarLink>
			<NavbarLink targetUrl="">{t('navigation.menu.my_courses')}</NavbarLink>
			<NavbarLink targetUrl="">{t('navigation.menu.about')}</NavbarLink>
			<NavbarLink targetUrl="">{t('navigation.menu.contact_us')}</NavbarLink>
		</StyledList>
	</StyledDiv>
);

Navbar.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(Navbar);
