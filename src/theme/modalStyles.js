import { coconut } from 'theme/colors';

const modalWrapper = {
	display: 'flex',
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	alignItems: 'center',
	zIndex: 1001,
	overflowX: 'hidden',
	overflowY: 'auto',
	outline: 0,
};

const modal = {
	position: 'relative',
	margin: 'auto',
	borderRadius: '5px',
	maxWidth: '500px',
	width: '80%',
	padding: '0 1rem 1rem 1rem',
	zIndex: 100,
	bg: coconut.default,
};

const modalHeader = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const modalBackdrop = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	zIndex: 900,
	bg: 'rgba(0, 0, 0, 0.5)',
};

const modalFooter = {
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: '1em',
};

export {
	modal,
	modalBackdrop,
	modalFooter,
	modalHeader,
	modalWrapper,
};
