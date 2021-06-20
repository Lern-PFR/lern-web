import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'react-feather';

import routes from 'routes/keys';
import { logout } from 'redux/actions/users';
import { navbar, navbarLinkList, username } from 'theme/navbar';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import { Pica } from 'components/shared/typography';
import { IconButton, PrimaryLinkButton } from 'components/shared/buttons';
import { getCurrentUser } from 'redux/selectors/users';
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
const Navbar = ({ t }) => {
	const currentUser = useSelector(getCurrentUser);
	const dispatch = useDispatch();

	/**
	 * @function
	 * @name onLogoutBtnClick
	 * @description Method to trigger whenever the user clicks the logout button.
	 *
	 * @author Timothée Simon-Franza
	 */
	const onLogoutBtnClick = useCallback(() => {
		dispatch(logout(routes.auth.login));
	}, [dispatch]);

	// @TODO: update the authenticated user section with a kebab menu to display several options.
	return (
		<StyledDiv as="nav" {...navbar}>
			<NavbarLogo />
			<StyledList {...navbarLinkList}>
				<NavbarLink targetUrl={routes.home.default}>{t('navigation.menu.home')}</NavbarLink>
				{currentUser && <NavbarLink targetUrl={routes.subjects.default}>{t('navigation.menu.my_courses')}</NavbarLink> }
			</StyledList>
			{currentUser && (
				<StyledDiv display="flex" gridGap="1em">
					<Pica {...username}>{currentUser.nickname}</Pica>
					<IconButton data-testid="logout-btn" onClick={onLogoutBtnClick}><LogOut height="1.5em" /></IconButton>
				</StyledDiv>
			)}
			{!currentUser && (
				<PrimaryLinkButton>
					<Link to={routes.auth.login}>{t('navigation.menu.sign_in')}</Link>
				</PrimaryLinkButton>
			)}
		</StyledDiv>
	);
};

Navbar.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(Navbar);
