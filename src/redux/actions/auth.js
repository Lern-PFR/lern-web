export const loginAction = ({ user }) => ({
    type: 'AUTH_LOGIN',
    payload: { user}
});

export const logoutAction = () => ({
    type: 'AUTH_LOGOUT'
});