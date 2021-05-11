import { shallow } from 'enzyme';
import NotionList from 'components/modules/NotionList';

describe('NotionList', () => {
	it('should match previous snapshot', () => {
		const sut = (<NotionList notions={[]} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
