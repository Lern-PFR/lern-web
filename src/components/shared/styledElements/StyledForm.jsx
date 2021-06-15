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
} from 'styled-system';

/**
 * @name StyledForm
 * @description A reusable form component that can be styled using styled-components and styled-system.
 *
 * @author Timothée Simon-Franza
 */
const StyledForm = styled('form')(
	{
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
);

export default StyledForm;
