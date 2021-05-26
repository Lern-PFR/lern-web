import styled from 'styled-components';
import {
	border,
	color,
	flexbox,
	grid,
	layout,
	margin,
	padding,
	position,
	shadow,
	typography,
} from 'styled-system';

/**
 * @name StyledListItem
 * @description A reusable li component that can be styled using styled-components and styled-system.
 *
 * @author Timothée Simon-Franza
 */
const StyledListItem = styled('li')(
	{
		cursor: (({ cursor }) => (cursor || 'initial')),
		visibility: (({ visibility }) => (visibility || 'initial')),
		boxSizing: (({ boxSizing }) => (boxSizing || 'border-box')),
		zIndex: (({ zIndex }) => (zIndex || 'initial')),
	},
	border,
	color,
	flexbox,
	grid,
	layout,
	margin,
	padding,
	position,
	shadow,
	typography,
);

export default StyledListItem;
