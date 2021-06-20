import { basmati, peppercorn, coconut } from 'theme/colors';

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
	paddingRight: 0,
	borderLeft: `solid 1px ${basmati.default}`,
	gridTemplateRows: 'auto auto auto 1fr',
};

const timelineTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

const timelineHeader = {
	marginLeft: '1em',
	cursor: 'pointer',
	width: '266px',
};

const timelineDate = {
	lineHeight: 'initial',
	margin: 0,
	cursor: 'pointer',
};

const timelineSubject = {
	lineHeight: 'initial',
	margin: 0,
	cursor: 'pointer',
};

const timelineModule = {
	lineHeight: 'initial',
	margin: 0,
	marginLeft: '2em',
	cursor: 'pointer',
	width: '250px',
};

const timelineConcept = {
	lineHeight: 'initial',
	margin: 0,
	marginLeft: '3em',
	cursor: 'pointer',
	width: '234px',
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
	cursor: 'pointer',
	borderLeft: `1px solid ${peppercorn.default}`,
	paddingLeft: '1.5em',
};

const progressionListItemContent = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	cursor: 'pointer',
};

const progressionPill = {
	border: `1px solid ${peppercorn.default}`,
	borderRadius: '50%',
	height: '13px',
	width: '13px',
	bg: coconut.default,
	marginLeft: '-31px',
	cursor: 'pointer',
};

const progressionPillFilled = {
	bg: peppercorn.default,
	cursor: 'pointer',
};

export {
	layout,
	hero,
	subtitle,
	illustrationSvg,
	sidebar,
	timelineTitle,
	timelineHeader,
	timelineDate,
	timelineSubject,
	timelineModule,
	timelineConcept,
	mainContainer,
	latestContainer,
	latestList,
	lernButton,
	continueButton,
	progressionList,
	progressionListItem,
	progressionListItemContent,
	progressionPill,
	progressionPillFilled,
};
