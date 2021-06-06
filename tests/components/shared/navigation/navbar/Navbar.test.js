import { mount, shallow } from 'enzyme';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Navbar } from 'components/shared/navigation';
import { ActionTypes } from 'redux/actions/users';
import * as userSelector from 'redux/selectors/users';

const mockStore = configureMockStore([thunk]);

describe('Navbar', () => {
	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

	it('should match previous snapshot with no authenticated user', () => {
		const store = mockStore({});
		jest.spyOn(userSelector, 'getCurrentUser').mockReturnValue(undefined);

		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<Navbar />
				</StaticRouter>
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot with an authenticated user', () => {
		const currentUser = { id: 0, nickname: 'johnDoe' };
		const store = mockStore({ users: { currentUser } });

		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<Navbar />
				</StaticRouter>
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the getCurrentUser selector on mounting', () => {
		const currentUser = { id: 0, nickname: 'johnDoe' };
		const store = mockStore({ users: { currentUser } });
		const getCurrentUserSpy = jest.spyOn(userSelector, 'getCurrentUser');

		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<Navbar />
				</StaticRouter>
			</Provider>
		);
		mount(sut);

		expect(getCurrentUserSpy).toHaveBeenCalled();
	});

	it('should dispatch the logout actionCreator when clicking the logout button.', () => {
		const currentUser = { id: 0, nickname: 'johnDoe' };
		const store = mockStore({ users: { currentUser } });

		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<Navbar />
				</StaticRouter>
			</Provider>
		);
		render(sut);

		act(() => {
			fireEvent.click(screen.getByTestId('logout-btn'));
		});

		expect(store.getActions()).toContainEqual({ type: ActionTypes.LOGOUT_REQUEST });
	});
});
