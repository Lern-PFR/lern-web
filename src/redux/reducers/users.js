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
		case ActionTypes.LOGOUT_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.LOGIN_FAILURE:
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
