import {
	isRequired,
	isEmailAddress,
	hasMaxLength,
	hasMinLength,
} from 'lib/shared/inputValidation';

describe('Input validation helper methods', () => {
	describe('isRequired', () => {
		it('should return an empty string if check passes.', () => {
			expect(isRequired()('test')).toEqual('');
		});

		it('should return an the provided string if check fails.', () => {
			const expectedMessage = 'expectedMessage';

			expect(isRequired(expectedMessage)('')).toEqual(expectedMessage);
		});

		it('should return \'required\' if check fails and no message is provided.', () => {
			const expectedMessage = 'required';

			expect(isRequired()('')).toEqual(expectedMessage);
		});

		it('shouldn\'t validate a space-only string', () => {
			const expectedMessage = 'required';

			expect(isRequired()('         ')).toEqual(expectedMessage);
		});
	});

	describe('isEmailAddress', () => {
		it('should return an empty string if check passes.', () => {
			expect(isEmailAddress()('test@test.test')).toEqual('');
		});

		it('should return an the provided string if check fails.', () => {
			const expectedMessage = 'expectedMessage';

			expect(isEmailAddress(expectedMessage)('invalidValue')).toEqual(expectedMessage);
		});

		it('should return \'email\' if check fails and no message is provided.', () => {
			const expectedMessage = 'email';

			expect(isEmailAddress()('invalidValue')).toEqual(expectedMessage);
		});
	});

	describe('hasMaxLength', () => {
		it('should return an empty string if check passes.', () => {
			expect(hasMaxLength(5)('test')).toEqual('');
		});

		it('should return an the provided string if check fails.', () => {
			const expectedMessage = 'expectedMessage';

			expect(hasMaxLength(5, expectedMessage)('invalidValue')).toEqual(expectedMessage);
		});

		it('shouldn\'t count outer spaces.', () => {
			const expectedMessage = 'expectedMessage';

			expect(hasMaxLength(5, expectedMessage)('      test      ')).toEqual('');
		});

		it('should return \'max_length\' if check fails and no message is provided.', () => {
			const expectedMessage = 'max_length';

			expect(hasMaxLength(5)('invalidValue')).toEqual(expectedMessage);
		});
	});

	describe('hasMinLength', () => {
		it('should return an empty string if check passes.', () => {
			expect(hasMinLength(3)('test')).toEqual('');
		});

		it('should return an the provided string if check fails.', () => {
			const expectedMessage = 'expectedMessage';

			expect(hasMinLength(20, expectedMessage)('invalidValue')).toEqual(expectedMessage);
		});

		it('shouldn\'t count outer spaces.', () => {
			const expectedMessage = 'expectedMessage';

			expect(hasMinLength(20, expectedMessage)('      invalidValue      ')).toEqual(expectedMessage);
		});

		it('should return \'min_length\' if check fails and no message is provided.', () => {
			const expectedMessage = 'min_length';

			expect(hasMinLength(20)('invalidValue')).toEqual(expectedMessage);
		});
	});
});
