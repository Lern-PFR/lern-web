import PropTypes from 'prop-types';
import {
	primary,
	standard,
	subtle,
	dropdown,
	danger,
	iconButton,
	floatingActionButton,
	primaryLink,
	outlined,
	subtleLink,
} from 'theme/buttonStyles';
import DynamicButtonComponent from './DynamicButtonComponent';
import DynamicLinkButtonComponent from './DynamicLinkButtonComponent';

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
 * @name PrimaryLinkButton
 * @description Link button component to use as Call to action. Should only be used once per page (header not included).
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const PrimaryLinkButton = ({ children, ...otherProps }) => (
	<DynamicLinkButtonComponent linkStyle={primaryLink} {...primary} {...otherProps}>
		{children}
	</DynamicLinkButtonComponent>
);

/**
 * @name OutlinedButton
 * @description Button component to use as primary action when a CTA is already defined.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const OutlinedButton = ({ children, ...otherProps }) => (
	<DynamicButtonComponent linkStyle={primaryLink} {...outlined} {...otherProps}>
		{children}
	</DynamicButtonComponent>
);

/**
 * @name OutlinedLinkButton
 * @description Link button component to use as primary when a CTA is already defined.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children The children to display inside this button.
 */
const OutlinedLinkButton = ({ children, ...otherProps }) => (
	<DynamicLinkButtonComponent linkStyle={primaryLink} {...outlined} {...otherProps}>
		{children}
	</DynamicLinkButtonComponent>
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
 * @name SubtleLinkButton
 * @description Link button component to be used along a primary button for less used redirections.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
const SubtleLinkButton = ({ children, ...otherProps }) => (
	<DynamicLinkButtonComponent linkStyle={subtleLink} {...subtle} {...otherProps}>
		{children}
	</DynamicLinkButtonComponent>
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

/**
 * @name FloatingActionButton
 * @description Button component intended to display a floating action button.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The children to display inside this button.
 */
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

PrimaryLinkButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

OutlinedButton.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

OutlinedLinkButton.propTypes = {
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

SubtleLinkButton.propTypes = {
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
	OutlinedButton,
	OutlinedLinkButton,
	PrimaryButton,
	PrimaryLinkButton,
	StandardButton,
	SubtleButton,
	SubtleLinkButton,
	DropdownButton,
	DangerButton,
	IconButton,
};
