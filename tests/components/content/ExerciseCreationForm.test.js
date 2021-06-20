import { shallow } from 'enzyme';
import { ExerciseCreationForm } from 'components/content';
import { act, fireEvent, render } from '@testing-library/react';

describe('Concept creation form', () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe('Snapshot testing', () => {
		const wrapper = shallow(<ExerciseCreationForm onSubmit={jest.fn()} />);

		expect(wrapper).toMatchSnapshot();
	});

	describe('Form inputs', () => {
		it('should contain a "instructions" textarea.', () => {
			const { container } = render(<ExerciseCreationForm onSubmit={jest.fn()} />);
			expect(container.querySelector('textarea[name="instructions"]')).not.toEqual(null);
		});

		it('should contain a "explanation" textarea.', () => {
			const { container } = render(<ExerciseCreationForm onSubmit={jest.fn()} />);
			expect(container.querySelector('textarea[name="explanation"]')).not.toEqual(null);
		});
	});

	describe('Form inputs validation', () => {
		describe('instructions input validation', () => {
			let titleInput;
			let submitButton;
			let container;
			let mockedOnSubmit;

			beforeEach(() => {
				mockedOnSubmit = jest.fn();
				container = render(<ExerciseCreationForm onSubmit={mockedOnSubmit} />).container;
				titleInput = container.querySelector('textarea[name="instructions"]');
				submitButton = container.querySelector('button[type="submit"]');
			});

			describe('on submit validation', () => {
				it('should trigger a "required" validation error on the title input if it is empty on submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: '' } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('exercises.creation.form.fields.instructions.validation_rules.required'));
				});

				it('should trigger a "min_length" validation error on the title input if it has less than 3 characters on submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: 'a' } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('exercises.creation.form.fields.instructions.validation_rules.min_length'));
				});

				it('should trigger a "max_length" validation error on the title input if it has more than 300 characters on submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: 'a'.repeat(301) } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('exercises.creation.form.fields.instructions.validation_rules.max_length'));
				});
			});

			describe('on change validation', () => {
				// We only check the requried validation rule since all validation rules are checked.
				it('should trigger a "required" validation error on the title input on change after the first submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: '' } });
						expect(container.textContent).not.toMatch(new RegExp('exercises.creation.form.fields.instructions.validation_rules.required'));
						fireEvent.click(submitButton);
						fireEvent.input(titleInput, { target: { value: 'a'.repeat(10) } });
						expect(container.textContent).not.toMatch(new RegExp('exercises.creation.form.fields.instructions.validation_rules.required'));

						fireEvent.input(titleInput, { target: { value: '' } });
					});

					expect(container.textContent).toMatch(new RegExp('exercises.creation.form.fields.instructions.validation_rules.required'));
				});
			});
		});

		describe('explanation textarea validation', () => {
			let descriptionTextarea;
			let submitButton;
			let container;
			let mockedOnSubmit;

			beforeEach(() => {
				mockedOnSubmit = jest.fn();
				container = render(<ExerciseCreationForm onSubmit={mockedOnSubmit} />).container;
				descriptionTextarea = container.querySelector('textarea[name="explanation"]');
				submitButton = container.querySelector('button[type="submit"]');
			});

			describe('on submit validation', () => {
				it('should trigger a "max_length" validation error on the description textarea if it has more than 301 characters on submit', () => {
					act(() => {
						fireEvent.input(descriptionTextarea, { target: { value: 'a'.repeat(301) } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('exercises.creation.form.fields.explanation.validation_rules.max_length'));
				});
			});
		});
	});

	describe('onSubmit', () => {
		it('should call the onSubmit prop method with the form\'s inputs\' values.', async () => {
			const mockedOnSubmit = jest.fn((data) => Promise.resolve(data));
			const { container } = render(<ExerciseCreationForm onSubmit={mockedOnSubmit} />);

			const expectedFormData = {
				statement: 'dummy lesson instructions',
				explanation: 'dummy lesson explanation',
				type: 'SingleChoice',
				answers: [
					{
						text: 'answer1',
						valid: true,
					},
					{
						text: 'answer2',
						valid: false,
					},
					{
						text: 'answer3',
						valid: false,
					},
				],
			};

			await act(async () => {
				await fireEvent.input(container.querySelector('textarea[name="instructions"]'), { target: { value: expectedFormData.statement } });
				await fireEvent.input(container.querySelector('textarea[name="explanation"]'), { target: { value: expectedFormData.explanation } });
				await fireEvent.input(container.querySelector('input[name="answer1"]'), { target: { value: expectedFormData.answers[0].text } });
				await fireEvent.input(container.querySelector('input[name="answer2"]'), { target: { value: expectedFormData.answers[1].text } });
				await fireEvent.input(container.querySelector('input[name="answer3"]'), { target: { value: expectedFormData.answers[2].text } });

				await fireEvent.click(container.querySelector('button[type="submit"]'));
			});

			expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
			expect(mockedOnSubmit).toHaveBeenCalledWith(expectedFormData);
		});
	});
});
