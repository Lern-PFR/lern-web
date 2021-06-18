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

export {
	layout,
	hero,
	subtitle,
	illustrationSvg,
};
