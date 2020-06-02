import _ from 'lodash';

const initialState = {
    init: false,
    items: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'USERS_UPDATE_ALL':
            return {
                ...state,
                init: true,
                items: [...new Set([...state.items, ...payload.users])]
            };
        default:
            return state;
    }
};