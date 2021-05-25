const commonElevation = {
	margin: 'auto',
	marginTop: '10px',
	marginBottom: '10px',
	zIndex: 10,
};

const elevationFlat = {
	...commonElevation,
	boxShadow: 'none',
};

const elevationFirst = {
	...commonElevation,
	boxShadow: '0px 2px 2px #00000029',
};

const elevationSecond = {
	...commonElevation,
	boxShadow: '0px 4px 4px #00000029',
};

const elevationThird = {
	...commonElevation,
	boxShadow: '0px 8px 8px #00000029',
};

const elevationFourth = {
	...commonElevation,
	boxShadow: '0px 16px 16px #00000029',
};

const elevationFifth = {
	...commonElevation,
	boxShadow: '0px 24px 24px #00000029',
};

export {
	elevationFlat, elevationFirst, elevationSecond, elevationThird, elevationFourth, elevationFifth,
};
