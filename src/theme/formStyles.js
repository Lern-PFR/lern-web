import {
	peppercorn,
	tuna,
	coconut,
	jasmine,
	kale,
	crimson,
} from './colors';
import { brevier } from './textStyles';

const labelStyle = {
	color: (({ disabled }) => (disabled ? tuna.darker1 : peppercorn.default)),
	cursor: 'pointer',
	paddingBottom: '4px',
};

const groupedLabelStyle = {
	...brevier,
	color: tuna.default,
};

const groupStyle = {
	borderRadius: 2,
	border: `solid 1px ${tuna.default}`,
	marginTop: '20px',
};

const checkboxStyle = {
	border: `solid 1px ${peppercorn.default}`,
	borderRadius: 2,
	height: '16px',
	width: '16px',
	bg: peppercorn.default,
	cursor: 'pointer',
	appearance: 'none',
	MozAppearance: 'none',
	WebkitAppearance: 'none',
	position: 'relative',
	borderColor: (({ disabled }) => (disabled ? tuna.default : peppercorn.default)),
	backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : coconut.default)),

	'&:focus': {
		outline: 'none',
	},

	'&::before': {
		position: 'absolute',
		top: 0,
		left: 0,
		content: '""',
		fontSize: '12px',
		fontWeight: 700,
		color: 'transparent',
		display: 'inline-block',
		width: '100%',
		height: '100%',
		textAlign: 'center',
		borderColor: (({ disabled }) => (disabled ? tuna.default : peppercorn.default)),
	},
	'&:checked:before': {
		content: '"\\2713"',
		color: coconut.default,
		backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : peppercorn.default)),
		borderColor: (({ disabled }) => (disabled ? tuna.default : peppercorn.default)),
	},
};
const radioButtonStyle = {
	border: `solid 1px ${peppercorn.default}`,
	borderRadius: '50%',
	height: '16px',
	width: '16px',
	cursor: 'pointer',
	appearance: 'none',
	MozAppearance: 'none',
	WebkitAppearance: 'none',
	position: 'relative',
	borderColor: (({ disabled }) => (disabled ? tuna.default : peppercorn.default)),
	backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : coconut.default)),
	'&::before': {
		position: 'absolute',
		top: 0,
		left: 0,
		content: '""',
		fontSize: '12px',
		fontWeight: 700,
		color: 'transparent',
		display: 'inline-block',
		width: '100%',
		height: '100%',
		textAlign: 'center',
		borderColor: (({ disabled }) => (disabled ? tuna.default : peppercorn.default)),
	},
	'&:hover': {
		backgroundColor: jasmine.darker1,
		'&::before': {
			content: '""',
			borderRadius: '50%',
			height: '8px',
			width: '8px',
			margin: '3px',
			backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : coconut.default)),
		},
	},
	'&:checked': {
		backgroundColor: coconut.default,
		'&::before': {
			content: '""',
			backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : peppercorn.default)),
			borderColor: (({ disabled }) => (disabled ? tuna.default : peppercorn.default)),
			borderRadius: '50%',
			width: '8px',
			height: '8px',
			margin: '3px',
		},
	},
};
const inputStyle = {
	borderRadius: 6,
	border: `solid 1px ${tuna.default}`,
	backgroundColor: coconut.default,
	padding: '5px 10px',

	'&:focus': {
		outline: 'none',
	},

	'&:focus-visible': {
		border: `solid 2px ${kale.default}`,

		'&::placeholder': {
			color: `${kale.default}`,
		},

		'& + label': {
			color: `${kale.default}`,
		},

		'& + label + div': {
			color: `${kale.default}`,
		},
	},
};

const errorInputStyle = {
	border: `solid 1px ${crimson.default}`,
};

const selectStyle = {
	...inputStyle,
};
const textareaStyle = {
	...inputStyle,
};

const hintStyle = {
	...brevier,
	color: (({ disabled }) => (disabled ? tuna.darker1 : peppercorn.default)),
	paddingTop: '4px',
};

const validationStyle = {
	...brevier,
	color: crimson.default,
};

export {
	labelStyle,
	groupedLabelStyle,
	checkboxStyle,
	groupStyle,
	radioButtonStyle,
	inputStyle,
	errorInputStyle,
	selectStyle,
	textareaStyle,
	hintStyle,
	validationStyle,
};
