import localstorage from '../../lib/localstorage';

const initialState = {
    currentUser: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'AUTH_LOGIN': {
            const newState = {
                ...state,
                currentUser: payload.user,
            };
            localstorage.put('user', JSON.stringify(payload.user));

            return newState;
        }
        case 'AUTH_LOGOUT': {
            localStorage.removeItem('user');
            return {
                ...initialState,
            };
        }
    }
}