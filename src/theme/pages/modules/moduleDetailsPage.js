import { basmati, parsnip, tuna } from 'theme/colors';

const pageLayout = {
	display: 'grid',
	gridTemplateRows: '1fr auto',
	paddingX: '64px',
	gridGap: '2em',
	maxHeight: '100%',
	overflow: 'auto',
};

const moduleName = {
	lineHeight: 'initial',
	margin: 0,
};

const moduleDescription = {
	lineHeight: 'initial',
	margin: 0,
};

const conceptList = {
	listStyle: 'none',
	display: 'flex',
	flexDirection: 'column',
	padding: 0,
};

const conceptDataContainer = {
	display: 'grid',
	gridGap: '1em',
	borderTop: `solid 1px ${basmati.default}`,
	paddingTop: '2em',
};

const startConceptButton = {
	justifySelf: 'start',
	hoverBg: parsnip.lighter2,
};

const conceptName = {
	lineHeight: 'initial',
	margin: 0,
};

const conceptDescription = {
	lineHeight: 'initial',
	margin: 0,
};

const lessonList = {
	display: 'flex',
	flexWrap: 'wrap',
	listStyle: 'none',
	padding: 0,
	gridGap: '1em 1.5em',
	marginTop: '2em',
};

const lessonListItem = {
	border: 'solid 1px black',
	borderRadius: '8px',
	padding: '2em',
	position: 'relative',
	display: 'grid',
	gridTemplateRows: 'fit-content 1fr',
	gridGap: '1em',
	width: '400px',
};

const lessonTitle = {
	margin: 0,
};

const lessonDescription = {
	margin: 0,
	display: 'inline-block',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	maxHeight: '90px',
	lineHeight: 'initial',
	whiteSpace: 'nowrap',
};

const backToSubjectSvg = {
	height: '.7em',
	stroke: tuna.default,
};

export {
	pageLayout,
	moduleName,
	moduleDescription,
	conceptList,
	conceptDataContainer,
	conceptName,
	conceptDescription,
	lessonList,
	lessonListItem,
	lessonTitle,
	lessonDescription,
	startConceptButton,
	backToSubjectSvg,
};
