import { getSubjectById, getSubjects, getSubjectsByTitleOrAuthor, getContentManipulationSidebarData } from 'redux/selectors/subjects';

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
			const expectedResult = {
				all: [],
				active: [],
				available: [],
				mine: [],
			};

			expect(getSubjects(mockedStore)).toEqual(expectedResult);
		});
	});

	describe('getSubjectsByTitleOrAuthor', () => {
		it('should return the subjects that include the param value in their titles.', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [],
						active: [],
						available: [
							{ id: 2, title: 'dummy subject 2' },
							{ id: 3, title: 'dummier subject' },
						],
						mine: [
							{ id: 0, title: 'dummy subject 0' },
							{ id: 1, title: 'dummy subject 1' },
						],
					},
				},
			};

			const expectedResult = {
				active: [],
				available: [
					{ id: 2, title: 'dummy subject 2' },
				],
				mine: [
					{ id: 0, title: 'dummy subject 0' },
					{ id: 1, title: 'dummy subject 1' },
				],
			};

			const actualResult = getSubjectsByTitleOrAuthor(mockedStore, 'dummy');
			expect(actualResult).toStrictEqual(expectedResult);
			expect(actualResult).not.toContain(mockedStore.subjects.items[4]);
		});

		it('should return the subjects that include the param value in their author\'s first or last name.', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [],
						active: [
							{ id: 3, title: 'dummier subject', author: { firstname: 'xyz', lastname: 'abcd' } },
						],
						available: [
							{ id: 1, title: 'dummy subject 1', author: { firstname: 'hijk', lastname: 'lmno' } },
							{ id: 2, title: 'dummy subject 2', author: { firstname: 'pqrs', lastname: 'tuvw' } },
						],
						mine: [
							{ id: 0, title: 'dummy subject 0', author: { firstname: 'abcd', lastname: 'efgh' } },
						],
					},
				},
			};

			const expectedResult = {
				active: [
					{ id: 3, title: 'dummier subject', author: { firstname: 'xyz', lastname: 'abcd' } },
				],
				available: [],
				mine: [
					{ id: 0, title: 'dummy subject 0', author: { firstname: 'abcd', lastname: 'efgh' } },
				],
			};

			const actualResult = getSubjectsByTitleOrAuthor(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return all subjects if no value is specified.', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [],
						available: [
							{ id: 0, title: 'dummy subject 0', author: { firstname: 'abcd', lastname: 'efgh' } },
							{ id: 1, title: 'dummy subject 1', author: { firstname: 'hijk', lastname: 'lmno' } },
							{ id: 2, title: 'dummy subject 2', author: { firstname: 'pqrs', lastname: 'tuvw' } },
							{ id: 3, title: 'dummier subject', author: { firstname: 'xyz', lastname: 'abcd' } },
						],
						active: [],
						mine: [],
					},
				},
			};

			const { subjects: { items: { all, ...expectedResult } } } = mockedStore;

			const actualResult = getSubjectsByTitleOrAuthor(mockedStore, '');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});

	describe('getSubjectById', () => {
		it('should return the subject whose id equals the one in parameter.', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{ id: 'abcd', title: 'dummy subject 0', modules: [{ id: 'a', title: 'b', description: 'c' }] },
							{ id: 'efgh', title: 'dummy subject 1', modules: [{ id: 'd', title: 'e', description: 'f' }] },
							{ id: 'ijkl', title: 'dummy subject 2', modules: [{ id: 'g', title: 'h', description: 'i' }] },
							{ id: 'mnop', title: 'dummier subject', modules: [{ id: 'j', title: 'k', description: 'l' }] },
						],
					},
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy subject 1', modules: [{ id: 'd', title: 'e', description: 'f' }] };

			const actualResult = getSubjectById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return an empty modules array if none is present', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{ id: 'abcd', title: 'dummy subject 0' },
							{ id: 'efgh', title: 'dummy subject 1' },
							{ id: 'ijkl', title: 'dummy subject 2' },
							{ id: 'mnop', title: 'dummier subject' },
						],
					},
				},
			};

			const expectedResult = { id: 'efgh', title: 'dummy subject 1', modules: [] };

			const actualResult = getSubjectById(mockedStore, 'efgh');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if no subject contains the provided id.', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{ id: 'abcd', title: 'dummy subject 0' },
							{ id: 'efgh', title: 'dummy subject 1' },
							{ id: 'ijkl', title: 'dummy subject 2' },
							{ id: 'mnop', title: 'dummier subject' },
						],
					},
				},
			};

			const expectedResult = undefined;

			const actualResult = getSubjectById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if the subject state has no item.', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [],
					},
				},
			};

			const expectedResult = undefined;

			const actualResult = getSubjectById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});

	describe('getContentManipulationSidebarData', () => {
		it('should return undefined if no subject is present in the redux store', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [],
						available: [],
						active: [],
						mine: [],
					},
				},
			};

			const actualResult = getContentManipulationSidebarData(mockedStore, null);
			expect(actualResult).toStrictEqual(undefined);
		});

		it('should return only the subject if it doesn\'t have any modules', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{ id: 'abcd', title: 'dummy subject 0', modules: [] },
						],
					},
				},
			};

			const expectedResult = [{ label: 'dummy subject 0', id: 'abcd', contentType: 'subject' }];

			const actualResult = getContentManipulationSidebarData(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should prefix a module\'s name with its order when setting the "label" field', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{
								id: 'abcd',
								title: 'dummy subject 0',
								modules: [
									{
										id: 'abcd',
										title: 'dummy module 0',
										order: 0,
									},
								],
							},
						],
					},
				},
			};

			const expectedResult = [
				{ label: 'dummy subject 0', id: 'abcd', contentType: 'subject' },
				{ label: '0. dummy module 0', id: 'abcd', order: 0, contentType: 'module' },
			];

			const actualResult = getContentManipulationSidebarData(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should not return a "concept" element if none is present', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{
								id: 'abcd',
								title: 'dummy subject 0',
								modules: [
									{
										id: 'abcd',
										title: 'dummy module 0',
										order: 0,
										concepts: [],
									},
								],
							},
						],
					},
				},
			};

			const expectedResult = [
				{ label: 'dummy subject 0', id: 'abcd', contentType: 'subject' },
				{ label: '0. dummy module 0', id: 'abcd', order: 0, contentType: 'module' },
			];

			const actualResult = getContentManipulationSidebarData(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should prefix a concept\'s name with its parent module and own order when setting the "label" field', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{
								id: 'abcd',
								title: 'dummy subject 0',
								modules: [
									{
										id: 'abcd',
										title: 'dummy module 0',
										order: 0,
										concepts: [
											{
												id: 'abcd',
												title: 'dummy concept 0',
												order: 0,
											},
										],
									},
								],
							},
						],
					},
				},
			};

			const expectedResult = [
				{ label: 'dummy subject 0', id: 'abcd', contentType: 'subject' },
				{ label: '0. dummy module 0', id: 'abcd', order: 0, contentType: 'module' },
				{ label: '0.0. dummy concept 0', id: 'abcd', order: 0, contentType: 'concept' },
			];

			const actualResult = getContentManipulationSidebarData(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should not return a "lesson" element if none is present', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{
								id: 'abcd',
								title: 'dummy subject 0',
								modules: [
									{
										id: 'abcd',
										title: 'dummy module 0',
										order: 0,
										concepts: [
											{
												id: 'abcd',
												title: 'dummy concept 0',
												order: 0,
												lessons: [],
											},
										],
									},
								],
							},
						],
					},
				},
			};

			const expectedResult = [
				{ label: 'dummy subject 0', id: 'abcd', contentType: 'subject' },
				{ label: '0. dummy module 0', id: 'abcd', order: 0, contentType: 'module' },
				{ label: '0.0. dummy concept 0', id: 'abcd', order: 0, contentType: 'concept' },
			];

			const actualResult = getContentManipulationSidebarData(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should prefix a course\'s name with its parent module, parent concept and own order when setting the "label" field', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{
								id: 'abcd',
								title: 'dummy subject 0',
								modules: [
									{
										id: 'abcd',
										title: 'dummy module 0',
										order: 0,
										concepts: [
											{
												id: 'abcd',
												title: 'dummy concept 0',
												order: 0,
												lessons: [
													{
														id: 'abcd',
														title: 'dummy course 0',
														order: 0,
														version: 0,
													},
												],
											},
										],
									},
								],
							},
						],
					},
				},
			};

			const expectedResult = [
				{ label: 'dummy subject 0', id: 'abcd', contentType: 'subject' },
				{ label: '0. dummy module 0', id: 'abcd', order: 0, contentType: 'module' },
				{ label: '0.0. dummy concept 0', id: 'abcd', order: 0, contentType: 'concept' },
				{ label: '0.0.0. dummy course 0', id: 'abcd', order: 0, contentType: 'lesson', version: 0 },
			];

			const actualResult = getContentManipulationSidebarData(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should ignore a course if it has a duplicate with a higher "version" than itself', () => {
			const mockedStore = {
				subjects: {
					items: {
						all: [
							{
								id: 'abcd',
								title: 'dummy subject 0',
								modules: [
									{
										id: 'abcd',
										title: 'dummy module 0',
										order: 0,
										concepts: [
											{
												id: 'abcd',
												title: 'dummy concept 0',
												order: 0,
												lessons: [
													{
														id: 'abcd',
														title: 'dummy course 0',
														order: 0,
														version: 0,
													},
													{
														id: 'abcd',
														title: 'dummy course 0 updated',
														order: 0,
														version: 1,
													},
												],
											},
										],
									},
								],
							},
						],
					},
				},
			};

			const expectedResult = [
				{ label: 'dummy subject 0', id: 'abcd', contentType: 'subject' },
				{ label: '0. dummy module 0', id: 'abcd', order: 0, contentType: 'module' },
				{ label: '0.0. dummy concept 0', id: 'abcd', order: 0, contentType: 'concept' },
				{ label: '0.0.0. dummy course 0 updated', id: 'abcd', order: 0, contentType: 'lesson', version: 1 },
			];

			const actualResult = getContentManipulationSidebarData(mockedStore, 'abcd');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
