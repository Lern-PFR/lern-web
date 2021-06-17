import { mainLayoutTopPadding } from 'theme/constants';

const layout = {
	display: 'grid',
	gridTemplateColumns: '25% 1fr',
	gridGap: '2em',
	paddingRight: mainLayoutTopPadding,
	height: '100%',
};

const contentSection = {
	paddingTop: mainLayoutTopPadding,
};

const title = {
	lineHeight: 'auto',
	margin: 0,
	paddingBottom: '24px',
};

const form = {
	display: 'grid',
	gridGap: '1em',
	height: 'max-content',
};

const formSubmit = {
	justifySelf: 'start',
};

export {
	layout,
	contentSection,
	title,
	form,
	formSubmit,
};
