import { getSubjects, getSubjectsByNameOrAuthor } from 'redux/selectors/subjects';

describe('Subject state selectors', () => {
	describe('getSubjects', () => {
		it('should return the subject list if it exists.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, name: 'dummy subject 0' },
						{ id: 1, name: 'dummy subject 1' },
						{ id: 2, name: 'dummy subject 2' },
						{ id: 3, name: 'dummy subject 3' },
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

	describe('getSubjectsByNameOrAuthor', () => {
		it('should return the subjects that include the param value in their names.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, name: 'dummy subject 0' },
						{ id: 1, name: 'dummy subject 1' },
						{ id: 2, name: 'dummy subject 2' },
						{ id: 3, name: 'dummier subject' },
					],
				},
			};

			const expectedResult = [
				{ id: 0, name: 'dummy subject 0' },
				{ id: 1, name: 'dummy subject 1' },
				{ id: 2, name: 'dummy subject 2' },
			];

			const actualResult = getSubjectsByNameOrAuthor(mockedStore, 'dummy');
			expect(actualResult).toStrictEqual(expectedResult);
			expect(actualResult).not.toContain(mockedStore.subjects.items[4]);
		});

		it('should return the subjects that include the param value in their author\'s first or last name.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, name: 'dummy subject 0', author: { firstName: 'abcd', lastName: 'efgh' } },
						{ id: 1, name: 'dummy subject 1', author: { firstName: 'hijk', lastName: 'lmno' } },
						{ id: 2, name: 'dummy subject 2', author: { firstName: 'pqrs', lastName: 'tuvw' } },
						{ id: 3, name: 'dummier subject', author: { firstName: 'xyz', lastName: 'abcd' } },
					],
				},
			};

			const expectedResult = [
				{ id: 0, name: 'dummy subject 0', author: { firstName: 'abcd', lastName: 'efgh' } },
				{ id: 3, name: 'dummier subject', author: { firstName: 'xyz', lastName: 'abcd' } },
			];

			const actualResult = getSubjectsByNameOrAuthor(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return all subjects if no value is specified.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, name: 'dummy subject 0', author: { firstName: 'abcd', lastName: 'efgh' } },
						{ id: 1, name: 'dummy subject 1', author: { firstName: 'hijk', lastName: 'lmno' } },
						{ id: 2, name: 'dummy subject 2', author: { firstName: 'pqrs', lastName: 'tuvw' } },
						{ id: 3, name: 'dummier subject', author: { firstName: 'xyz', lastName: 'abcd' } },
					],
				},
			};

			const actualResult = getSubjectsByNameOrAuthor(mockedStore, '');
			expect(actualResult).toStrictEqual(mockedStore.subjects.items);
		});
	});
});
