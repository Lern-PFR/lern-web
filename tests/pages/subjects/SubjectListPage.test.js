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

describe('SubjectListPage', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	it('should match previous snapshot', () => {
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
