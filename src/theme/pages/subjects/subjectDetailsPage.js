import { peppercorn, tuna } from 'theme/colors';
import { mainLayoutTopPadding, navbarHeight } from 'theme/constants';

const pageLayout = {
	display: 'grid',
	gridTemplateColumns: 'minmax(30%, 1fr) 2fr',
	gridGap: '124px',
	paddingX: '64px',
};

const subjectDetails = {
	position: 'sticky',
	top: `${navbarHeight + mainLayoutTopPadding}px`,
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

const moduleList = {
	listStyle: 'none',
	display: 'grid',
	gridAutoRows: 'minmax(40%, 1fr)',
	gridRowGap: '2em',
	maxHeight: '100%',
};

const moduleListItem = {
	border: 'solid 1px black',
	borderRadius: '8px',
	padding: '2em',
	position: 'relative',
	display: 'grid',
	gridTemplateRows: '1fr 5fr auto',
	gridGap: '1em',
};

const moduleName = {
	margin: 0,
	lineHeight: 'initial',
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
	moduleList,
	moduleListItem,
	moduleName,
	moduleDescription,
	moduleAccessLinkButton,
	subjectDetails,
	subjectName,
	subjectAuthor,
	subjectDescription,
	backToListButton,
	backToListSvg,
};
