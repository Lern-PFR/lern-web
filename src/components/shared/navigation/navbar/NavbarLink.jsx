import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { color } from 'styled-system';

import { StyledListItem } from 'components/shared/styledElements';
import { navbarActiveLink, navbarLink } from 'theme/navbar';

const StyledNavbarLinkContainer = styled(StyledListItem)(
	{
		...navbarLink,
		'& > * > *::first-letter': {
			textTransform: 'uppercase',
		},
		'& > * > *:not(::first-letter)': {
			textTransform: 'lowercase',
		},
	}
);

const StyledNavLink = styled(NavLink)(
	{
		cursor: 'inherit',
		color: 'inherit',
		fontFamily: 'inherit',
		fontSize: 'inherit',
		fontWeight: 'inherit',
		textDecoration: 'inherit',
	},
	color,
);

/**
 * @name NavbarLink
 * @description The link to display inside the Navbar component.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	children	The text to display.
 * @param {string}	targetUrl	The url to redirect to on click.
 */
const NavbarLink = ({ children, targetUrl }) => (
	<StyledNavbarLinkContainer {...navbarLink}>
		<StyledNavLink to={targetUrl} activeStyle={navbarActiveLink}>{children}</StyledNavLink>
	</StyledNavbarLinkContainer>
);

NavbarLink.propTypes = {
	children: PropTypes.string.isRequired,
	targetUrl: PropTypes.string.isRequired,
};

export default NavbarLink;
