import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

/**
 * @name StyledSvg
 * @description A component used to styled svg elements imported from the assets folder.
 *
 * @author Timothée Simon-Franza
 */
const StyledSvg = styled(ReactSVG)(
	{
		...((props) => props),

		'& svg, & svg *': {
			height: (({ height }) => (height || 'auto')),
			stroke: (({ stroke }) => (stroke || 'inherit')),
		},
	},
);

export default StyledSvg;
