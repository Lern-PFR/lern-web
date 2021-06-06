import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import RouterProvider from 'routes/components/RouterProvider';
import thunk from 'redux-thunk';

import { SignInPage } from 'pages/auth';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('Sign in page', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should match previous snapshot', () => {
		const sut = (
			<Provider store={store}>
				<RouterProvider>
					<SignInPage />
				</RouterProvider>
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
