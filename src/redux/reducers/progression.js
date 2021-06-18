import { ActionTypes } from 'redux/actions/progression';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_PROGRESSION_REQUEST:
		case ActionTypes.FETCH_PROGRESSION_LIST_REQUEST:
		case ActionTypes.UPDATE_PROGRESSION_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_PROGRESSION_FAILURE:
		case ActionTypes.FETCH_PROGRESSION_LIST_FAILURE:
		case ActionTypes.UPDATE_PROGRESSION_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.UPDATE_PROGRESSION_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.FETCH_PROGRESSION_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.progression],
				totalCount: 1,
			};
		case ActionTypes.FETCH_PROGRESSION_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [...payload.progressionList],
				totalCount: payload.totalCount,
			};
		case ActionTypes.CLEAR_PROGRESSION_LIST:
			return {
				...state,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
