import { Link as ReactRouterLink, StaticRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { Link } from 'components/shared/navigation';

describe('Link', () => {
	it('should match previoys snapshot', () => {
		const sut = <Link to="invalid_key">Hello, world!</Link>;
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should render with a ReactRouter Link', () => {
		const sut = <Link to="invalid_key">Hello, world!</Link>;
		const wrapper = mount(<StaticRouter>{sut}</StaticRouter>);

		expect(wrapper.containsMatchingElement(<ReactRouterLink to="invalid_key">Hello, world!</ReactRouterLink>)).toEqual(true);
	});
});
