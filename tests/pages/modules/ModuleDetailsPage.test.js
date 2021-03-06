import { mount, shallow } from 'enzyme';
import { ModuleDetailsPage } from 'pages/modules';
import { ActionTypes as ConceptsActionTypes } from 'redux/actions/concepts';
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
					<ModuleDetailsPage />
				</RouterProvider>
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the fetchConceptListByModuleId action creator on mount', () => {
		mount(
			<Provider store={store}>
				<RouterProvider>
					<ModuleDetailsPage />
				</RouterProvider>
			</Provider>
		);

		expect(store.getActions()).toContainEqual({ type: ConceptsActionTypes.FETCH_CONCEPT_LIST_REQUEST });
	});

	it('should call the clearConceptList action creator on unmount', () => {
		const wrapper = mount(
			<Provider store={store}>
				<RouterProvider>
					<ModuleDetailsPage />
				</RouterProvider>
			</Provider>
		);

		act(() => {
			wrapper.unmount();
		});

		expect(store.getActions()).toContainEqual({ type: ConceptsActionTypes.CLEAR_CONCEPT_LIST });
	});
});
