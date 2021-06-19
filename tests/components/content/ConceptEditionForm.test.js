import { shallow } from 'enzyme';
import { ConceptEditionForm } from 'components/content';
import { act, fireEvent, render } from '@testing-library/react';

describe('Concept edition form', () => {
	const mockedConceptOrderOptions = [
		{ label: 0, value: 0 },
		{ label: 1, value: 1 },
		{ label: 2, value: 2 },
	];

	const mockedConcept = {
		id: 'dummy_concept_id',
		title: 'dummy_concept_title',
		description: 'dummy_concept_description',
		moduleId: 'dummy_module_id',
		order: 0,
	};

	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

	describe('Snapshot testing', () => {
		const wrapper = shallow(<ConceptEditionForm onSubmit={jest.fn()} concept={mockedConcept} conceptOrderOptions={mockedConceptOrderOptions} />);

		expect(wrapper).toMatchSnapshot();
	});

	// @TODO: implement test for the "order" select input.
	describe('Form inputs', () => {
		it('should contain a "title" text input.', () => {
			const { container } = render(<ConceptEditionForm onSubmit={jest.fn()} concept={mockedConcept} conceptOrderOptions={mockedConceptOrderOptions} />);
			expect(container.querySelector('input[name="title"]')).not.toEqual(null);
		});

		it('should contain a "description" textarea.', () => {
			const { container } = render(<ConceptEditionForm onSubmit={jest.fn()} concept={mockedConcept} conceptOrderOptions={mockedConceptOrderOptions} />);
			expect(container.querySelector('textarea[name="description"]')).not.toEqual(null);
		});
	});

	describe('Form inputs validation', () => {
		describe('title input validation', () => {
			let titleInput;
			let submitButton;
			let container;
			let mockedOnSubmit;

			beforeEach(() => {
				mockedOnSubmit = jest.fn();
				container = render(<ConceptEditionForm onSubmit={mockedOnSubmit} concept={mockedConcept} conceptOrderOptions={mockedConceptOrderOptions} />).container;
				titleInput = container.querySelector('input[name="title"]');
				submitButton = container.querySelector('button[type="submit"]');
			});

			describe('on submit validation', () => {
				it('should trigger a "required" validation error on the title input if it is empty on submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: '' } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.title.validation_rules.required'));
				});

				it('should trigger a "min_length" validation error on the title input if it has less than 3 characters on submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: 'a' } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.title.validation_rules.min_length'));
				});

				it('should trigger a "max_length" validation error on the title input if it has more than 50 characters on submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: 'a'.repeat(51) } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.title.validation_rules.max_length'));
				});
			});

			describe('on change validation', () => {
				// We only check the requried validation rule since all validation rules are checked.
				it('should trigger a "required" validation error on the title input on change after the first submit', () => {
					act(() => {
						fireEvent.input(titleInput, { target: { value: '' } });
						expect(container.textContent).not.toMatch(new RegExp('concepts.edition.form.fields.title.validation_rules.required'));
						fireEvent.click(submitButton);
						fireEvent.input(titleInput, { target: { value: 'a'.repeat(10) } });
						expect(container.textContent).not.toMatch(new RegExp('concepts.edition.form.fields.title.validation_rules.required'));

						fireEvent.input(titleInput, { target: { value: '' } });
					});

					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.title.validation_rules.required'));
				});
			});
		});

		describe('description textarea validation', () => {
			let descriptionTextarea;
			let submitButton;
			let container;
			let mockedOnSubmit;

			beforeEach(() => {
				mockedOnSubmit = jest.fn();
				container = render(<ConceptEditionForm onSubmit={mockedOnSubmit} concept={mockedConcept} conceptOrderOptions={mockedConceptOrderOptions} />).container;
				descriptionTextarea = container.querySelector('textarea[name="description"]');
				submitButton = container.querySelector('button[type="submit"]');
			});

			describe('on submit validation', () => {
				it('should trigger a "required" validation error on the description textarea if it is empty on submit', () => {
					act(() => {
						fireEvent.input(descriptionTextarea, { target: { value: '' } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.description.validation_rules.required'));
				});

				it('should trigger a "min_length" validation error on the description textarea if it has less than 10 characters on submit', () => {
					act(() => {
						fireEvent.input(descriptionTextarea, { target: { value: 'a' } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.description.validation_rules.min_length'));
				});

				it('should trigger a "max_length" validation error on the description textarea if it has more than 301 characters on submit', () => {
					act(() => {
						fireEvent.input(descriptionTextarea, { target: { value: 'a'.repeat(301) } });
						fireEvent.click(submitButton);
					});

					expect(mockedOnSubmit).not.toHaveBeenCalled();
					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.description.validation_rules.max_length'));
				});
			});

			describe('on change validation', () => {
				// We only check the requried validation rule since all validation rules are checked.
				it('should trigger a "required" validation error on the description input on change after the first submit', () => {
					act(() => {
						fireEvent.input(descriptionTextarea, { target: { value: '' } });
						expect(container.textContent).not.toMatch(new RegExp('concepts.edition.form.fields.description.validation_rules.required'));
						fireEvent.click(submitButton);
						fireEvent.input(descriptionTextarea, { target: { value: 'a'.repeat(10) } });
						expect(container.textContent).not.toMatch(new RegExp('concepts.edition.form.fields.description.validation_rules.required'));

						fireEvent.input(descriptionTextarea, { target: { value: '' } });
					});

					expect(container.textContent).toMatch(new RegExp('concepts.edition.form.fields.description.validation_rules.required'));
				});
			});
		});
	});

	describe('onSubmit', () => {
		it('should call the onSubmit prop method with the form\'s inputs\' values.', async () => {
			const mockedOnSubmit = jest.fn((data) => Promise.resolve(data));
			const { container } = render(<ConceptEditionForm onSubmit={mockedOnSubmit} concept={mockedConcept} conceptOrderOptions={mockedConceptOrderOptions} />);

			const expectedFormData = {
				title: 'updated dummy concept title',
				description: 'updated dummy concept description',
				order: 0,
			};

			await act(async () => {
				await fireEvent.input(container.querySelector('input[name="title"]'), { target: { value: expectedFormData.title } });
				await fireEvent.input(container.querySelector('textarea[name="description"]'), { target: { value: expectedFormData.description } });

				await fireEvent.click(container.querySelector('button[type="submit"]'));
			});

			expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
			expect(mockedOnSubmit).toHaveBeenCalledWith(expectedFormData);
		});
	});
});
