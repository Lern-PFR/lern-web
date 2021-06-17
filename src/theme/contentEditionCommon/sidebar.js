import { coconut, lightgrey, oyster, peppercorn, tuna } from 'theme/colors';
import { doublePica } from 'theme/textStyles';
import { mainLayoutTopPadding } from 'theme/constants';

const sidebar = {
	backgroundColor: lightgrey,
	boxShadow: `0 2px 4px ${peppercorn.default}29`,
	margin: 0,
	padding: 0,
	paddingTop: mainLayoutTopPadding,
	listStyle: 'none',
};

const sidebarElement = {
	...doublePica,
	fontSize: 'initial',
	color: tuna.default,
	padding: '.3em 1em',
	cursor: 'pointer',
	lineHeight: 'auto',
	transition: 'color .1s ease-in-out',

	'&:hover': {
		color: peppercorn.default,
	},
};

const sidebarCurrentElement = {
	color: coconut.default,
	backgroundColor: oyster.default,
	padding: 0,

	'&:hover': {
		color: coconut.default,
	},
};

export {
	sidebar,
	sidebarElement,
	sidebarCurrentElement,
};
