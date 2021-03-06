import { shallow } from 'enzyme';
import ConceptContentNavigatorStepper from 'components/concepts/conceptDetailsPage/ConceptContentNavigatorStepper';

describe('ConceptContentNavigatorStepper', () => {
	it('should match previous snapshot', () => {
		const wrapper = shallow(<ConceptContentNavigatorStepper label="test" onClick={jest.fn()} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot (with isCurrent prop set to true)', () => {
		const wrapper = shallow(<ConceptContentNavigatorStepper label="test" onClick={jest.fn()} isCurrent />);
		expect(wrapper).toMatchSnapshot();
	});
});
