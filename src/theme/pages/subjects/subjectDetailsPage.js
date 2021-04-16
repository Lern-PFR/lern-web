import { oyster } from 'theme/colors';

const pageLayout = {
	display: 'grid',
	gridTemplateColumns: 'minmax(572px, 1fr) 2fr',
	gridGap: '124px',
	padding: '120px 64px 0 64px',
};

const subjectName = {
	lineHeight: 'initial',
	margin: 0,
};

const subjectAuthor = {
	fontWeight: 600,
	color: oyster.default,
};

const subjectDescription = {
	fontWeight: 600,
	color: oyster.default,
};

const moduleList = {
	listStyle: 'none',
};

const moduleListItem = {
	border: 'solid 1px black',
	borderRadius: '8px',
	padding: '24px',
	marginBottom: '2em',
};

const moduleName = {
	margin: 0,
	lineHeight: 'initial',
};

const moduleDescription = {
	margin: 0,
	lineHeight: 'initial',
	marginTop: '16px',
	marginBottom: '32px',
};

const backToListButton = {
	display: 'flex',
	alignItems: 'center',

	'* > span': {
		display: 'flex',
		alignItems: 'center',
	},
};

export {
	pageLayout,
	moduleList,
	moduleListItem,
	moduleName,
	moduleDescription,
	subjectName,
	subjectAuthor,
	subjectDescription,
	backToListButton,
};
