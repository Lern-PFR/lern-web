import { shallow } from 'enzyme';
import { PostSignupPage } from 'pages/auth';

describe('Post Sign-up page', () => {
	it('should match previous snapshot.', () => {
		const wrapper = shallow(<PostSignupPage />);

		expect(wrapper).toMatchSnapshot();
	});
});
