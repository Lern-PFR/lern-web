import { getProgressionBySubject, getProgression } from 'redux/selectors/progression';

describe('Progression state selectors', () => {
	describe('getProgression', () => {
		it('should return the progression list if it exists.', () => {
			const mockedStore = {
				progression: {
					items: [
						{
							subject: {
								id: 'abcd',
								title: 'titre',
							},
							concept: {
								id: 'dcba',
								title: 'titre',
							},
						},
						{
							subject: {
								id: 'asdf',
								title: 'titre',
							},
							concept: {
								id: 'qwer',
								title: 'titre',
							},
						},
						{
							subject: {
								id: 'zxcv',
								title: 'titre',
							},
							concept: {
								id: 'asdf',
								title: 'titre',
							},
						},
					],
				},
			};

			expect(getProgression(mockedStore)).toEqual(mockedStore.progression.items);
		});

		it('should return an empty array if the progression state is not set.', () => {
			const mockedStore = { };
			const expectedResult = [];

			expect(getProgression(mockedStore)).toEqual(expectedResult);
		});
	});

	describe('getProgressionBySubject', () => {
		it('should return the progression whose id equals the one in parameter.', () => {
			const mockedStore = {
				progression: {
					items: [
						{
							subject: {
								id: 'abcd',
								title: 'titre',
							},
							concept: {
								id: 'dcba',
								title: 'titre',
							},
						},
						{
							subject: {
								id: 'asdf',
								title: 'titre',
							},
							concept: {
								id: 'qwer',
								title: 'titre',
							},
						},
						{
							subject: {
								id: 'zxcv',
								title: 'titre',
							},
							concept: {
								id: 'asdf',
								title: 'titre',
							},
						},
					],
				},
			};

			const expectedResult = {
				subject: {
					id: 'asdf',
					title: 'titre',
				},
				concept: {
					id: 'qwer',
					title: 'titre',
				},
			};

			const actualResult = getProgressionBySubject(mockedStore, 'asdf');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if no progression contains the provided id.', () => {
			const mockedStore = {
				progression: {
					items: [
						{
							subject: {
								id: 'abcd',
								title: 'titre',
							},
							concept: {
								id: 'dcba',
								title: 'titre',
							},
						},
						{
							subject: {
								id: 'asdf',
								title: 'titre',
							},
							concept: {
								id: 'qwer',
								title: 'titre',
							},
						},
						{
							subject: {
								id: 'zxcv',
								title: 'titre',
							},
							concept: {
								id: 'asdf',
								title: 'titre',
							},
						},
					],
				},
			};

			const expectedResult = undefined;

			const actualResult = getProgressionBySubject(mockedStore, 'fghj');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if the progression state has no item.', () => {
			const mockedStore = {
				progression: {
					items: [],
				},
			};

			const expectedResult = undefined;

			const actualResult = getProgressionBySubject(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
