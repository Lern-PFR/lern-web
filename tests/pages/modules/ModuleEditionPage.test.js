import { mount, shallow } from 'enzyme';
import { ModuleEditionPage } from 'pages/modules';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';
import { baseUrl } from 'lib/shared/http';

import RouterProvider from 'routes/components/RouterProvider';
import { ActionTypes as ModulesActionTypes } from 'redux/actions/modules';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunk]);

describe('Module edition page', () => {
	let store;

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ moduleId: 'dummy_module_id' });
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('Snapshot testing', () => {
		it('should match previous snapshot without the required module in state', () => {
			store = mockStore({});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<ModuleEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with the required module and subject in state', () => {
			store = mockStore({
				subjects: {
					all: [{
						id: 'dummy_subject_id',
						title: 'dummy_subject_title',
						description: 'dummy_subject_desc',
						modules: [{
							id: 'dummy_module_id',
							title: 'dummy_module_title',
							description: 'dummy_subject_desc',
							subjectId: 'dummy_subject_id',
							order: 0,
						}],
					}],
				},
			});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<ModuleEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchModule action creator on mount', async () => {
			const subjectHttpResponse = {
				status: 200,
				body: { id: 'dummy_subject_id', name: 'subject_name' },
				headers: { 'content-type': 'application/json' },
			};

			const moduleHttpResponse = {
				status: 200,
				body: { id: 'dummy_module_id', name: 'modulet_name', subjectId: 'dummy_subject_id' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/modules/dummy_module_id`, moduleHttpResponse);
			fetchMock.get(`${baseUrl}/api/subjects/dummy_subject_id`, subjectHttpResponse);

			mount(
				<Provider store={store}>
					<RouterProvider>
						<ModuleEditionPage />
					</RouterProvider>
				</Provider>
			);

			const expectedActions = [
				{ type: ModulesActionTypes.FETCH_MODULE_REQUEST },
			];

			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
