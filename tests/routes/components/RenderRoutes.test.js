import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { RenderRoutes } from 'routes/components';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = {
	users: {
		currentUser: {
			superadmin: false,
		},
	},
};

describe('RenderRoutes', () => {
	let store;

	beforeEach(() => {
		store = mockStore({ ...initialStore });
	});

	it('should match previoys snapshot', () => {
		// Arrange

		/**
		 * Test component
		 */
		const component = () => <h1>Hello, world!</h1>;

		/**
		 * Not found component
		 */
		const notFoundComponent = () => <h2>Oh no.</h2>;

		const routes = [
			{
				path: '/',
				key: 'root',
				exact: true,
				component,
			},
			{
				path: '/app',
				key: 'app',
				routes: [
					{
						path: '/app',
						key: 'app_root',
						exact: true,
						component,
					},
					{
						path: '/app/page',
						key: 'app_page',
						exact: true,
						component,
					},
				],
			},
		];

		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<RenderRoutes fallback={notFoundComponent} redirectAnonymous="" redirectAuthenticated="" routes={routes} />
				</StaticRouter>
			</Provider>
		);

		const wrapper = mount(sut);

		// Assert
		expect(wrapper).toMatchSnapshot();
	});
});
