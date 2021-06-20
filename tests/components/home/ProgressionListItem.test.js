import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ProgressionListItem from 'components/home/ProgressionListItem';

describe('ProgressionListItem', () => {
	const mockStore = configureMockStore([thunk]);

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	it('should match previous snapshot for progression within a single module', () => {
		const store = mockStore({
			modules: [
				{
					id: 'abcd',
					title: 'dummy module',
					description: 'dummy description',
					subjectId: 'zxcv',
					concepts: [
						{
							id: 'qwer',
							title: 'dummy concept',
							moduleId: 'abcd',
							order: 0,
						},
						{
							id: 'asdf',
							title: 'dummy concept',
							moduleId: 'abcd',
							order: 1,
						},
					],
				},
			],
		});
		const progression = {
			subject: {
				id: 'zxcv',
				title: 'dummy subject',
				description: 'dummy description',
				modules: [
					{
						id: 'abcd',
						title: 'dummy module',
						description: 'dummy description',
						subjectId: 'zxcv',
						concepts: [
							{
								id: 'qwer',
								title: 'dummy concept',
								moduleId: 'abcd',
								order: 0,
							},
							{
								id: 'asdf',
								title: 'dummy concept',
								moduleId: 'abcd',
								order: 1,
							},
						],
					},
				],
			},
			concept: {
				id: 'qwer',
				title: 'dummy concept',
				moduleId: 'abcd',
			},
			completion: 67,
			updatedAt: '2021-06-20T09:33:20.626274',
		};

		const sut = (
			<Provider store={store}>
				<ProgressionListItem {...progression} />
			</Provider>
		);
		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for progression spanning two modules', () => {
		const store = mockStore({
			modules: [
				{
					id: 'abcd',
					title: 'dummy module',
					description: 'dummy description',
					subjectId: 'zxcv',
					concepts: [
						{
							id: 'qwer',
							title: 'dummy concept',
							moduleId: 'abcd',
							order: 0,
						},
						{
							id: 'asdf',
							title: 'dummy concept',
							moduleId: 'abcd',
							order: 1,
						},
					],
				},
				{
					id: 'efgh',
					title: 'dummy module',
					description: 'dummy description',
					subjectId: 'zxcv',
					concepts: [
						{
							id: 'ghjk',
							title: 'dummy concept',
							moduleId: 'efgh',
							order: 0,
						},
						{
							id: 'yuio',
							title: 'dummy concept',
							moduleId: 'efgh',
							order: 1,
						},
					],
				},
			],
		});
		const progression = {
			subject: {
				id: 'zxcv',
				title: 'dummy subject',
				description: 'dummy description',
				modules: [
					{
						id: 'abcd',
						title: 'dummy module',
						description: 'dummy description',
						subjectId: 'zxcv',
						concepts: [
							{
								id: 'qwer',
								title: 'dummy concept',
								moduleId: 'abcd',
								order: 0,
							},
							{
								id: 'asdf',
								title: 'dummy concept',
								moduleId: 'abcd',
								order: 1,
							},
						],
					},
					{
						id: 'efgh',
						title: 'dummy module',
						description: 'dummy description',
						subjectId: 'zxcv',
						concepts: [
							{
								id: 'ghjk',
								title: 'dummy concept',
								moduleId: 'efgh',
								order: 0,
							},
							{
								id: 'yuio',
								title: 'dummy concept',
								moduleId: 'efgh',
								order: 1,
							},
						],
					},
				],
			},
			concept: {
				id: 'asdf',
				title: 'dummy concept',
				moduleId: 'abcd',
			},
			completion: 67,
			updatedAt: '2021-06-20T09:33:20.626274',
		};

		const sut = (
			<Provider store={store}>
				<ProgressionListItem {...progression} />
			</Provider>
		);
		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for progression within the last concept of the last module', () => {
		const store = mockStore({
			modules: [
				{
					id: 'abcd',
					title: 'dummy module',
					description: 'dummy description',
					subjectId: 'zxcv',
					concepts: [
						{
							id: 'qwer',
							title: 'dummy concept',
							moduleId: 'abcd',
							order: 0,
						},
						{
							id: 'asdf',
							title: 'dummy concept',
							moduleId: 'abcd',
							order: 1,
						},
					],
				},
			],
		});
		const progression = {
			subject: {
				id: 'zxcv',
				title: 'dummy subject',
				description: 'dummy description',
				modules: [
					{
						id: 'abcd',
						title: 'dummy module',
						description: 'dummy description',
						subjectId: 'zxcv',
						concepts: [
							{
								id: 'qwer',
								title: 'dummy concept',
								moduleId: 'abcd',
								order: 0,
							},
							{
								id: 'asdf',
								title: 'dummy concept',
								moduleId: 'abcd',
								order: 1,
							},
						],
					},
				],
			},
			concept: {
				id: 'asdf',
				title: 'dummy concept',
				moduleId: 'abcd',
			},
			completion: 67,
			updatedAt: '2021-06-20T09:33:20.626274',
		};

		const sut = (
			<Provider store={store}>
				<ProgressionListItem {...progression} />
			</Provider>
		);
		const wrapper = mount(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
