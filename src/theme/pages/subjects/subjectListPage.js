import { tuna } from 'theme/colors';

const layout = {
	display: 'grid',
	gridGap: '3em',
	width: '75%',
	margin: 'auto',
	gridTemplateColumns: '100%',
	justifyContent: 'center',
};
const hero = {
	lineHeight: 'initial',
	margin: 0,
};

const searchInput = {
	height: '32px',
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
	display: 'flex',
	flexWrap: 'wrap',
	listStyle: 'none',
	padding: 0,
	gridGap: '3em 3.5em',
	marginTop: '1em',
};

const subjectCard = {
	display: 'inline-grid',
	width: '300px',
	cursor: 'pointer',
	gridTemplateRows: 'auto auto 1fr',
	gridGap: '.5em',
};

const subjectCardTitle = {
	cursor: 'pointer',
	fontWeight: 600,
	margin: 0,
	alignSelf: 'flex-end',
};

const subjectCardAuthor = {
	cursor: 'pointer',
	fontWeight: 500,
	color: tuna.default,
	margin: 0,
	paddingBottom: '.5em',
	borderBottom: 'solid 1px #C4C4C4',
	borderOpacity: '.4',
	alignSelf: 'flex-end',
};

const subjectCardBodyText = {
	cursor: 'pointer',
	margin: 0,
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	color: tuna.default,
};

export {
	layout,
	hero,
	searchInput,
	sectionTitleContainer,
	sectionTitle,
	sectionTitleSeparator,
	sectionList,
	subjectCard,
	subjectCardTitle,
	subjectCardAuthor,
	subjectCardBodyText,
};
