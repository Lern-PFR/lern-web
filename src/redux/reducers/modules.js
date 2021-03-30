import { ActionTypes } from 'redux/actions/modules';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_MODULE_REQUEST:
		case ActionTypes.FETCH_MODULE_LIST_REQUEST:
		case ActionTypes.CREATE_MODULE_REQUEST:
		case ActionTypes.UPDATE_MODULE_REQUEST:
		case ActionTypes.DELETE_MODULE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_MODULE_FAILURE:
		case ActionTypes.FETCH_MODULE_LIST_FAILURE:
		case ActionTypes.CREATE_MODULE_FAILURE:
		case ActionTypes.UPDATE_MODULE_FAILURE:
		case ActionTypes.DELETE_MODULE_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.CREATE_MODULE_SUCCESS:
		case ActionTypes.UPDATE_MODULE_SUCCESS:
		case ActionTypes.DELETE_MODULE_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.FETCH_MODULE_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.module],
				totalCount: 1,
			};
		case ActionTypes.FETCH_MODULE_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [...payload.modules],
				totalCount: payload.totalCount,
			};
		case ActionTypes.CLEAR_MODULE_LIST:
			return {
				...state,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
