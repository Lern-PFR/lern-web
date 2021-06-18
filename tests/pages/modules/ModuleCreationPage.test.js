import { mount, shallow } from 'enzyme';
import { ModuleCreationPage } from 'pages/modules';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';
import { baseUrl } from 'lib/shared/http';

import RouterProvider from 'routes/components/RouterProvider';
import { ActionTypes as SubjectsActionTypes } from 'redux/actions/subjects';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunk]);

describe('Module edition page', () => {
	let store;

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ subjectId: '1' });
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('Snapshot testing', () => {
		it('should match previous snapshot', () => {
			store = mockStore({ subjects: { all: [{ id: '1', title: 'dummy subject title', description: 'dummy subject desc' }] } });

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<ModuleCreationPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchSubject action creator on mount', () => {
			const httpResponse = {
				status: 200,
				body: { id: 1, name: 'subject_name' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/subjects/1`, httpResponse);

			mount(
				<Provider store={store}>
					<RouterProvider>
						<ModuleCreationPage />
					</RouterProvider>
				</Provider>
			);

			expect(store.getActions()).toContainEqual({ type: SubjectsActionTypes.FETCH_SUBJECT_REQUEST });
		});
	});
});
