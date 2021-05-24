import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import conf from 'conf';
import { navbarLogo } from 'theme/navbar';

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
	<StyledSvg src={`${conf.svgPath}/logo_black_mini.svg`} />
);

export default NavbarLogo;
