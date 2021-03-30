import { ActionTypes } from 'redux/actions/modules';

const initialState = {
	isLoading: false,
	items: [],
	totalCount: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.FETCH_MODULE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.FETCH_MODULE_FAILURE:
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
		default:
			return state;
	}
};
