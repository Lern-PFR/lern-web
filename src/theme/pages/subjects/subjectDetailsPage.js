import { peppercorn, tuna } from 'theme/colors';

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
	color: tuna.default,
};

const subjectDescription = {
	fontWeight: 600,
	color: peppercorn.default,
};

const moduleList = {
	listStyle: 'none',
	display: 'grid',
	gridAutoRows: 'minmax(250px, 1fr)',
	gridRowGap: '2em',
};

const moduleListItem = {
	border: 'solid 1px black',
	borderRadius: '8px',
	padding: '24px',
	position: 'relative',
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
	paddingLeft: 'initial',
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
