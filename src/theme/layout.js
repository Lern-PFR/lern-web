import { mainLayoutTopPadding } from './constants';

const mainContainerLayout = {
	display: 'flex',
	flexDirection: 'column',
	overflow: 'auto',
	height: '100%',
	width: '100%',
};

const mainLayout = {
	flex: '1',
	padding: `${mainLayoutTopPadding}px`,
};

export {
	mainContainerLayout,
	mainLayout,
};
