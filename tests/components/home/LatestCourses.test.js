import { mount } from 'enzyme';
import LatestCourses from 'components/home/LatestCourses';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('LatestCourses', () => {
	const mockStore = configureMockStore([thunk]);

	it('should match previous snapshot for empty latestCourses.active list', () => {
		const store = mockStore({
			subjects: {
				all: [],
				active: [],
				mine: [],
				available: [],
			},
		});
		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<LatestCourses />
				</StaticRouter>
			</Provider>
		);
		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for non-empty latestCourses.active list', () => {
		const store = mockStore({
			subjects: {
				all: [],
				active: [
					{
						id: 'abcd',
						title: 'dummy title',
						description: 'dummy description',
					},
				],
				mine: [],
				available: [],
			},
		});
		const sut = (
			<Provider store={store}>
				<StaticRouter>
					<LatestCourses />
				</StaticRouter>
			</Provider>
		);
		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
