import { getConceptById, getConcepts, getConceptOrderOptions } from 'redux/selectors/concepts';

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
						{ id: 'abcd', title: 'dummy concept 0', lessons: [{ id: 'a', title: 'b', description: 'c', version: 0 }] },
						{ id: 'efgh', title: 'dummy concept 1', lessons: [{ id: 'd', title: 'e', description: 'f', version: 0 }] },
						{ id: 'ijkl', title: 'dummy concept 2', lessons: [{ id: 'g', title: 'h', description: 'i', version: 0 }] },
						{ id: 'mnop', title: 'dummier concept', lessons: [{ id: 'j', title: 'k', description: 'l', version: 0 }] },
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
						{ id: 'abcd', title: 'dummy concept 0', lessons: [{ id: 'a', title: 'b', description: 'c', version: 0 }] },
						{
							id: 'efgh',
							title: 'dummy concept 1',
							lessons: [
								{ id: 'd', title: 'e', description: 'f', version: 0 },
								{ id: 'd', title: 'e', description: 'updated f', version: 1 },
							],
						},
						{ id: 'ijkl', title: 'dummy concept 2', lessons: [{ id: 'g', title: 'h', description: 'i', version: 0 }] },
						{ id: 'mnop', title: 'dummier concept', lessons: [{ id: 'j', title: 'k', description: 'l', version: 0 }] },
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

	describe('getConceptOrderOptions', () => {
		it('should return a single entry array if the current module has no concepts', () => {
			const mockedStore = {
				modules: {
					items: [
						{ id: 'abcd', title: 'dummy_module_title', description: 'dummy_module_description' },
					],
				},
			};
			const expectedResult = [{ label: 0, value: 0 }];
			const actualResult = getConceptOrderOptions(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return a an array of length n from the current modules\'s concept list.', () => {
			const mockedStore = {
				modules: {
					items: [
						{
							id: 'abcd',
							title: 'dummy_module_title',
							description: 'dummy_module_description',
							concepts: [
								{ id: 'dummy_concept_id_0', title: 'dummy_concept_title_0', description: 'dummy_concept_desc_0' },
								{ id: 'dummy_concept_id_1', title: 'dummy_concept_title_1', description: 'dummy_concept_desc_1' },
								{ id: 'dummy_concept_id_2', title: 'dummy_concept_title_2', description: 'dummy_concept_desc_2' },
								{ id: 'dummy_concept_id_3', title: 'dummy_concept_title_3', description: 'dummy_concept_desc_3' },
							],
						},
					],
				},
			};
			const expectedResult = [
				{ label: 0, value: 0 },
				{ label: 1, value: 1 },
				{ label: 2, value: 2 },
				{ label: 3, value: 3 },
			];

			const actualResult = getConceptOrderOptions(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
