import styled from 'styled-components';
import {
	color,
	flexbox,
	grid,
	layout,
	margin,
	padding,
	position,
	shadow,
} from 'styled-system';

/**
 * @name StyledList
 * @description A reusable ul component that can be styled using styled-components and styled-system.
 *
 * @author Timothée Simon-Franza
 */
const StyledList = styled('ul')(
	{
		visibility: (({ visibility }) => (visibility || 'initial')),
		boxSizing: (({ boxSizing }) => (boxSizing || 'border-box')),
		zIndex: (({ zIndex }) => (zIndex || 'initial')),
		listStyle: (({ listStyle }) => (listStyle || 'initial')),
	},
	color,
	flexbox,
	grid,
	layout,
	margin,
	padding,
	position,
	shadow,
);

export default StyledList;
