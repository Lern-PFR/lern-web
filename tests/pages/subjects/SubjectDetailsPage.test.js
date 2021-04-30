import { mount, shallow } from 'enzyme';
import { SubjectDetailsPage } from 'pages/subjects';
import { ActionTypes as ModulesActionTypes } from 'redux/actions/modules';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import RouterProvider from 'routes/components/RouterProvider';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('SubjectDetailsPage', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should match previous snapshot', () => {
		const sut = (
			<Provider store={store}>
				<RouterProvider>
					<SubjectDetailsPage
						dispatchFetchModuleList={jest.fn()}
						subjectId="1"
						subject={{}}
						modules={[]}
						t={jest.fn()}
					/>
				</RouterProvider>
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the fetchModuleListBySubjectId action creator on mount', () => {
		const ownProps = { match: { params: { id: 1 } } };

		mount(
			<Provider store={store}>
				<RouterProvider>
					<SubjectDetailsPage
						subjectId="1"
						subject={{
							author: 'author McWriter',
							lastUpdate: 'today',
						}}
						modules={[]}
						{...ownProps}
					/>
				</RouterProvider>
			</Provider>
		);

		expect(store.getActions()).toContainEqual({ type: ModulesActionTypes.FETCH_MODULE_LIST_REQUEST });
	});

	it('should call the clearModuleList action creator on unmount', () => {
		const ownProps = { match: { params: { id: 1 } } };

		const wrapper = mount(
			<Provider store={store}>
				<RouterProvider>
					<SubjectDetailsPage
						subjectId="1"
						subject={{
							author: 'author McWriter',
							lastUpdate: 'today',
						}}
						modules={[]}
						{...ownProps}
					/>
				</RouterProvider>
			</Provider>
		);

		act(() => {
			wrapper.unmount();
		});

		expect(store.getActions()).toContainEqual({ type: ModulesActionTypes.CLEAR_MODULE_LIST });
	});
});
