import { mount, shallow } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import QuestionForm from 'components/notions/NotionDetailsPage/QuestionForm';

describe('QuestionForm', () => {
	const answers = [
		{ id: 1, text: 'answer 1', valid: false },
		{ id: 2, text: 'answer 2', valid: false },
		{ id: 3, text: 'answer 3', valid: true },
		{ id: 4, text: 'answer 4', valid: false },
	];

	it('should match previous snapshot', () => {
		const wrapper = shallow(<QuestionForm answers={answers} onSubmit={jest.fn()} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot (answer selected)', () => {
		const wrapper = mount(<QuestionForm answers={answers} onSubmit={jest.fn()} />);

		wrapper.find('input[type="checkbox"]').at(0).simulate('change', { target: { checked: true } });

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot (with singleChoice prop set to true)', () => {
		const wrapper = shallow(<QuestionForm answers={answers} onSubmit={jest.fn()} singleChoice />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot (with submittedAnswer prop)', () => {
		const wrapper = shallow(<QuestionForm answers={answers} onSubmit={jest.fn()} submittedAnswer={[answers[0].id]} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should not call the provided \'onSubmit\' method prop if provided with a defined, non-empty \'submittedAnswer\' prop array', () => {
		const onSubmit = jest.fn();
		render(<QuestionForm answers={answers} onSubmit={onSubmit} submittedAnswer={[answers[0].id]} />);

		fireEvent.click(screen.getByTestId('question-form-submit-btn'));

		expect(onSubmit).not.toHaveBeenCalled();
	});

	it('should call the provided \'onSubmit\' method prop with an array of all selected answers\' ids.', () => {
		const onSubmit = jest.fn();
		render(<QuestionForm answers={answers} singleChoice={false} onSubmit={onSubmit} />);

		fireEvent.click(screen.getAllByRole('checkbox')[0]);
		fireEvent.click(screen.getAllByRole('checkbox')[2]);
		fireEvent.click(screen.getByTestId('question-form-submit-btn'));

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledWith([answers[0].id, answers[2].id]);
	});
});
