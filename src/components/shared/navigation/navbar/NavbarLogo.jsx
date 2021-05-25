import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import routes from 'routes/keys';
import conf from 'conf';
import { navbarLogo } from 'theme/navbar';
import Link from '../Link';

const StyledSvg = styled(ReactSVG)(
	{
		'& svg': {
			...navbarLogo,
		},
	}
);

/**
 * @name NavbarLogo
 * @description The svg file to display in the main navbar component.
 *
 * @author Timothée Simon-Franza
 */
const NavbarLogo = () => (
	<Link to={routes.home.default}>
		<StyledSvg src={`${conf.svgPath}/logo_black_mini.svg`} />
	</Link>
);

export default NavbarLogo;
