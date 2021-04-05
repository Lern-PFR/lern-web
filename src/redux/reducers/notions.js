import { ActionTypes } from 'redux/actions/notions';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_NOTION_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_NOTION_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.FETCH_NOTION_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.notion],
				totalCount: 1,
			};
		default:
			return state;
	}
};
