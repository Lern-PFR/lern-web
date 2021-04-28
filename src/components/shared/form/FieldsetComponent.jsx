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
import { groupStyle } from 'theme/formStyles';
import PropTypes from 'prop-types';
import LegendComponent from './LegendComponent';

const StyledFieldsetComponent = styled('fieldset')(
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
 * @name FieldsetComponent
 * @description A component used to display styled fieldset element.
 *
 * @author Christopher Walker
 *
 * @param {string}	title		    : The title of the fieldset.
 * @param {*}	    children		: The child elements of the fieldset.
 */
const FieldsetComponent = ({ children, title, ...otherProps }) => (
	<StyledFieldsetComponent {...groupStyle} {...otherProps}>
		<LegendComponent>
			{title}
		</LegendComponent>
		{children}
	</StyledFieldsetComponent>
);

FieldsetComponent.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

export default FieldsetComponent;
