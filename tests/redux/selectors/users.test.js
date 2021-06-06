import { getCurrentUser } from 'redux/selectors/users';

describe('User state selectors', () => {
	describe('getCurrentUser', () => {
		it('should return the currentUser if it exists.', () => {
			const mockedStore = {
				users: {
					currentUser: { id: 0, nickname: 'test' },
				},
			};

			expect(getCurrentUser(mockedStore)).toEqual(mockedStore.users.currentUser);
		});

		it('should return undefined if currentUser is null.', () => {
			const mockedStore = { users: { currentUser: null } };

			expect(getCurrentUser(mockedStore)).toEqual(undefined);
		});
	});
});
