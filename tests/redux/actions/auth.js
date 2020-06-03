import * as authActions from '../../../src/redux/actions/auth';

describe('authentication actions', () => {
    it('should create a login action', () => {

        const user = { id: 0, username: 'johndoe' };

        const expectedAction = {
            type: 'AUTH_LOGIN',
            payload: {
                user
            }
        };

        expect(authActions.loginAction({ user })).toEqual(expectedAction);
    });

    it('should create a logout action', () => {

        const expectedAction = {
            type: 'AUTH_LOGOUT'
        };

        expect(authActions.logoutAction()).toEqual(expectedAction);
    });
});
