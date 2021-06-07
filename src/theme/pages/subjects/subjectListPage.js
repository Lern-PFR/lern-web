import { tuna } from 'theme/colors';

const layout = {
	display: 'grid',
	gridGap: '3em',
	width: 'auto',
	justifyContent: 'center',
};

const sectionTitleContainer = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBbottom: '24px',
};

const sectionTitle = {
	fontWeight: '700',
};

const sectionTitleSeparator = {
	flex: 1,
	height: '1px',
	marginLeft: '16px',
	backgroundColor: '#C4C4C4',
	color: '#C4C4C4',
	opacity: '0.4',
};

const sectionList = {
	display: 'grid',
	listStyle: 'none',
	padding: 0,
	gridTemplateColumns: 'repeat(4, 300px)',
	gridGap: '2em',
	marginTop: '1em',
};

const subjectCard = {
	display: 'grid',
	cursor: 'pointer',
	maxWidth: '300px',
	maxHeight: '300px',
	gridTemplateRows: 'auto 1fr',
	gridGap: '.5em',
};

const subjectCardTitle = {
	cursor: 'pointer',
	fontWeight: 600,
	margin: 0,
};

const subjectCardBodyText = {
	cursor: 'pointer',
	margin: 0,
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	color: tuna.default,
};

export {
	layout,
	sectionTitleContainer,
	sectionTitle,
	sectionTitleSeparator,
	sectionList,
	subjectCard,
	subjectCardTitle,
	subjectCardBodyText,
};
