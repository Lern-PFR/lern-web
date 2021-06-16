import { basmati, tuna } from 'theme/colors';

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
	borderTop: `solid 1px ${basmati.default}`,
	paddingTop: '2em',
	paddingBottom: '3em',
};

const startConceptButton = {
	marginTop: '1em',
};

const conceptName = {
	lineHeight: 'initial',
	textTransform: 'capitalize',
	margin: 0,
};

const conceptDescription = {
	lineHeight: 'initial',
	margin: 0,
};

const lessonList = {
	display: 'grid',
	gridAutoFlow: 'row',
	gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
	gridGap: '1em',
	padding: 0,
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
};

const lessonTitle = {
	margin: 0,
	textTransform: 'capitalize',
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
