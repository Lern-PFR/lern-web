import {
	isFormValid,
	validateField,
	validateForm,
} from 'lib/shared/formUtils';

describe('formUtils', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('validateField', () => {
		it('should return an empty object if the rules param is undefined.', () => {
			expect(validateField('value')).toEqual({});
		});

		it('should execute the provided validation methods.', () => {
			const mockValidationMethod = jest.fn();
			const validationRules = { mockedRule: mockValidationMethod };

			validateField('value', validationRules);

			expect(mockValidationMethod).toBeCalledTimes(1);
		});

		it('should return validation methods\' result as an object.', () => {
			const validationRules = {
				mockedRule1: jest.fn().mockReturnValue('mockedValidationResult1'),
				mockedRule2: jest.fn().mockReturnValue('mockedValidationResult2'),
				mockedRule3: jest.fn().mockReturnValue('mockedValidationResult3'),
			};

			const result = validateField('value', validationRules);
			const expectedResult = {
				mockedRule1: 'mockedValidationResult1',
				mockedRule2: 'mockedValidationResult2',
				mockedRule3: 'mockedValidationResult3',
			};

			expect(result).toStrictEqual(expectedResult);
		});

		it('should not include empty string results in returned object.', () => {
			const validationRules = {
				mockedRule1: jest.fn().mockReturnValue('mockedValidationResult1'),
				mockedRule2: jest.fn().mockReturnValue(''),
				mockedRule3: jest.fn().mockReturnValue('mockedValidationResult3'),
			};

			const result = validateField('value', validationRules);
			const expectedResult = {
				mockedRule1: 'mockedValidationResult1',
				mockedRule3: 'mockedValidationResult3',
			};

			expect(result).toStrictEqual(expectedResult);
			expect(result).not.toMatchObject({ mockedRule2: '' });
		});
	});

	describe('validateForm', () => {
		it('should return an empty object if called with an empty fieldsRef param.', () => {
			expect(validateForm({})).toEqual({});
		});

		it('should return an object with a key for each fieldsRef input.', () => {
			const fieldsRef = {
				field1: { value: '' },
				field2: { value: '' },
			};

			const expectedResult = {
				field1: expect.anything(),
				field2: expect.anything(),
			};

			expect(validateForm(fieldsRef)).toMatchObject(expectedResult);
		});
	});

	describe('isFormValid', () => {
		it('should return true if the param is empty.', () => {
			expect(isFormValid({})).toEqual(true);
		});

		it('should return false if the param is not empty.', () => {
			expect(isFormValid({ a: 'b' })).toEqual(false);
		});
	});
});
