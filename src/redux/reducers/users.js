import { ActionTypes } from 'redux/actions/users';

const initialState = {
	currentUser: null,
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.LOGIN_REQUEST:
		case ActionTypes.FETCH_USER_REQUEST:
		case ActionTypes.FETCH_USER_LIST_REQUEST:
		case ActionTypes.UPDATE_USER_REQUEST:
		case ActionTypes.LOGOUT_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.LOGIN_FAILURE:
		case ActionTypes.FETCH_USER_FAILURE:
		case ActionTypes.FETCH_USER_LIST_FAILURE:
		case ActionTypes.UPDATE_USER_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				currentUser: payload.user,
				items: [payload.user],
				totalCount: 1,
			};
		case ActionTypes.FETCH_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.user],
				totalCount: 1,
			};
		case ActionTypes.FETCH_USER_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [...payload.users],
				totalCount: payload.totalCount,
			};
		case ActionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				currentUser: null,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
