import { shallow } from 'enzyme';
import { MemoryRouter, StaticRouter } from 'react-router';
import { MainLayout } from 'components/shared/layout';
import routes from 'routes';

describe('MainLayout', () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	it('should match previous snapshot', () => {
		const sut = (<StaticRouter><MainLayout><p>Hello, world!</p></MainLayout></StaticRouter>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot with no-padding requirement', () => {
		const sut = (<MemoryRouter initialEntries={[routes.subjects.subjectCreation]}><MainLayout><p>Hello, world!</p></MainLayout></MemoryRouter>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
