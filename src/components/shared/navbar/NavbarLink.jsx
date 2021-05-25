import PropTypes from 'prop-types';
import { Link } from 'components/shared/navigation';
import { StyledListItem } from 'components/shared/styledElements';
import { navbarLink } from 'theme/navbar';
import styled from 'styled-components';

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
		<Link to={targetUrl}>{children}</Link>
	</StyledNavbarLinkContainer>
);

NavbarLink.propTypes = {
	children: PropTypes.string.isRequired,
	targetUrl: PropTypes.string.isRequired,
};

export default NavbarLink;
