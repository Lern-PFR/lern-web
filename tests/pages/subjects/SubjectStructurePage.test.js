import { shallow } from 'enzyme';

import { SubjectStructurePage } from 'pages/subjects';

describe('SubjectDetailsPage', () => {
	it('should match previous snapshot', () => {
		const wrapper = shallow(<SubjectStructurePage />);

		expect(wrapper).toMatchSnapshot();
	});
});
