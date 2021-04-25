import {
	peppercorn,
	tuna,
} from './colors';
import { brevier } from './textStyles';

const labelStyle = {
	...brevier,
	color: peppercorn.default,
	cursor: 'pointer',
};

const groupedLabelStyle = {
	...brevier,
	color: tuna.default,
};

const groupStyle = {
	borderRadius: 2,
	border: `solid 1px ${tuna.default}`,
};

const checkboxStyle = {
	border: `solid 1px ${peppercorn.default}`,
	borderRadius: 2,
	height: '16px',
	width: '16px',
	bg: peppercorn.default,
	cursor: 'pointer',
};

export {
	labelStyle,
	groupedLabelStyle,
	checkboxStyle,
	groupStyle,
};
