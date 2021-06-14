import {
	peppercorn,
	parsnip,
	tuna,
	coconut,
	jasmine,
	crimson,
	primary,
} from './colors';
import { brevier, longPrimer } from './textStyles';

const labelStyle = {
	color: (({ hasError }) => (hasError ? crimson.default : peppercorn.default)),
	cursor: 'pointer',
	paddingBottom: '4px',
};

const disabledStyle = {
	color: tuna.darker1,
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
	margin: (({ margin }) => (margin || '0')),
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
	'&:not(:disabled):hover': {
		backgroundColor: parsnip.lighter1,
	},
	'&:checked': {
		backgroundColor: coconut.default,
		'&::before': {
			content: '""',
			backgroundColor: (({ disabled }) => (disabled ? jasmine.darker1 : peppercorn.default)),
			borderRadius: '50%',
			width: '8px',
			height: '8px',
			border: `solid 3px ${coconut.default}`,
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
		outline: `solid 1px ${primary.default}`,

		'&::placeholder': {
			color: `${primary.default}`,
		},

		'& + label': {
			color: `${primary.default}`,
		},

		'& + label + div': {
			color: `${primary.default}`,
		},
	},
};

const errorInputStyle = {
	border: `solid 1px ${crimson.default}`,
};

const disabledInputStyle = {
	border: `solid 1px ${tuna.darker1}`,
};

const textareaStyle = {
	...inputStyle,
	resize: 'none',
	height: '100px',
	'::-webkit-scrollbar': {
		width: '2px',
	},
	'::-webkit-scrollbar-track': {
		margin: '2px',
		borderRadius: '2px',
		'-webkit-box-shadow': `inset 0 0 6px ${tuna.lighter1}`,
	},
	'::-webkit-scrollbar-thumb': {
		borderRadius: '2px',
		'-webkit-box-shadow': `inset 0 0 6px ${peppercorn.darker1}`,
	},
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

const selectStyle = {
	placeholder: (provided) => ({
		...provided,
		...longPrimer,
	}),
	option: (provided) => ({
		...provided,
		borderRadius: 6,
	}),
	valueContainer: (provided) => ({
		...provided,
		...longPrimer,
	}),
	menu: (provided) => ({
		...provided,
		...longPrimer,
		borderRadius: '8px',
		marginTop: '4px',
		padding: '16px',
	}),
	control: (provided, state) => ({
		...provided,
		borderRadius: 6,
		borderColor: state.isDisabled ? tuna.lighter2 : provided.primary,
	}),
	multiValueLabel: (provided) => ({
		...provided,
		...longPrimer,
	}),
};

const errorSelectStyle = {
	...selectStyle,
	control: (provided) => ({
		...provided,
		borderRadius: 6,
		borderColor: crimson.default,
		'&:hover': {
			borderColor: crimson.default,
		},
	}),
	option: (provided, state) => ({
		...provided,
		borderRadius: 6,
		backgroundColor: state.isSelected ? primary.default : coconut.default,
		'&:hover': {
			backgroundColor: state.isSelected ? primary.default : jasmine.darker1,
		},
	}),
};

export {
	labelStyle,
	groupedLabelStyle,
	checkboxStyle,
	groupStyle,
	radioButtonStyle,
	inputStyle,
	errorInputStyle,
	textareaStyle,
	hintStyle,
	validationStyle,
	disabledStyle,
	disabledInputStyle,
	selectStyle,
	errorSelectStyle,
};
