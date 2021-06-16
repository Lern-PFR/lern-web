import { basmati, coconut, feedbackGreen, peppercorn, tuna } from 'theme/colors';

const pageLayout = {
	display: 'grid',
	gridTemplateColumns: '1fr 30%',
	gridGap: '32px',
	height: '100%',
	paddingTop: '40px',
	paddingBottom: '64px',
};

const sidebar = {
	position: 'sticky',
	top: '24px',
	height: '90vh',
	display: 'grid',
	padding: '24px 64px',
	borderLeft: `solid 1px ${basmati.default}`,
	gridTemplateRows: 'auto auto auto 1fr',
};

const conceptTitle = {
	margin: 0,
	lineHeight: 'initial',
	textTransform: 'capitalize',
};

const lessonContentContainer = {
	display: 'grid',
	gridTemplateRows: 'auto 1fr',
	gridGap: '24px',
};

const lessonTitleContainer = {
	position: 'sticky',
	top: 0,
	bg: coconut.default,
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

const navigationChevrons = {
	color: (({ disabled }) => (disabled ? tuna.lighter2 : tuna.default)),
	cursor: 'pointer',
	background: 'none',

	'&:hover': {
		color: (({ disabled }) => (disabled ? tuna.lighter2 : tuna.darker2)),
	},
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

const stepperCurrent = {
	backgroundColor: peppercorn.default,
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
	borderRadius: '.2em',
	gridTemplateColumns: 'min-content 1fr',
	alignItems: 'center',
	gridGap: '1em',
	padding: '1em',
	cursor: 'pointer',
};

const answerListItemInput = {
};

const validAnswerListItem = {
	backgroundColor: feedbackGreen,
};

const answerFormSubmitButton = {
	display: 'block',
	marginX: 'auto',
	marginTop: '3em',
};

const backToModuleSvg = {
	height: '.7em',
	stroke: tuna.default,
};

export {
	pageLayout,
	sidebar,
	lessonContentContainer,
	lessonTitleContainer,
	lessonTitle,
	lessonDescription,
	lessonContent,
	navigator,
	conceptTitle,
	questionContainer,
	navigationChevrons,
	stepperList,
	stepper,
	stepperCurrent,
	answersList,
	answerListItem,
	answerListItemInput,
	validAnswerListItem,
	answerFormSubmitButton,
	backToModuleSvg,
};
