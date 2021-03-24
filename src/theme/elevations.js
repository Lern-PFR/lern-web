const commonElevation = {
	margin: '10px',
};

const elevationFlat = {
	...commonElevation,
	boxShadow: 'none',
};

const elevationFirst = {
	...commonElevation,
	boxShadow: '5px 5px 5px',
};

const elevationSecond = {
	...commonElevation,
	boxShadow: '5px 10px 10px',
};

const elevationThird = {
	...commonElevation,
	boxShadow: '5px 15px 15px',
};

export {
	elevationFlat, elevationFirst, elevationSecond, elevationThird,
};
