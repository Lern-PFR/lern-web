import { basmati } from 'theme/colors';

const layout = {
	display: 'grid',
	gridTemplateColumns: `minmax(700px, 1fr) ${window.innerWidth >= 1000 ? '1fr' : ''}`, // makeshift media query.
	gridGap: '3em',
	alignItems: 'center',
	maxWidth: '1450px',
	marginX: 'auto',
};

const hero = {
	lineHeight: 'initial',
};

const subtitle = {
	lineHeight: 'initial',
};

const illustrationSvg = {
	display: window.innerWidth >= 1000 ? 'inline-block' : 'none', // makeshift media query.
};

const sidebar = {
	position: 'sticky',
	top: '24px',
	height: '90vh',
	display: 'grid',
	padding: '24px 64px',
	borderLeft: `solid 1px ${basmati.default}`,
	gridTemplateRows: 'auto auto auto 1fr',
};

const timelineTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

export {
	layout,
	hero,
	subtitle,
	illustrationSvg,
	sidebar,
	timelineTitle,
};
