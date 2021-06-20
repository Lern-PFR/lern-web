import { ActionTypes } from 'redux/actions/userAnswers';

const initialState = {
	isLoading: false,
	items: [],
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.USER_ANSWER_CREATION_REQUEST:
		case ActionTypes.USER_ANSWER_FETCH_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.USER_ANSWER_CREATION_FAILURE:
		case ActionTypes.USER_ANSWER_FETCH_FAILURE:
		case ActionTypes.USER_ANSWER_CREATION_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.USER_ANSWER_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				items: [payload.answer],
			};
		default:
			return state;
	}
};
