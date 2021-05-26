import { cloneElement } from 'react';
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
import { disabled as disabledStyle } from 'theme/buttonStyles';

const StyledDynamicLinkButtonComponent = styled('button')(
	{
		cursor: 'pointer',
		padding: '0',
		textDecoration: (({ txtDecoration }) => txtDecoration || 'initial'),
		'&:hover': {
			color: ((props) => props.color.darker1),
			background: ((props) => props.bg.darker1),
		},

		'& *': {
			cursor: 'pointer',
		},
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
 * @name DynamicLinkButtonComponent
 * @description A dynamic component used to display styled link button element.
 *
 * @author Timothée Simon-Franza
 *
 * @param {Link}	children		: Link component to display inside the button.
 * @param {bool}	[disabled]		: Whather the button is disabled.
 * @param {object}	[linkStyle]		: Optional link style object.
 * @param {string}	targetUrl		: The url to redirect to.
 */
const DynamicLinkButtonComponent = ({ children, disabled, linkStyle, ...otherProps }) => {
	const { padding: paddingStyle, ...props } = otherProps;
	const { lineHeight, ...linkStyleProps } = linkStyle;

	return (
		<StyledDynamicLinkButtonComponent {...props} {...(disabled ? disabledStyle : {})}>
			{cloneElement(children, { disabled, padding: paddingStyle, ...linkStyleProps })}
		</StyledDynamicLinkButtonComponent>
	);
};

DynamicLinkButtonComponent.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
	disabled: PropTypes.bool,
	linkStyle: PropTypes.object,
};

DynamicLinkButtonComponent.defaultProps = {
	disabled: false,
	linkStyle: {},
};

export default DynamicLinkButtonComponent;
