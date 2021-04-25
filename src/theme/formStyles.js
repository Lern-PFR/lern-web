import {
	peppercorn,
	tuna,
} from './colors';
import { brevier } from './textStyles';

const labelStyle = {
	...brevier,
	color: peppercorn,
};

const groupedLabelStyle = {
	...brevier,
	color: tuna.default,
};

const checkboxStyle = {
	border: `solid 1px ${peppercorn}`,
	borderRadius: 2,
	height: '1em',
	width: '1em',
};

export {
	labelStyle,
	groupedLabelStyle,
	checkboxStyle,
};
