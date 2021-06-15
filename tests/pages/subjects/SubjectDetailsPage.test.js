import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import RouterProvider from 'routes/components/RouterProvider';
import { SubjectDetailsPage } from 'pages/subjects';
import { ActionTypes as ModulesActionTypes } from 'redux/actions/modules';
import { ActionTypes as SubjectsActionTypes } from 'redux/actions/subjects';
import * as SubjectSelectors from 'redux/selectors/subjects';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('SubjectDetailsPage', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	it('should match previous snapshot', () => {
		const sut = (
			<Provider store={store}>
				<RouterProvider>
					<SubjectDetailsPage subjectId="1" />
				</RouterProvider>
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call the fetchSubject action creator on mount', () => {
		const ownProps = { match: { params: { subjectId: 1 } } };

		mount(
			<Provider store={store}>
				<RouterProvider>
					<SubjectDetailsPage subjectId="1" {...ownProps} />
				</RouterProvider>
			</Provider>
		);

		expect(store.getActions()).toContainEqual({ type: SubjectsActionTypes.FETCH_SUBJECT_REQUEST });
	});

	it('should call the fetchModuleListBySubjectId action creator on mount', () => {
		const ownProps = { match: { params: { subjectId: 1 } } };

		mount(
			<Provider store={store}>
				<RouterProvider>
					<SubjectDetailsPage subjectId="1" {...ownProps} />
				</RouterProvider>
			</Provider>
		);

		expect(store.getActions()).toContainEqual({ type: ModulesActionTypes.FETCH_MODULE_LIST_REQUEST });
	});

	it('should call the getSubjectById selector callback on mount.', () => {
		const selectorSpy = jest.spyOn(SubjectSelectors, 'getSubjectById').mockReturnValue({});

		const ownProps = { match: { params: { subjectId: 1 } } };

		selectorSpy.mockReset();

		mount(
			<Provider store={store}>
				<RouterProvider>
					<SubjectDetailsPage subjectId="1" {...ownProps} />
				</RouterProvider>
			</Provider>
		);

		expect(selectorSpy).toHaveBeenCalled();
	});

	it('should call the clearModuleList action creator on unmount', () => {
		const ownProps = { match: { params: { subjectId: 1 } } };

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
