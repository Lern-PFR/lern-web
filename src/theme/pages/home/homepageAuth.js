import { basmati, peppercorn } from 'theme/colors';

const layout = {
	display: 'grid',
	gridTemplateColumns: '1fr 20%',
	gridGap: '32px',
	height: '100%',
	paddingTop: '40px',
	paddingBottom: '64px',
};

const hero = {
	lineHeight: 'initial',
};

const subtitle = {
	lineHeight: 'initial',
};

const illustrationSvg = {
	display: window.innerWidth >= 1000 ? 'inline-block' : 'none', // makeshift media query.
};

const sidebar = {
	position: 'sticky',
	top: '24px',
	height: '90vh',
	display: 'grid',
	padding: '24px 64px',
	borderLeft: `solid 1px ${basmati.default}`,
	gridTemplateRows: 'auto auto auto 1fr',
};

const timelineTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

const mainContainer = {
	display: 'grid',
	gridTemplateRows: 'auto 1fr',
	gridGap: '5em',
};

const latestContainer = {
	display: 'grid',
	gridTemplateRows: 'auto 1fr',
	gridGap: '1em',
	overflow: 'hidden',
};

const latestList = {
	display: 'flex',
	flexWrap: 'wrap',
	listStyle: 'none',
	padding: 0,
	gridGap: '2em 2.5em',
	marginTop: '1em',
	maxHeight: '30vh',
	overflowY: 'scroll',
	paddingRight: '20px',
	boxSizing: 'content-box',
	width: '100%',
};

const lernButton = {
	marginLeft: '5px',
};

const continueButton = {
	marginTop: '7px',
};

const progressionList = {
	display: 'flex',
	flexDirection: 'column',
	listStyle: 'none',
	padding: 0,
	gridGap: '2em 2.5em',
	marginTop: '1em',
};

const progressionListItem = {
	borderLeft: `1px solid ${peppercorn.default}`,
	cursor: 'pointer',
};

export {
	layout,
	hero,
	subtitle,
	illustrationSvg,
	sidebar,
	timelineTitle,
	mainContainer,
	latestContainer,
	latestList,
	lernButton,
	continueButton,
	progressionList,
	progressionListItem,
};
