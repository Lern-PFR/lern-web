import * as usersActions from '../../../src/redux/actions/users';

describe('users actions', () => {
	it('should create an action so update the users list', () => {
		const users = [
			{ id: 0, username: 'johndoe' },
			{ id: 1, username: 'janedoe' },
		];

		const expectedAction = {
			type: 'USERS_UPDATE_ALL',
			payload: {
				users,
			},
		};

		expect(usersActions.updateUsersAction({ users })).toEqual(expectedAction);
	});
});
