import { ActionTypes } from 'redux/actions/notions';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_NOTION_REQUEST:
		case ActionTypes.FETCH_NOTION_LIST_REQUEST:
		case ActionTypes.CREATE_NOTION_REQUEST:
		case ActionTypes.UPDATE_NOTION_REQUEST:
		case ActionTypes.DELETE_NOTION_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_NOTION_FAILURE:
		case ActionTypes.FETCH_NOTION_LIST_FAILURE:
		case ActionTypes.CREATE_NOTION_FAILURE:
		case ActionTypes.UPDATE_NOTION_FAILURE:
		case ActionTypes.DELETE_NOTION_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.CREATE_NOTION_SUCCESS:
		case ActionTypes.UPDATE_NOTION_SUCCESS:
		case ActionTypes.DELETE_NOTION_SUCCESS:
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
		case ActionTypes.FETCH_NOTION_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [...payload.notions],
				totalCount: payload.totalCount,
			};
		case ActionTypes.CLEAR_NOTION_LIST:
			return {
				...state,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
