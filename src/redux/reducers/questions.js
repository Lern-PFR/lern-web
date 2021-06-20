import { ActionTypes } from 'redux/actions/questions';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_QUESTION_REQUEST:
		case ActionTypes.CREATE_QUESTION_REQUEST:
		case ActionTypes.UPDATE_QUESTION_REQUEST:
		case ActionTypes.DELETE_QUESTION_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_QUESTION_FAILURE:
		case ActionTypes.CREATE_QUESTION_FAILURE:
		case ActionTypes.UPDATE_QUESTION_FAILURE:
		case ActionTypes.DELETE_QUESTION_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.CREATE_QUESTION_SUCCESS:
		case ActionTypes.DELETE_QUESTION_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.UPDATE_QUESTION_SUCCESS:
		case ActionTypes.FETCH_QUESTION_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.question],
				totalCount: 1,
			};
		case ActionTypes.CLEAR_QUESTION_LIST:
			return {
				...state,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
