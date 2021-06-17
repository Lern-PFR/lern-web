import { coconut, peppercorn } from 'theme/colors';
import { longPrimer } from 'theme/textStyles';

const innerContentList = {
	display: 'flex',
	flexWrap: 'wrap',
	listStyle: 'none',
	padding: 0,
	gridGap: '2em 2.5em',
	marginTop: '1em',
};

const innerContentListItem = {
	position: 'relative',
	height: '200px',
	width: '350px',
	padding: '1em',
	borderRadius: '8px',
	backgroundColor: coconut.default,
	boxShadow: `0 4px 16px ${peppercorn.default}29`,
	cursor: 'pointer',

	'&::after': {
		position: 'absolute',
		content: '""',
		zIndex: '-1',
		width: '100%',
		height: '100%',
		boxShadow: `0 8px 24px ${peppercorn.default}50`,
		opacity: 0,
		transition: 'opacity .3s ease-in-out',
		borderRadius: '8px',
	},

	'&:hover::after': {
		opacity: 1,
	},
};

const moduleCard = {
	display: 'grid',
	gridGap: '1em',
	gridTemplateRows: 'auto 1fr auto',
};

const innerContentListItemActionsRow = {
	display: 'grid',
	gridTemplateColumns: 'auto auto',
	justifyContent: 'end',
	gridGap: '1em',
};

const addInnerContentCard = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gridGap: '.5em',
	...longPrimer,

};

export {
	innerContentList,
	innerContentListItem,
	innerContentListItemActionsRow,
	addInnerContentCard,
	moduleCard,
};
