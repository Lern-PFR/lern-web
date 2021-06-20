import { shallow } from 'enzyme';
import SubjectListItem from 'components/home/SubjectListItem';

describe('SubjectListItem', () => {
	it('should match previous snapshot', () => {
		const wrapper = shallow(<SubjectListItem id="abcd" title="dummy title" description="dummy description" />);

		expect(wrapper).toMatchSnapshot();
	});
});
