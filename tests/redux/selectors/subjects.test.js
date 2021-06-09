import { getSubjectById, getSubjects, getSubjectsByTitleOrAuthor } from 'redux/selectors/subjects';

describe('Subject state selectors', () => {
	describe('getSubjects', () => {
		it('should return the subject list if it exists.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, title: 'dummy subject 0' },
						{ id: 1, title: 'dummy subject 1' },
						{ id: 2, title: 'dummy subject 2' },
						{ id: 3, title: 'dummy subject 3' },
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

	describe('getSubjectsByTitleOrAuthor', () => {
		it('should return the subjects that include the param value in their titles.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, title: 'dummy subject 0' },
						{ id: 1, title: 'dummy subject 1' },
						{ id: 2, title: 'dummy subject 2' },
						{ id: 3, title: 'dummier subject' },
					],
				},
			};

			const expectedResult = [
				{ id: 0, title: 'dummy subject 0' },
				{ id: 1, title: 'dummy subject 1' },
				{ id: 2, title: 'dummy subject 2' },
			];

			const actualResult = getSubjectsByTitleOrAuthor(mockedStore, 'dummy');
			expect(actualResult).toStrictEqual(expectedResult);
			expect(actualResult).not.toContain(mockedStore.subjects.items[4]);
		});

		it('should return the subjects that include the param value in their author\'s first or last name.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, title: 'dummy subject 0', author: { firstName: 'abcd', lastName: 'efgh' } },
						{ id: 1, title: 'dummy subject 1', author: { firstName: 'hijk', lastName: 'lmno' } },
						{ id: 2, title: 'dummy subject 2', author: { firstName: 'pqrs', lastName: 'tuvw' } },
						{ id: 3, title: 'dummier subject', author: { firstName: 'xyz', lastName: 'abcd' } },
					],
				},
			};

			const expectedResult = [
				{ id: 0, title: 'dummy subject 0', author: { firstName: 'abcd', lastName: 'efgh' } },
				{ id: 3, title: 'dummier subject', author: { firstName: 'xyz', lastName: 'abcd' } },
			];

			const actualResult = getSubjectsByTitleOrAuthor(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return all subjects if no value is specified.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 0, title: 'dummy subject 0', author: { firstName: 'abcd', lastName: 'efgh' } },
						{ id: 1, title: 'dummy subject 1', author: { firstName: 'hijk', lastName: 'lmno' } },
						{ id: 2, title: 'dummy subject 2', author: { firstName: 'pqrs', lastName: 'tuvw' } },
						{ id: 3, title: 'dummier subject', author: { firstName: 'xyz', lastName: 'abcd' } },
					],
				},
			};

			const actualResult = getSubjectsByTitleOrAuthor(mockedStore, '');
			expect(actualResult).toStrictEqual(mockedStore.subjects.items);
		});
	});

	describe('getSubjectById', () => {
		it('should return the subject whose id equals the one in parameter.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 'abcd', title: 'dummy subject 0' },
						{ id: 'efgh', title: 'dummy subject 1' },
						{ id: 'ijkl', title: 'dummy subject 2' },
						{ id: 'mnop', title: 'dummier subject' },
					],
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy subject 1' };

			const actualResult = getSubjectById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if no subject contains the provided id.', () => {
			const mockedStore = {
				subjects: {
					items: [
						{ id: 'abcd', title: 'dummy subject 0' },
						{ id: 'efgh', title: 'dummy subject 1' },
						{ id: 'ijkl', title: 'dummy subject 2' },
						{ id: 'mnop', title: 'dummier subject' },
					],
				},
			};

			const expectedResult = undefined;

			const actualResult = getSubjectById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if the subject state has no item.', () => {
			const mockedStore = {
				subjects: {
					items: [],
				},
			};

			const expectedResult = undefined;

			const actualResult = getSubjectById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
