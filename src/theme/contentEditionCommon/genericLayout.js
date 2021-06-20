import { mainLayoutTopPadding } from 'theme/constants';
import { basmati } from 'theme/colors';

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

const responseDiv = {
	borderY: `solid 1px ${basmati.default}`,
	display: 'flex',
	flexDirection: 'column',
	paddingY: '1em',
};

const responseItem = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	padding: '1em',
};

const responseInput = {
	marginLeft: '1em',
};

export {
	layout,
	contentSection,
	title,
	form,
	formSubmit,
	responseDiv,
	responseItem,
	responseInput,
};
