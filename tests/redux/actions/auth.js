import * as authActions from '../../../src/redux/actions/auth';

describe('authentication actions', () => {
    it('should create a login action', () => {
        // Arrange
        const user = { id: 0, username: 'johndoe' };

        const expectedAction = {
            type: 'AUTH_LOGIN',
            payload: {
                user
            }
        };

        // Act
        let result = authActions.loginAction({ user });

        // Assert
        expect(result).toEqual(expectedAction);
    });

    it('should create a logout action', () => {
        // Arrange
        const expectedAction = {
            type: 'AUTH_LOGOUT'
        };

        // Act
        let result = authActions.logoutAction();
        
        // Assert
        expect(result).toEqual(expectedAction);
    });
});
