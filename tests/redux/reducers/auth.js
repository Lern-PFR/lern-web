import authReducer from '../../../src/redux/reducers/auth';

describe('authentication reducer', () => {

    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        jest.spyOn(window.localStorage.__proto__, 'removeItem');
    });

    afterEach(() => {    
        jest.clearAllMocks();
    });

    describe('initial state', () => {
        it('should return initial authentication state', () => {
            // Arrange
            const action = { type: 'dummy_action' };
            const initialState = {
                currentUser: null
            };

            // Act
            let result = authReducer(undefined, action);

            // Assert
            expect(result).toEqual(initialState);
        });
    });

    describe('Login action', () => {
        it('should set the currentUser state value to the value in the payload', () => {
            // Arrange
            const user = { id: 0, username: 'johndoe' };

            const action = { type: 'AUTH_LOGIN', payload: { user } };
            
            const expectedState = { 
                currentUser: user,
            };
        
            // Act
            let result = authReducer(undefined, action);

            // Assert
            expect(result).toEqual(expectedState);
            expect(localStorage.setItem).toBeCalledWith('user', JSON.stringify(user))
        });    
    });

    describe('Logout action', () => {
        it('should reset the authentication state', () => {
            // Arrange
            const action = { type: 'AUTH_LOGOUT' };
        
            const expectedState = { 
                currentUser: null,
            };
    
            // Act
            let result = authReducer(undefined, action);

            // Assert
            expect(result).toEqual(expectedState);
            expect(localStorage.removeItem).toBeCalledWith('user')
        });
    });
});
