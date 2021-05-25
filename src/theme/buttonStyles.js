import { brevier } from './textStyles';
import { coconut, crimson, jasmine, oyster, parsnip, primary as primaryColor, primaryText, tuna } from './colors';

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

const primaryLink = {
	...brevier,
	display: 'inline-block',
	fontWeight: 600,
};

const outlined = {
	...commonButtonStyle,
	bg: coconut,
	border: `solid 1px ${oyster.default}`,
	color: oyster,
	hover: {
		bg: parsnip.lighter2,
	},
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
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '50%',
	width: '40px',
	height: '40px',
	position: 'absolute',
	bg: primaryColor,
	color: coconut,
	border: 0,
	textDecoration: 'none',
};

export {
	primary,
	outlined,
	standard,
	link,
	subtle,
	subtleLink,
	dropdown,
	disabled,
	danger,
	iconButton,
	floatingActionButton,

	primaryLink,
};
