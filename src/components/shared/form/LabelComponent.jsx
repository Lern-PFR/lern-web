import styled from 'styled-components';
import {
	border,
	color,
	display,
	flexbox,
	layout,
	margin,
	padding,
	position,
} from 'styled-system';
import PropTypes from 'prop-types';
import { Brevier } from 'components/shared/typography';

const StyledLabelComponent = styled('label')(
	{
		cursor: 'pointer',
	},
	border,
	color,
	display,
	flexbox,
	layout,
	margin,
	padding,
	position,
);

/**
 * @name LabelComponent
 * @description A component used to display styled label element.
 *
 * @param {bool}	[disabled]		: Whether the checkbox is disabled.
 */
const LabelComponent = ({ children, element, ...otherProps }) => (
	<StyledLabelComponent {...otherProps} htmlFor={element}>
		<Brevier tag="span">
			{children}
		</Brevier>
	</StyledLabelComponent>
);

LabelComponent.propTypes = {
	children: PropTypes.string.isRequired,
	element: PropTypes.string,
};

LabelComponent.defaultProps = {
	element: '',
};

export default LabelComponent;
