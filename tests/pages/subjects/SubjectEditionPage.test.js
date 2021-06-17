import { mount, shallow } from 'enzyme';
import { SubjectEditionPage } from 'pages/subjects';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import routeData from 'react-router';

import RouterProvider from 'routes/components/RouterProvider';
import { ActionTypes as SubjectsActionTypes } from 'redux/actions/subjects';

const mockStore = configureMockStore([thunk]);

describe('Subject edition page', () => {
	let store;

	beforeEach(() => {
		jest.spyOn(routeData, 'useParams').mockReturnValue({ subjectId: '1' });
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('Snapshot testing', () => {
		it('should match previous snapshot without the required subject in state', () => {
			store = mockStore({});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<SubjectEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with the required subject in state', () => {
			store = mockStore({ subjects: { all: [{ id: '1', title: 'dummy subject title', description: 'dummy subject desc' }] } });

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<SubjectEditionPage />
					</RouterProvider>
				</Provider>
			);

			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('dispatched method calls', () => {
		it('should call the fetchSubject action creator on mount', () => {
			mount(
				<Provider store={store}>
					<RouterProvider>
						<SubjectEditionPage />
					</RouterProvider>
				</Provider>
			);

			expect(store.getActions()).toContainEqual({ type: SubjectsActionTypes.FETCH_SUBJECT_REQUEST });
		});
	});
});
