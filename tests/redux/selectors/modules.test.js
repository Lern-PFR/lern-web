import { getModuleById, getModules, getModuleOrderOptions } from 'redux/selectors/modules';

describe('Module state selectors', () => {
	describe('getModules', () => {
		it('should return the module list if it exists.', () => {
			const mockedStore = {
				modules: {
					items: [
						{ id: 0, title: 'dummy module 0' },
						{ id: 1, title: 'dummy module 1' },
						{ id: 2, title: 'dummy module 2' },
						{ id: 3, title: 'dummy module 3' },
					],
				},
			};

			expect(getModules(mockedStore)).toEqual(mockedStore.modules.items);
		});

		it('should return an empty array if the module state is not set.', () => {
			const mockedStore = { };
			const expectedResult = [];

			expect(getModules(mockedStore)).toEqual(expectedResult);
		});
	});

	describe('getModuleById', () => {
		it('should return the module whose id equals the one in parameter.', () => {
			const mockedStore = {
				modules: {
					items: [
						{ id: 'abcd', title: 'dummy module 0', concepts: [{ id: 'a', title: 'b', description: 'c' }] },
						{ id: 'efgh', title: 'dummy module 1', concepts: [{ id: 'd', title: 'e', description: 'f' }] },
						{ id: 'ijkl', title: 'dummy module 2', concepts: [{ id: 'g', title: 'h', description: 'i' }] },
						{ id: 'mnop', title: 'dummier module', concepts: [{ id: 'j', title: 'k', description: 'l' }] },
					],
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy module 1', concepts: [{ id: 'd', title: 'e', description: 'f' }] };

			const actualResult = getModuleById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return an empty concepts array if none is present', () => {
			const mockedStore = {
				modules: {
					items: [
						{ id: 'abcd', title: 'dummy module 0' },
						{ id: 'efgh', title: 'dummy module 1' },
						{ id: 'ijkl', title: 'dummy module 2' },
						{ id: 'mnop', title: 'dummier module' },
					],
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy module 1', concepts: [] };

			const actualResult = getModuleById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if no module contains the provided id.', () => {
			const mockedStore = {
				modules: {
					items: [
						{ id: 'abcd', title: 'dummy module 0' },
						{ id: 'efgh', title: 'dummy module 1' },
						{ id: 'ijkl', title: 'dummy module 2' },
						{ id: 'mnop', title: 'dummier module' },
					],
				},
			};

			const expectedResult = undefined;

			const actualResult = getModuleById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if the module state has no item.', () => {
			const mockedStore = {
				modules: {
					items: [],
				},
			};

			const expectedResult = undefined;

			const actualResult = getModuleById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});

	describe('getModuleOrderOptions', () => {
		it('should return a single entry array if the current subject has no modules', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{ id: 'abcd', title: 'dummy_subject_title', description: 'dummy_subject_description' },
						],
					},
				},
			};
			const expectedResult = [{ label: 0, value: 0 }];
			const actualResult = getModuleOrderOptions(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return a an array of length n+1 from the current subject\'s module list.', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{
								id: 'abcd',
								title: 'dummy_subject_title',
								description: 'dummy_subject_description',
								modules: [
									{ id: 'abcd', title: 'dummy module 0' },
									{ id: 'efgh', title: 'dummy module 1' },
									{ id: 'ijkl', title: 'dummy module 2' },
									{ id: 'mnop', title: 'dummier module' },
								],
							},
						],
					},
				},
			};
			const expectedResult = [
				{ label: 0, value: 0 },
				{ label: 1, value: 1 },
				{ label: 2, value: 2 },
				{ label: 3, value: 3 },
				{ label: 4, value: 4 },
			];

			const actualResult = getModuleOrderOptions(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
