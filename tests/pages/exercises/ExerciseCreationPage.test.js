import { mount, shallow } from 'enzyme';
import { ExerciseCreationPage } from 'pages/exercises';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';
import { baseUrl } from 'lib/shared/http';

import RouterProvider from 'routes/components/RouterProvider';
import { ActionTypes as LessonActionModules } from 'redux/actions/lessons';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunk]);

describe('Exercise creation page', () => {
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
		concepts: { items: [{ id: 'dummy_concept_id', title: 'dummy_concept_title', description: 'dummy_concept_desc', moduleId: 'dummy_module_id', order: 0 }] },
		lessons: { items: [{ id: 'dummy_lesson_id', title: 'dummy_lesson_title', description: 'dummy_lesson_desc', concept: 'dummy_concept_id', order: 0 }] },
	});

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ lessonId: 'dummy_lesson_id' });
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
						<ExerciseCreationPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchLesson action creator on mount', () => {
			const lessonHttpResponse = {
				status: 200,
				body: { id: 'dummy_lesson_id', title: 'dummy_lesson_title', description: 'dummy_lesson_desc', concept: 'dummy_concept_id', order: 0 },
				headers: { 'content-type': 'application/json' },
			};

			const conceptHttpResponse = {
				status: 200,
				body: { id: 'dummy_concept_id', title: 'dummy_concept_title', description: 'dummy_concept_desc', moduleId: 'dummy_module_id', order: 0 },
				headers: { 'content-type': 'application/json' },
			};

			const moduleHttpResponse = {
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
			fetchMock.get(`${baseUrl}/api/modules/dummy_module_id`, moduleHttpResponse);
			fetchMock.get(`${baseUrl}/api/concepts/dummy_concept_id`, conceptHttpResponse);
			fetchMock.get(`${baseUrl}/api/lessons/dummy_lesson_id`, lessonHttpResponse);

			mount(
				<Provider store={store}>
					<RouterProvider>
						<ExerciseCreationPage />
					</RouterProvider>
				</Provider>
			);

			expect(store.getActions()).toContainEqual({ type: LessonActionModules.FETCH_LESSON_REQUEST });
		});
	});
});
