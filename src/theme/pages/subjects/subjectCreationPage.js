import { coconut, lightgrey, oyster, peppercorn, tuna } from 'theme/colors';
import { mainLayoutTopPadding } from 'theme/constants';
import { doublePica } from 'theme/textStyles';

const layout = {
	display: 'grid',
	gridTemplateColumns: '25% 1fr',
	gridGap: '2em',
	paddingRight: mainLayoutTopPadding,
	height: '100%',
};

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

const contentSection = {
	paddingTop: mainLayoutTopPadding,
};

const title = {
	lineHeight: 'auto',
	margin: 0,
	paddingBottom: '24px',
};

const form = {
	display: 'grid',
	gridGap: '1em',
	height: 'max-content',
};

const formSubmit = {
	justifySelf: 'start',
};

export {
	layout,
	sidebar,
	sidebarElement,
	sidebarCurrentElement,
	contentSection,
	title,
	form,
	formSubmit,
};
