import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Homepage } from 'pages/home';

const mockStore = configureMockStore([thunk]);

describe('Homepage', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	it('should match previous snapshot for anonymous user homepage', () => {
		const store = mockStore({
			users: {
				currentUser: undefined,
			},
		});
		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<Homepage />
				</StaticRouter>
			</Provider>
		);
		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for authenticated user homepage', () => {
		const store = mockStore({
			users: {
				currentUser: {
					id: 'abcd',
					firstname: 'dummy firstname',
					lastname: 'dummy lastname',
				},
			},
		});
		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<Homepage />
				</StaticRouter>
			</Provider>
		);
		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
