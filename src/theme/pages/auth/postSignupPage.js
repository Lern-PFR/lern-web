const layout = {
	display: 'grid',
	height: '100%',
	gridTemplateColumns: `minmax(400px, 1fr) ${window.innerWidth >= 1000 ? '1fr' : ''}`, // makeshit media query.
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
	display: window.innerWidth >= 1000 ? 'inline-block' : 'none', // makeshit media query.
};

export {
	layout,
	hero,
	subtitle,
	illustrationSvg,
};
