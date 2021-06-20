import { shallow } from 'enzyme';
import { HomepageAuth } from 'components/home';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('HomepageAuth', () => {
	const mockStore = configureMockStore([thunk]);
	const store = mockStore({});

	it('should match previous snapshot', () => {
		const sut = (
			<Provider store={store}>
				<HomepageAuth />
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
