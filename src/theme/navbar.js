import { navbarHeight } from './constants';
import { oyster } from './colors';
import { pica } from './textStyles';

const navbar = {
	position: 'sticky',
	flexShrink: 0,
	top: 0,
	zIndex: 9000,
	display: 'grid',
	gridTemplateColumns: 'max-content 1fr max-content',
	width: '100%',
	height: `${navbarHeight}px`,
	gridGap: '3em',
	alignItems: 'center',
	paddingX: '3em',
	boxShadow: '0px .5em 1em rgba(0, 0, 0, .03)',
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

const navbarActiveLink = {
	fontWeight: 600,
};

const username = {
	fontWeight: 600,
};

export {
	navbar,
	navbarLogo,
	navbarLinkList,
	navbarLink,
	navbarActiveLink,
	username,
};
