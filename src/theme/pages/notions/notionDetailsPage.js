import { basmati, peppercorn } from 'theme/colors';

const pageLayout = {
	display: 'grid',
	gridTemplateColumns: '1fr 25%',
	height: '100%',
};

const sidebar = {
	display: 'grid',
	padding: '64px 48px',
	borderLeft: `solid 1px ${basmati.default}`,
	gridTemplateRows: 'auto auto 48px 1fr',
};

const notionTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

const lessonTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

const questionContainer = {

};

const navigator = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
};

const stepperList = {
	flex: 0.5,
	listStyle: 'none',
	padding: 0,
	display: 'flex',
	flexDirection: 'row',
	marginLeft: '1em',
	marginRight: '1em',
};

const stepper = {
	backgroundColor: basmati.default,
	flex: '1',
	height: '12px',
	border: 0,
	marginLeft: '2px',
	marginRight: '2px',
	transition: 'transform .05s ease-out, flex .05s ease-out',
	cursor: 'pointer',

	'&:hover': {
		flex: '1.3',
		transform: 'scaleY(1.3)',
		backgroundColor: peppercorn.default,
	},
};

export {
	pageLayout,
	sidebar,
	lessonTitle,
	navigator,
	notionTitle,
	questionContainer,
	stepperList,
	stepper,
};
