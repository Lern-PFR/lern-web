import { shallow } from 'enzyme';
import Sidebar from 'components/home/Sidebar';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Sidebar', () => {
	const mockStore = configureMockStore([thunk]);
	const store = mockStore({});

	it('should match previous snapshot', () => {
		const sut = (
			<Provider store={store}>
				<Sidebar />
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
