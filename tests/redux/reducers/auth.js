import authReducer from '../../../src/redux/reducers/auth';

describe('authentication reducer', () => {

    describe('initial state', () => {
        it('should return initial user state', () => {
            const action = { type: 'dummy_action' };
            const initialState = {
                currentUser: null
            };

            expect(authReducer(undefined, action)).toEqual(initialState);
        });

        it('should return the inputted users list with init value set to true', () => {
            const users = [
                { id: 0, username: 'johndoe' },
                { id: 1, username: 'janedoe' }
            ];
          const action = { type: 'USERS_UPDATE_ALL', payload: { users } };
          
          const expectedState = { 
              init: true,
              items: users
           };
      
          expect(usersReducer(undefined, action)).toEqual(expectedState);
        });
    });
});