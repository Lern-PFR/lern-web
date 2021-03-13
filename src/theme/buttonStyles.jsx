import { coconut, crimson, jasmine, oyster, primary as primaryColor, primaryText, tuna } from './colors';

const commonButtonStyle = {
	border: 0,
	borderRadius: 4,
	padding: '8px 16px',
	textDecoration: 'none',
};

const primary = {
	...commonButtonStyle,
	bg: primaryColor,
	color: coconut,
};

const standard = {
	...commonButtonStyle,
	bg: jasmine,
	color: oyster,
};

const link = {
	...commonButtonStyle,
	bg: coconut,
	color: primaryText,
};

const subtle = {
	...commonButtonStyle,
	bg: coconut,
	color: tuna,
};

const subtleLink = {
	...commonButtonStyle,
	bg: coconut,
	color: tuna,
};

const dropdown = {
	...commonButtonStyle,
	bg: jasmine,
	color: oyster,
};

const disabled = {
	bg: jasmine.default,
	color: tuna.default,
};

const danger = {
	...commonButtonStyle,
	bg: crimson,
	color: coconut,
};

const iconButton = {
	bg: 'transparent',
	color: tuna,
	border: 'none',
};

const floatingActionButton = {
	borderRadius: '50%',
	position: 'absolute',
	bg: primaryColor,
	color: coconut,
	border: 0,
	textDecoration: 'none',
};

export {
	primary,
	standard,
	link,
	subtle,
	subtleLink,
	dropdown,
	disabled,
	danger,
	iconButton,
	floatingActionButton,
};
