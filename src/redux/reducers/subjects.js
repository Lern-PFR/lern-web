import { ActionTypes } from 'redux/actions/subjects';

const initialState = {
	isLoading: false,
	items: {
		// Used most of the time
		all: [], 		// Contains all subjects sent back from the API.

		// Used when we need to separate by category
		mine: [],		// Contains subjects created by the current user.
		active: [],		// Contains subjects currently active for the current user.
		available: [],	// Contains the rest of valid subjects.
	},
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_SUBJECT_REQUEST:
		case ActionTypes.FETCH_SUBJECT_LIST_REQUEST:
		case ActionTypes.CREATE_SUBJECT_REQUEST:
		case ActionTypes.UPDATE_SUBJECT_REQUEST:
		case ActionTypes.DELETE_SUBJECT_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_SUBJECT_FAILURE:
		case ActionTypes.FETCH_SUBJECT_LIST_FAILURE:
		case ActionTypes.CREATE_SUBJECT_FAILURE:
		case ActionTypes.UPDATE_SUBJECT_FAILURE:
		case ActionTypes.DELETE_SUBJECT_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.CREATE_SUBJECT_SUCCESS:
		case ActionTypes.UPDATE_SUBJECT_SUCCESS:
		case ActionTypes.DELETE_SUBJECT_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.FETCH_SUBJECT_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: {
					...initialState.items,
					all: [payload.subject],
				},
				totalCount: 1,
			};
		case ActionTypes.FETCH_SUBJECT_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: {
					all: [],
					...payload.subjects,
				},
				totalCount: payload.totalCount,
			};
		case ActionTypes.CLEAR_SUBJECT_LIST:
			return {
				...state,
				items: initialState.items,
				totalCount: 0,
			};
		default:
			return state;
	}
};
