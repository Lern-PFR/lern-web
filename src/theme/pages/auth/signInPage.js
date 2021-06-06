const layout = {
	display: 'grid',
	gridTemplateColumns: `minmax(400px, 1fr) ${window.innerWidth >= 1472 ? '1fr' : ''}`, // makeshift media query.
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

const input = {
	height: '2em',
};

const illustrationSvg = {
	display: window.innerWidth >= 1472 ? 'inline-block' : 'none', // makeshift media query.
};

const buttonsContainer = {
	display: 'grid',
	gridGap: '1em',
	gridTemplateColumns: 'repeat(2, max-content)',
	marginTop: '1em',
};

export {
	layout,
	hero,
	subtitle,
	illustrationSvg,
	input,
	buttonsContainer,
};
