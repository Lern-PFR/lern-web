import { mount, shallow } from 'enzyme';
import { ConceptCreationPage } from 'pages/concepts';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';
import { baseUrl } from 'lib/shared/http';

import RouterProvider from 'routes/components/RouterProvider';
import { ActionTypes as ModulesActionTypes } from 'redux/actions/modules';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunk]);

describe('Concept creation page', () => {
	const store = mockStore({
		subjects: {
			items: {
				all: [
					{
						id: 'dummy_subject_id',
						title: 'dummy subject title',
						description: 'dummy subject desc',
						modules: [{ id: 'dummy_module_id', title: 'dummy_module_title', description: 'dummy_module_desc', order: 0 }],
					},
				],
			},
		},
		modules: { items: [{ id: 'dummy_module_id', title: 'dummy_module_title', description: 'dummy_module_desc', subjectId: 'dummy_subject_id', order: 0 }] },
	});

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ moduleId: 'dummy_module_id' });
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('Snapshot testing', () => {
		it('should match previous snapshot', () => {
			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<ConceptCreationPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchModule action creator on mount', () => {
			const httpResponse = {
				status: 200,
				body: { id: 'dummy_module_id', title: 'dummy_module_title', subjectId: 'dummy_subject_id' },
				headers: { 'content-type': 'application/json' },
			};

			const subjectHttpResponse = {
				status: 200,
				body: { ...store?.subject?.items?.all?.[0] },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/subjects/dummy_subject_id`, subjectHttpResponse);
			fetchMock.get(`${baseUrl}/api/modules/dummy_module_id`, httpResponse);

			mount(
				<Provider store={store}>
					<RouterProvider>
						<ConceptCreationPage />
					</RouterProvider>
				</Provider>
			);

			expect(store.getActions()).toContainEqual({ type: ModulesActionTypes.FETCH_MODULE_REQUEST });
		});
	});
});
