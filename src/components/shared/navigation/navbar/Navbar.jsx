import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import routes from 'routes/keys';
import { navbar, navbarLinkList, username } from 'theme/navbar';
import { brevier } from 'theme/textStyles';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import { Pica } from 'components/shared/typography';
import { PrimaryLinkButton } from 'components/shared/buttons';
import NavbarLink from './NavbarLink';
import NavbarLogo from './NavbarLogo';
import Link from '../Link';

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
			<NavbarLink targetUrl={routes.home.default}>{t('navigation.menu.home')}</NavbarLink>
			{currentUser && <NavbarLink targetUrl={routes.subjects.default}>{t('navigation.menu.my_courses')}</NavbarLink> }
			<NavbarLink targetUrl={routes.about.default}>{t('navigation.menu.about')}</NavbarLink>
			<NavbarLink targetUrl={routes.contactUs.default}>{t('navigation.menu.contact_us')}</NavbarLink>
		</StyledList>
		{currentUser && (
			<StyledDiv>
				<Pica {...username}>{currentUser.nickname}</Pica>
			</StyledDiv>
		)}
		{!currentUser && (
			<PrimaryLinkButton>
				<Link to={routes.auth.login} {...brevier} fontWeight={600}>{t('navigation.menu.sign_in')}</Link>
			</PrimaryLinkButton>
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
