import { peppercorn, tuna, basmati } from 'theme/colors';

const pageLayout = {
	display: 'grid',
	gridTemplateColumns: 'minmax(35%, 1fr) minmax(calc(65% - 124px), 2fr)',
	gridGap: '124px',
	marginBottom: '3em',
	minHeight: '28em',
};

const titleDiv = {
	minHeight: '8em',
};

const completedDiv = {
	minHeight: '36em',
	marginBottom: '3em',
};

const completedButton = {
	border: `solid 1px ${peppercorn.default}`,
	margin: '2em',
};

const subjectName = {
	lineHeight: 'initial',
	margin: 0,
};

const list = {
	listStyle: 'none',
	marginTop: '1em',
};

const listItem = {
	color: tuna.lighter2,
	borderLeft: `solid 4px ${tuna.lighter2}`,
	paddingLeft: '1em',
	paddingBottom: '1em',
	position: 'relative',
};

const lastListItem = {
	paddingBottom: 0,
};

const subjectListItem = {
	border: 'none',
};

const listItemText = {
	margin: 0,
};

const activeListItem = {
	borderLeft: `solid 4px ${peppercorn.default}`,
};

const activeListItemText = {
	fontWeight: 600,
};

const backToListButton = {
	display: 'flex',
	alignItems: 'center',
	padding: '0',
};

const backToListSvg = {
	height: '.7em',
	stroke: tuna.default,
};

const stepper = {
	backgroundColor: basmati.default,
	height: '12px',
	width: '12px',
	border: 0,
	borderRadius: '50%',
	marginLeft: '2px',
	marginRight: '2px',
	transition: 'transform .05s ease-out, flex .05s ease-out',
	cursor: 'pointer',

	'&:hover': {
		transform: 'scale(1.3)',
		backgroundColor: peppercorn.default,
	},
};

const stepperCurrent = {
	backgroundColor: peppercorn.default,
};

export {
	backToListButton,
	pageLayout,
	titleDiv,
	completedDiv,
	completedButton,
	subjectName,
	backToListSvg,
	list,
	listItem,
	lastListItem,
	subjectListItem,
	listItemText,
	activeListItem,
	activeListItemText,
	stepper,
	stepperCurrent,
};
