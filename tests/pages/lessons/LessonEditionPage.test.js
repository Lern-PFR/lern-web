import { mount, shallow } from 'enzyme';
import { LessonEditionPage } from 'pages/lessons';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';
import { baseUrl } from 'lib/shared/http';

import { ActionTypes as LessonsActionTypes } from 'redux/actions/lessons';
import RouterProvider from 'routes/components/RouterProvider';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunk]);

describe('Lesson edition page', () => {
	let store;

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ lessonId: 'dummy_lesson_id' });
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('Snapshot testing', () => {
		it('should match previous snapshot without the required lesson in state', () => {
			store = mockStore({});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<LessonEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with the required lesson, module and subject in state', () => {
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
				lessons: [{
					id: 'dummy_lesson_id',
					title: 'dummy_lesson_title',
					description: 'dummy_lesson_desc',
					content: 'dummy_lesson_content',
					conceptId: 'dummy_concept_id',
					order: 0,
				}],
			});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<LessonEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchLesson action creator on mount', async () => {
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

			const lessonHttpResponse = {
				status: 200,
				body: {
					id: 'dummy_lesson_id',
					title: 'dummy_lesson_title',
					description: 'dummy_lesson_desc',
					content: 'dummy_lesson_content',
					conceptId: 'dummy_concept_id',
					order: 0,
				},
				headers: { 'content-type': 'application/json' },
			};

			fetchMock.get(`${baseUrl}/api/lessons/dummy_lesson_id`, lessonHttpResponse);
			fetchMock.get(`${baseUrl}/api/concepts/dummy_concept_id`, conceptHttpResponse);
			fetchMock.get(`${baseUrl}/api/modules/dummy_module_id`, moduleHttpResponse);
			fetchMock.get(`${baseUrl}/api/subjects/dummy_subject_id`, subjectHttpResponse);

			mount(
				<Provider store={store}>
					<RouterProvider>
						<LessonEditionPage />
					</RouterProvider>
				</Provider>
			);

			const expectedActions = [
				{ type: LessonsActionTypes.FETCH_LESSON_REQUEST },
			];

			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
