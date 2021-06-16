import { shallow } from 'enzyme';
import ConceptList from 'components/modules/ConceptList';

describe('ConceptList', () => {
	it('should match previous snapshot', () => {
		const sut = (<ConceptList concepts={[]} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
