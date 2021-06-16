import { peppercorn, tuna, coconut } from 'theme/colors';
import { mainLayoutTopPadding, navbarHeight } from 'theme/constants';

const pageLayout = {
	display: 'grid',
	gridTemplateColumns: 'minmax(35%, 1fr) minmax(calc(65% - 124px), 2fr)',
	gridGap: '124px',
	marginBottom: '3em',
};

const subjectDetails = {
	position: 'sticky',
	top: `${navbarHeight + mainLayoutTopPadding}px`,
	paddingBottom: '3em',
	backgroundColor: coconut.default,
};

const subjectName = {
	lineHeight: 'initial',
	margin: 0,
};

const subjectAuthor = {
	fontWeight: 600,
	color: tuna.default,
};

const subjectDescription = {
	fontWeight: 600,
	color: peppercorn.default,
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

const moduleList = {
	display: 'block',
};

const notionList = {
	display: 'block',
};

const courseList = {
	display: 'block',
};

const moduleDescription = {
	margin: 0,
	lineHeight: 'initial',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
};

const moduleAccessLinkButton = {
	width: 'max-content',
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

export {
	pageLayout,
	list,
	listItem,
	lastListItem,
	subjectListItem,
	listItemText,
	activeListItem,
	activeListItemText,
	moduleList,
	notionList,
	courseList,
	moduleDescription,
	moduleAccessLinkButton,
	subjectDetails,
	subjectName,
	subjectAuthor,
	subjectDescription,
	backToListButton,
	backToListSvg,
};
