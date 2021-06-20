import { ActionTypes } from 'redux/actions/lessons';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_LESSON_REQUEST:
		case ActionTypes.CREATE_LESSON_REQUEST:
		case ActionTypes.UPDATE_LESSON_REQUEST:
		case ActionTypes.DELETE_LESSON_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_LESSON_FAILURE:
		case ActionTypes.CREATE_LESSON_FAILURE:
		case ActionTypes.UPDATE_LESSON_FAILURE:
		case ActionTypes.DELETE_LESSON_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.CREATE_LESSON_SUCCESS:
		case ActionTypes.DELETE_LESSON_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.UPDATE_LESSON_SUCCESS:
		case ActionTypes.FETCH_LESSON_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.lesson],
				totalCount: 1,
			};
		case ActionTypes.CLEAR_LESSON_LIST:
			return {
				...state,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
