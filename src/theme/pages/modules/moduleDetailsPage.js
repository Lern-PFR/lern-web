import { basmati } from 'theme/colors';

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

const notionList = {
	listStyle: 'none',
	display: 'flex',
	flexDirection: 'column',
	padding: 0,
};

const notionDataContainer = {
	borderTop: `solid 1px ${basmati.default}`,
	paddingTop: '2em',
	paddingBottom: '3em',
};

const notionName = {
	lineHeight: 'initial',
	textTransform: 'capitalize',
	margin: 0,
};

const notionDescription = {
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

export {
	pageLayout,
	moduleName,
	moduleDescription,
	notionList,
	notionDataContainer,
	notionName,
	notionDescription,
	lessonList,
	lessonListItem,
	lessonTitle,
	lessonDescription,
};
