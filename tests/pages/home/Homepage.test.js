import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { baseUrl } from 'lib/shared/http';
import { Homepage } from 'pages/home';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunk]);

describe('Homepage', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
		fetchMock.restore();
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

		const subjectList = {
			status: 200,
			body: {
				all: [],
				mine: [],
				active: [],
				available: [
					{
						id: 'abcd',
						title: 'dummy module',
						description: 'dummy description',
					},
				],
			},
			headers: { 'content-type': 'application/json' },
		};

		const progressionList = {
			status: 200,
			body: {
				subject: {
					id: 'abcd',
					title: 'dummy module',
					description: 'dummy description',
				},
				user: {
					id: 'abcd',
					nickname: 'dummy module',
					firstname: 'dummy description',
					lastname: 'dummy lastname',
				},
				concept: {
					id: 'abcd',
					title: 'dummy module',
					description: 'dummy description',
				},
			},
			headers: { 'content-type': 'application/json' },
		};

		fetchMock.get(`${baseUrl}/api/progression`, progressionList);
		fetchMock.get(`${baseUrl}/api/subjects`, subjectList);

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

		const subjectList = {
			status: 200,
			body: {
				all: [],
				mine: [],
				active: [],
				available: [
					{
						id: 'abcd',
						title: 'dummy module',
						description: 'dummy description',
					},
				],
			},
			headers: { 'content-type': 'application/json' },
		};

		const progressionList = {
			status: 200,
			body: {
				subject: {
					id: 'abcd',
					title: 'dummy module',
					description: 'dummy description',
				},
				user: {
					id: 'abcd',
					nickname: 'dummy module',
					firstname: 'dummy description',
					lastname: 'dummy lastname',
				},
				concept: {
					id: 'abcd',
					title: 'dummy module',
					description: 'dummy description',
				},
			},
			headers: { 'content-type': 'application/json' },
		};

		fetchMock.get(`${baseUrl}/api/progression`, progressionList);
		fetchMock.get(`${baseUrl}/api/subjects`, subjectList);

		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
