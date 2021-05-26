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
import { Brevier } from 'components/shared/typography';

const StyledDynamicButtonComponent = styled('button')(
	{
		cursor: 'pointer',
		textDecoration: (({ txtDecoration }) => txtDecoration || 'initial'),
		'&:hover': {
			color: ((props) => (props.hover?.color || props.color.darker1)),
			background: ((props) => (props.hover?.bg || props.bg.darker1)),
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
 * @name DynamicButtonComponent
 * @description A dynamic component used to display styled button element.
 *
 * @param {*}		children		Text or component to display inside the button.
 * @param {bool}	[disabled]		Whather the button is disabled.
 * @param {bool}	[isIconOnly]	Whether the button only contains an icon.
 * @param {func}	[onClick]		Function to trigger on user click.
 */
const DynamicButtonComponent = ({ children, disabled, isIconOnly, onClick, ...otherProps }) => (
	<StyledDynamicButtonComponent onClick={onClick} {...otherProps} {...(disabled ? disabledStyle : {})}>
		{isIconOnly && cloneElement(children, { ...(disabled ? disabledStyle : {}) })}
		{!isIconOnly && (
			<Brevier tag="span" lineHeight="initial" fontWeight={600}>
				{children}
			</Brevier>
		)}
	</StyledDynamicButtonComponent>
);

DynamicButtonComponent.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
	disabled: PropTypes.bool,
	isIconOnly: PropTypes.bool,
	onClick: PropTypes.func,
};

DynamicButtonComponent.defaultProps = {
	disabled: false,
	isIconOnly: false,
	onClick: () => {},
};

export default DynamicButtonComponent;
