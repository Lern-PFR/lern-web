import { getExercises, getExerciseById } from 'redux/selectors/exercises';

describe('Exercises state selectors', () => {
	describe('getExercises', () => {
		it('should return the exercises list if it exists.', () => {
			const mockedStore = {
				exercises: {
					items: [
						{ id: 'dummy_exercise_id', title: 'dummy_exercise_title' },
					],
				},
			};

			expect(getExercises(mockedStore)).toEqual(mockedStore.exercises.items);
		});

		it('should return an empty array if the exercises state is not set.', () => {
			const mockedStore = { };
			const expectedResult = [];

			expect(getExercises(mockedStore)).toEqual(expectedResult);
		});
	});

	describe('getExerciseById', () => {
		it('should return the concept whose id equals the one in parameter.', () => {
			const mockedStore = {
				exercises: {
					items: [
						{ id: 'dummy_exercise_id_0', title: 'dummy_exercise_title' },
						{ id: 'dummy_exercise_id_1', title: 'dummy_exercise_title' },
					],
				},
			};

			const expectedResult = { id: 'dummy_exercise_id_0', title: 'dummy_exercise_title', questions: [] };

			const actualResult = getExerciseById(mockedStore, 'dummy_exercise_id_0');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if no exercise contains the provided id.', () => {
			const mockedStore = {
				exercises: {
					items: [
						{ id: 'dummy_exercise_id_0', title: 'dummy_exercise_title' },
						{ id: 'dummy_exercise_id_1', title: 'dummy_exercise_title' },
					],
				},
			};

			const expectedResult = undefined;

			const actualResult = getExerciseById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});

		it('should return undefined if the exercise state has no item.', () => {
			const mockedStore = {
				exercises: {
					items: [],
				},
			};

			const expectedResult = undefined;

			const actualResult = getExerciseById(mockedStore, 'qrst');
			expect(actualResult).toStrictEqual(expectedResult);
		});
	});
});
