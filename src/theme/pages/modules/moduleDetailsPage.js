const pageLayout = {
	display: 'grid',
	gridTemplateRows: '1fr auto',
	paddingX: '64px',
	paddingTop: '120px',
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
	// display: 'flex',
	// flexDirection: 'column',
	display: 'grid',
	gridAutoRows: 'minmax(250px, 1fr)',
	gridGap: '4em',
	padding: 0,
};

const notionName = {
	lineHeight: 'initial',
	margin: 0,
};

const notionDescription = {
	lineHeight: 'initial',
	margin: 0,
};

const lessonList = {
	display: 'flex',
	flexDirection: 'row',
	padding: 0,
	marginTop: '2em',
};

const lessonListItem = {
	marginRight: '1em',
	border: 'solid 1px black',
	borderRadius: '8px',
	padding: '2em',
	position: 'relative',
	display: 'grid',
	gridTemplateRows: '1fr 5fr',
	gridGap: '1em',
};

const lessonDescription = {
	margin: 0,
	lineHeight: 'initial',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
};

export {
	pageLayout,
	moduleName,
	moduleDescription,
	notionList,
	notionName,
	notionDescription,
	lessonList,
	lessonListItem,
	lessonDescription,
};
