const commonElevation = {
	margin: 'auto',
	marginTop: '10px',
	marginBottom: ' 10px',
};

const elevationFlat = {
	...commonElevation,
	boxShadow: 'none',
};

const elevationFirst = {
	...commonElevation,
	boxShadow: '0px 3px 7px 1px ',
};

const elevationSecond = {
	...commonElevation,
	boxShadow: '0px 5px 10px 1px',
};

const elevationThird = {
	...commonElevation,
	boxShadow: '0px 7px 12px 1px',
};

export {
	elevationFlat, elevationFirst, elevationSecond, elevationThird,
};
