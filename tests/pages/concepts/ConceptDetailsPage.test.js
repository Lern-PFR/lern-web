import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';
import fetchMock from 'fetch-mock';

import RouterProvider from 'routes/components/RouterProvider';
import { ActionTypes as ConceptActionTypes } from 'redux/actions/concepts';

import { ConceptDetailsPage } from 'pages/concepts';
import { baseUrl } from 'lib/shared/http';

describe('Concept details page', () => {
	const mockStore = configureMockStore([thunk]);
	let store;

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ conceptId: 'dummy_concept_id' });
		store = mockStore({
			concepts: {
				items: [
					{
						id: 'dummy_concept_id',
						title: 'dummy concept title',
						description: 'dummy concept desc',
						moduleId: 'dummy_module_id',
						lessons: [
							{
								id: 'dummy_lesson_id',
								title: 'dummy_lesson_title',
								description: 'dummy_lesson_desc',
								content: 'dummy_lesson_content',
								conceptId: 'dummy_concept_id',
								order: 0,
							},
						],
					},
				],
			},
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('Snapshot testing', () => {
		it('should match previous snapshot without the required concept in state', () => {
			store = mockStore({});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<ConceptDetailsPage />
					</RouterProvider>
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with the required concept in state', () => {
			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<ConceptDetailsPage />
					</RouterProvider>
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchConcept action creator on mount', () => {
			const httpResponse = {
				status: 200,
				body: { id: 'dummy_concept_id', title: 'dummy_concept_title', description: 'dummy_concept_description', moduleId: 'dummy_module_id' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/concepts/dummy_concept_id`, httpResponse);

			mount(
				<Provider store={store}>
					<RouterProvider>
						<ConceptDetailsPage />
					</RouterProvider>
				</Provider>
			);

			expect(store.getActions()).toContainEqual({ type: ConceptActionTypes.FETCH_CONCEPT_REQUEST });
		});
	});
});
