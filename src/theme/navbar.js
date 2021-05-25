import { coconut, oyster } from './colors';
import { pica } from './textStyles';

const navbar = {
	display: 'grid',
	gridTemplateColumns: 'max-content 1fr max-content',
	width: '100%',
	height: '80px',
	gridGap: '3em',
	alignItems: 'center',
	paddingX: '3em',
	backgroundColor: coconut.default,
	// @TODO: style shadow / blur
};

const navbarLogo = {
	cursor: 'pointer',
	height: '2em',
};

const navbarLinkList = {
	listStyle: 'none',
	display: 'flex',
	flexDirection: 'row',
	gridGap: '1em',
	padding: 0,
};

const navbarLink = {
	cursor: 'pointer',
	textAlign: 'center',
	transition: 'font-weight .1s ease-out',
	color: oyster.default,
	...pica,

	'&:hover': {
		fontWeight: 600,
	},
	// @TODO: style active link.
};

export {
	navbar,
	navbarLogo,
	navbarLinkList,
	navbarLink,
};
