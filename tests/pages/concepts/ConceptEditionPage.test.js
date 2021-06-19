import { mount, shallow } from 'enzyme';
import { ConceptEditionPage } from 'pages/concepts';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';
import { baseUrl } from 'lib/shared/http';

import { ActionTypes as ConceptsActionTypes } from 'redux/actions/concepts';
import RouterProvider from 'routes/components/RouterProvider';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunk]);

describe('Concept edition page', () => {
	let store;

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ conceptId: 'dummy_concept_id' });
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
						<ConceptEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with the required concept, module and subject in state', () => {
			store = mockStore({
				subjects: {
					all: [{
						id: 'dummy_subject_id',
						title: 'dummy_subject_title',
						description: 'dummy_subject_desc',
						modules: [{
							id: 'dummy_module_id',
							title: 'dummy_module_title',
							description: 'dummy_module_desc',
							subjectId: 'dummy_subject_id',
							order: 0,
							concepts: [{
								id: 'dummy_concept_id',
								title: 'dummy_concept_title',
								description: 'dummy_concept_desc',
								moduleId: 'dummy_module_id',
								order: 0,
							}],
						}],
					}],
				},
				modules: [{
					id: 'dummy_module_id',
					title: 'dummy_module_title',
					description: 'dummy_module_desc',
					subjectId: 'dummy_subject_id',
					order: 0,
					concepts: [{
						id: 'dummy_concept_id',
						title: 'dummy_concept_title',
						description: 'dummy_concept_desc',
						moduleId: 'dummy_module_id',
						order: 0,
					}],
				}],
				concepts: [{
					id: 'dummy_concept_id',
					title: 'dummy_concept_title',
					description: 'dummy_concept_desc',
					moduleId: 'dummy_module_id',
					order: 0,
				}],
			});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<ConceptEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchConcept action creator on mount', async () => {
			const subjectHttpResponse = {
				status: 200,
				body: { id: 'dummy_subject_id', name: 'dummy_subject_name' },
				headers: { 'content-type': 'application/json' },
			};

			const moduleHttpResponse = {
				status: 200,
				body: { id: 'dummy_module_id', name: 'dummy_module_name', subjectId: 'dummy_subject_id' },
				headers: { 'content-type': 'application/json' },
			};

			const conceptHttpResponse = {
				status: 200,
				body: { id: 'dummy_concept_id', name: 'dummy_concept_name', moduleId: 'dummy_module_id' },
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/concepts/dummy_concept_id`, conceptHttpResponse);
			fetchMock.get(`${baseUrl}/api/modules/dummy_module_id`, moduleHttpResponse);
			fetchMock.get(`${baseUrl}/api/subjects/dummy_subject_id`, subjectHttpResponse);

			mount(
				<Provider store={store}>
					<RouterProvider>
						<ConceptEditionPage />
					</RouterProvider>
				</Provider>
			);

			const expectedActions = [
				{ type: ConceptsActionTypes.FETCH_CONCEPT_REQUEST },
			];

			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
