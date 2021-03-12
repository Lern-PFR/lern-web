import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	border,
	color,
	display,
	layout,
	space,
	typography,
} from 'styled-system';

const StyledDynamicTextComponent = styled('p')(
	{
		textDecoration: (({ textDecoration }) => textDecoration || 'initial'),
		textTransform: (({ textTransform }) => textTransform || 'initial'),
		visibility: (({ visibility }) => (visibility || 'initial')),
		zIndex: (({ zIndex }) => (zIndex || 'initial')),
	},
	border,
	color,
	display,
	layout,
	space,
	typography,
);

/**
 * @name DynamicTextComponent
 * @description A dynamic component used to display styled typography element.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*}		children	: The content to be displayed inside the element.
 * @param {string}	[tag]		: The HTML tag we want the element to be displayed as. 
 */
const DynamicTextComponent = ({ children, tag, ...otherProps }) => (
	<StyledDynamicTextComponent as={tag} {...otherProps}>
		{children}
	</StyledDynamicTextComponent>
);

DynamicTextComponent.propTypes = {
	children: PropTypes.node.isRequired,
	tag: PropTypes.string,
};

DynamicTextComponent.defaultProps = {
	tag: 'p',
};

export default DynamicTextComponent;
