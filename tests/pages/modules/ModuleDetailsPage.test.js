import { mount, shallow } from 'enzyme';
import { ModuleDetailsPage } from 'pages/modules';
import { ActionTypes as NotionsActionTypes } from 'redux/actions/notions';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import RouterProvider from 'routes/components/RouterProvider';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('ModuleDetailsPage', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should match previous snapshot', () => {
		const sut = (
			<Provider store={store}>
				<RouterProvider>
					<ModuleDetailsPage
						dispatchFetchModuleList={jest.fn()}
						moduleId="1"
						module={{
							name: 'Test module 1',
							description: 'a test module description',
							subjectId: '1',
						}}
						notions={[]}
					/>
				</RouterProvider>
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the fetchNotionListByModuleId action creator on mount', () => {
		const ownProps = { match: { params: { id: 1 } } };

		mount(
			<Provider store={store}>
				<RouterProvider>
					<ModuleDetailsPage
						subjectId="1"
						module={{
							name: 'Test module 1',
							description: 'a test module description',
							subjectId: '1',
						}}
						notions={[]}
						{...ownProps}
					/>
				</RouterProvider>
			</Provider>
		);

		expect(store.getActions()).toContainEqual({ type: NotionsActionTypes.FETCH_NOTION_LIST_REQUEST });
	});

	it('should call the clearNotionList action creator on unmount', () => {
		const ownProps = { match: { params: { id: 1 } } };

		const wrapper = mount(
			<Provider store={store}>
				<RouterProvider>
					<ModuleDetailsPage
						subjectId="1"
						module={{
							name: 'Test module 1',
							description: 'a test module description',
							subjectId: '1',
						}}
						notions={[]}
						{...ownProps}
					/>
				</RouterProvider>
			</Provider>
		);

		act(() => {
			wrapper.unmount();
		});

		expect(store.getActions()).toContainEqual({ type: NotionsActionTypes.CLEAR_NOTION_LIST });
	});
});
