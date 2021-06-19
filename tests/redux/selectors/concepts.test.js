import { getConceptById, getConcepts } from 'redux/selectors/concepts';

describe('Concept state selectors', () => {
	describe('getConcepts', () => {
		it('should return the concept list if it exists.', () => {
			const mockedStore = {
				concepts: {
					items: [
						{ id: 0, title: 'dummy concept 0' },
						{ id: 1, title: 'dummy concept 1' },
						{ id: 2, title: 'dummy concept 2' },
						{ id: 3, title: 'dummy concept 3' },
					],
				},
			};

			expect(getConcepts(mockedStore)).toEqual(mockedStore.concepts.items);
		});

		it('should return an empty array if the concept state is not set.', () => {
			const mockedStore = { };
			const expectedResult = [];

			expect(getConcepts(mockedStore)).toEqual(expectedResult);
		});
	});

	describe('getConceptById', () => {
		it('should return the concept whose id equals the one in parameter.', () => {
			const mockedStore = {
				concepts: {
					items: [
						{ id: 'abcd', title: 'dummy concept 0', courses: [{ id: 'a', title: 'b', description: 'c', version: 0 }] },
						{ id: 'efgh', title: 'dummy concept 1', courses: [{ id: 'd', title: 'e', description: 'f', version: 0 }] },
						{ id: 'ijkl', title: 'dummy concept 2', courses: [{ id: 'g', title: 'h', description: 'i', version: 0 }] },
						{ id: 'mnop', title: 'dummier concept', courses: [{ id: 'j', title: 'k', description: 'l', version: 0 }] },
					],
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy concept 1', lessons: [{ id: 'd', title: 'e', description: 'f', version: 0 }] };

			const actualResult = getConceptById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should remove lessons which have a duplicate with a higher "version" field value.', () => {
			const mockedStore = {
				concepts: {
					items: [
						{ id: 'abcd', title: 'dummy concept 0', courses: [{ id: 'a', title: 'b', description: 'c', version: 0 }] },
						{
							id: 'efgh',
							title: 'dummy concept 1',
							courses: [
								{ id: 'd', title: 'e', description: 'f', version: 0 },
								{ id: 'd', title: 'e', description: 'updated f', version: 1 },
							],
						},
						{ id: 'ijkl', title: 'dummy concept 2', courses: [{ id: 'g', title: 'h', description: 'i', version: 0 }] },
						{ id: 'mnop', title: 'dummier concept', courses: [{ id: 'j', title: 'k', description: 'l', version: 0 }] },
					],
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy concept 1', lessons: [{ id: 'd', title: 'e', description: 'updated f', version: 1 }] };

			const actualResult = getConceptById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return an empty concepts array if none is present', () => {
			const mockedStore = {
				concepts: {
					items: [
						{ id: 'abcd', title: 'dummy concept 0' },
						{ id: 'efgh', title: 'dummy concept 1' },
						{ id: 'ijkl', title: 'dummy concept 2' },
						{ id: 'mnop', title: 'dummier concept' },
					],
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy concept 1', lessons: [] };

			const actualResult = getConceptById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if no concept contains the provided id.', () => {
			const mockedStore = {
				concepts: {
					items: [
						{ id: 'abcd', title: 'dummy concept 0' },
						{ id: 'efgh', title: 'dummy concept 1' },
						{ id: 'ijkl', title: 'dummy concept 2' },
						{ id: 'mnop', title: 'dummier concept' },
					],
				},
			};

			const expectedResult = undefined;

			const actualResult = getConceptById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if the module state has no item.', () => {
			const mockedStore = {
				concepts: {
					items: [],
				},
			};

			const expectedResult = undefined;

			const actualResult = getConceptById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
