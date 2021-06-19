import { ActionTypes } from 'redux/actions/concepts';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_CONCEPT_REQUEST:
		case ActionTypes.FETCH_CONCEPT_LIST_REQUEST:
		case ActionTypes.CREATE_CONCEPT_REQUEST:
		case ActionTypes.UPDATE_CONCEPT_REQUEST:
		case ActionTypes.DELETE_CONCEPT_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_CONCEPT_FAILURE:
		case ActionTypes.FETCH_CONCEPT_LIST_FAILURE:
		case ActionTypes.CREATE_CONCEPT_FAILURE:
		case ActionTypes.UPDATE_CONCEPT_FAILURE:
		case ActionTypes.DELETE_CONCEPT_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.CREATE_CONCEPT_SUCCESS:
		case ActionTypes.DELETE_CONCEPT_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.FETCH_CONCEPT_SUCCESS:
		case ActionTypes.UPDATE_CONCEPT_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.concept],
				totalCount: 1,
			};
		case ActionTypes.FETCH_CONCEPT_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [...payload.concepts],
				totalCount: payload.totalCount,
			};
		case ActionTypes.CLEAR_CONCEPT_LIST:
			return {
				...state,
				items: [],
				totalCount: 0,
			};
		default:
			return state;
	}
};
