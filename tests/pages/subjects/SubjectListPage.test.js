import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import { SubjectListPage } from 'pages/subjects';
import * as SubjectSelectors from 'redux/selectors/subjects';
import { ActionTypes as SubjectActionTypes } from 'redux/actions/subjects';
import RouterProvider from 'routes/components/RouterProvider';
import { fireEvent, render, screen } from '@testing-library/react';

const mockStore = configureMockStore([thunk]);

describe('SubjectListPage', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('snapshot testing', () => {
		it('should match previous snapshot with active subjects', () => {
			const store = mockStore({
				subjects: {
					items: {
						all: [],
						active: [
							{ id: 0, author: { firstname: 'john', lastname: 'doe' }, title: 'test subject 0' },
							{ id: 1, author: { firstname: 'john', lastname: 'doe' }, title: 'test subject 1' },
						],
						available: [],
						mine: [],
					},
				},
			});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<SubjectListPage />
					</RouterProvider>
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with available subjects', () => {
			const store = mockStore({
				subjects: {
					items: {
						all: [],
						active: [],
						available: [
							{ id: 0, author: { firstname: 'john', lastname: 'doe' }, title: 'test subject 0' },
							{ id: 1, author: { firstname: 'john', lastname: 'doe' }, title: 'test subject 1' },
						],
						mine: [],
					},
				},
			});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<SubjectListPage />
					</RouterProvider>
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with subjects of which the current user is the creator', () => {
			const store = mockStore({
				subjects: {
					items: {
						all: [],
						active: [],
						available: [],
						mine: [
							{ id: 0, author: { firstname: 'john', lastname: 'doe' }, title: 'test subject 0' },
							{ id: 1, author: { firstname: 'john', lastname: 'doe' }, title: 'test subject 1' },
						],
					},
				},
			});

			const sut = (
				<Provider store={store}>
					<RouterProvider>
						<SubjectListPage />
					</RouterProvider>
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Redux link', () => {
		const store = mockStore({
			subjects: {
				items: {
					all: [],
					active: [],
					available: [],
					mine: [],
				},
			},
		});

		it('should call the fetchSubjectList action creator on mount', () => {
			mount(
				<Provider store={store}>
					<RouterProvider>
						<SubjectListPage />
					</RouterProvider>
				</Provider>
			);

			expect(store.getActions()).toContainEqual({ type: SubjectActionTypes.FETCH_SUBJECT_LIST_REQUEST });
		});

		it('should call the clearModuleList action creator on unmount', () => {
			const wrapper = mount(
				<Provider store={store}>
					<RouterProvider>
						<SubjectListPage />
					</RouterProvider>
				</Provider>
			);

			act(() => {
				wrapper.unmount();
			});

			expect(store.getActions()).toContainEqual({ type: SubjectActionTypes.CLEAR_SUBJECT_LIST });
		});

		it('should call the getSubjectsByTitleOrAuthor selector callback whenever the search input triggers an onChange event.', () => {
			const selectorSpy = jest.spyOn(SubjectSelectors, 'getSubjectsByTitleOrAuthor').mockReturnValue({
				active: [],
				available: [],
				mine: [],
			});

			render(
				<Provider store={store}>
					<RouterProvider>
						<SubjectListPage />
					</RouterProvider>
				</Provider>
			);

			selectorSpy.mockReset();

			act(() => {
				fireEvent.input(screen.getByRole('textbox'), { target: { value: 'test' } });
			});

			expect(selectorSpy).toHaveBeenCalledTimes(1);
		});
	});
});
