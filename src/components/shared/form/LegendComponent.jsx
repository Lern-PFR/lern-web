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
import { groupedLabelStyle } from 'theme/formStyles';

const StyledLegendComponent = styled('legend')(
	{
		...groupedLabelStyle,
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
 * @name LegendComponent
 * @description A component used to display styled label element.
 *
 * @author Christopher Walker
 *
 * @param {string}	children		: Test to display as the legend.
 */
const LegendComponent = ({ children, ...otherProps }) => (
	<StyledLegendComponent {...otherProps}>
		{children}
	</StyledLegendComponent>
);

LegendComponent.propTypes = {
	children: PropTypes.string.isRequired,
};

export default LegendComponent;
