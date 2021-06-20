import { ActionTypes } from 'redux/actions/exercises';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_EXERCISE_REQUEST:
		case ActionTypes.CREATE_EXERCISE_REQUEST:
		case ActionTypes.UPDATE_EXERCISE_REQUEST:
		case ActionTypes.DELETE_EXERCISE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_EXERCISE_FAILURE:
		case ActionTypes.CREATE_EXERCISE_FAILURE:
		case ActionTypes.UPDATE_EXERCISE_FAILURE:
		case ActionTypes.DELETE_EXERCISE_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.CREATE_EXERCISE_SUCCESS:
		case ActionTypes.UPDATE_EXERCISE_SUCCESS:
		case ActionTypes.DELETE_EXERCISE_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.FETCH_EXERCISE_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.exercise],
				totalCount: 1,
			};
		case ActionTypes.CLEAR_EXERCISE_LIST:
			return {
				...state,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
