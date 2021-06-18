import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { NavigationSidebar } from 'components/content';

describe('NavigationSidebar', () => {
	const mockStore = configureMockStore([thunk]);
	let store;

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	it('should match previous snapshot with no item returned from the selector', () => {
		store = mockStore({});
		const sut = (
			<Provider store={store}>
				<NavigationSidebar />
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot with items returned from the selector', () => {
		store = mockStore({
			subjects: {
				id: 'dummy_subject_id',
				title: 'dummy_subject_title',
				description: 'dummy_subject_description',
			},
		});

		const sut = (
			<Provider store={store}>
				<NavigationSidebar />
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot with the contentCreationOptions param', () => {
		store = mockStore({
			subjects: {
				id: 'dummy_subject_id',
				title: 'dummy_subject_title',
				description: 'dummy_subject_description',
				modules: [
					{
						id: 'dummy_module_id',
						subjectId: 'dummy_subject_id',
						title: 'dummy_module_title',
						description: 'dummy_module_description',
					},
				],
			},
		});

		const contentCreationOptions = {
			contentType: 'module',
			parentId: 'dummy_subject_id',
		};

		const sut = (
			<Provider store={store}>
				<NavigationSidebar contentCreationOptions={contentCreationOptions} />
			</Provider>
		);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
