const layout = {
	display: 'grid',
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

const input = {
	height: '2em',
};

const illustrationSvg = {
	display: window.innerWidth >= 1000 ? 'inline-bloc' : 'none', // makeshit media query.
};

const submitButton = {
	marginTop: '1em',
};

export {
	layout,
	hero,
	subtitle,
	illustrationSvg,
	input,
	submitButton,
};
