import { shallow } from 'enzyme';
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
});
