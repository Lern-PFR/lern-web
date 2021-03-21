import PropTypes from 'prop-types';
import {
	primary,
	standard,
	subtle,
	dropdown,
	danger,
	iconButton,
	floatingActionButton,
} from 'theme/buttonStyles';
import DynamicButtonComponent from './DynamicButtonComponent';

// @TODO: write link and subtleLink buttons once navigation has been set up.

/**
 * @name PrimaryButton
 * @description Button component to use as Call to action. Should only be used once per page (header not included).
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const PrimaryButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent {...primary} {...otherProps}>
		{children}
	</DynamicButtonComponent>
);

/**
 * @name StandardButton
 * @description Standard button component to be used for most use-cases.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const StandardButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent {...standard} {...otherProps}>
		{children}
	</DynamicButtonComponent>
);

/**
 * @name SubtleButton
 * @description Button component to be used along a primary button for less crucial actions such as "cancel".
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const SubtleButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent {...subtle} {...otherProps}>
		{children}
	</DynamicButtonComponent>
);

/**
 * @name DropdownButton
 * @description Button component to be used for dropdown menu trigger.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const DropdownButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent {...dropdown} {...otherProps}>
		{children}
	</DynamicButtonComponent>
);

/**
 * @name DangerButton
 * @description Button component to use for final confirmation to a destructive action such as deleting data.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const DangerButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent {...danger} {...otherProps}>
		{children}
	</DynamicButtonComponent>
);

/**
 * @name IconButton
 * @description Button component intended to display only the icon it contains, but behave as a regular button.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const IconButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent {...iconButton} {...otherProps} isIconOnly>
		{children}
	</DynamicButtonComponent>
);

const FloatingActionButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent {...floatingActionButton} {...otherProps}>
		{children}
	</DynamicButtonComponent>
);

PrimaryButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

StandardButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

SubtleButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

DropdownButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

DangerButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

IconButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

FloatingActionButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

export {
	FloatingActionButton,
	PrimaryButton,
	StandardButton,
	SubtleButton,
	DropdownButton,
	DangerButton,
	IconButton,
};