import { shallow } from 'enzyme';
import { Navbar } from 'components/shared/navigation';

describe('Navbar', () => {
	it('should match previous snapshot with no authentified user', () => {
		const sut = (<Navbar />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot with an authentified user', () => {
		const currentUser = { id: 0, nickname: 'johnDoe' };
		const sut = (<Navbar currentUser={currentUser} />);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
