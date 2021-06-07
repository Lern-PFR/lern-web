import { getSubjects } from 'redux/selectors/subjects';

describe('Subject state selectors', () => {
	describe('getSubjects', () => {
		it('should return the subject list if it exists.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, nickname: 'dummy subject 0' },
						{ id: 1, nickname: 'dummy subject 1' },
						{ id: 2, nickname: 'dummy subject 2' },
						{ id: 3, nickname: 'dummy subject 3' },
					],
				},
			};

			expect(getSubjects(mockedStore)).toEqual(mockedStore.subjects.items);
		});

		it('should return an empty array if the subject state is not set.', () => {
			const mockedStore = { };

			expect(getSubjects(mockedStore)).toEqual([]);
		});
	});
});
