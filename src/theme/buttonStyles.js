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

const subtleLink = {
	...brevier,
	color: tuna,
	display: 'inline-block',
};

const outlined = {
	...commonButtonStyle,
	bg: coconut,
	border: `solid 1px ${oyster.default}`,
	color: oyster,
	hoverBg: parsnip.lighter2,
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
	iconSize: brevier.lineHeight,
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

const backToParentButtonContentLayout = {
	display: 'flex',
	alignItems: 'center',
	gridGap: '.5em',
	height: 'auto',
};

export {
	primary,
	outlined,
	standard,
	link,
	subtle,
	dropdown,
	disabled,
	danger,
	iconButton,
	floatingActionButton,

	primaryLink,
	subtleLink,

	backToParentButtonContentLayout,
};
