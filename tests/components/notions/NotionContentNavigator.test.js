import { shallow } from 'enzyme';
import NotionContentNavigator from 'components/notions/NotionDetailsPage/NotionContentNavigator';

describe('NotionContentNavigator', () => {
	const notionContent = [
		{ id: 0, name: 'test lesson 0', order: 0 },
		{ id: 1, name: 'test lesson 1', order: 1 },
		{ id: 2, name: 'test lesson 2', order: 2 },
		{ id: 3, title: 'test exercise 0', order: 3 },
		{ id: 4, name: 'test lesson 4', order: 4 },
	];

	it('should match previous snapshot', () => {
		const wrapper = shallow(<NotionContentNavigator notionContent={notionContent} redirectTo={jest.fn()} />);
		expect(wrapper).toMatchSnapshot();
	});
});
