import { basmati, peppercorn } from 'theme/colors';

const pageLayout = {
	display: 'grid',
	gridTemplateColumns: '1fr 30%',
	gridGap: '32px',
	height: '100%',
	paddingTop: '40px',
	paddingBottom: '64px',
};

const sidebar = {
	display: 'grid',
	padding: '24px 64px',
	borderLeft: `solid 1px ${basmati.default}`,
	gridTemplateRows: 'auto auto 48px 1fr',
};

const notionTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

const lessonContentContainer = {
	display: 'grid',
	gridTemplateRows: '3rem 1fr',
	gridGap: '48px',
	paddingTop: '24px',
	paddingLeft: '64px',
};

const lessonTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

const lessonDescription = {
	margin: 0,
};

const lessonContent = {
	margin: 0,
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

const answersList = {
	listStyle: 'none',
	display: 'grid',
	gridAutoRows: '1fr',
	margin: 0,
	padding: 0,
};

const answerListItem = {
	display: 'grid',
	gridTemplateColumns: 'min-content 1fr',
	alignItems: 'center',
	gridGap: '1em',
	padding: '1em',
	cursor: 'pointer',
};

const answerFormSubmitButton = {
	display: 'block',
	marginX: 'auto',
	marginTop: '3em',
};

export {
	pageLayout,
	sidebar,
	lessonContentContainer,
	lessonTitle,
	lessonDescription,
	lessonContent,
	navigator,
	notionTitle,
	questionContainer,
	stepperList,
	stepper,
	answersList,
	answerListItem,
	answerFormSubmitButton,
};
