import { mount, shallow } from 'enzyme';
import DynamicTextComponent from 'components/shared/typography/DynamicTextComponent';

describe ('DynamicTextComponent', () => {
	it('should match previous snapshot', () => {
		const sut = (<DynamicTextComponent>Hello, world!</DynamicTextComponent>);
		const wrapper = shallow(sut);
		
		expect(wrapper).toMatchSnapshot();
	});

	it('should render as paragraph HTML element if no tag is provided', () => {
		const sut = (<DynamicTextComponent>Hello, world!</DynamicTextComponent>);
		const wrapper = mount(sut);

		expect(wrapper.find('DynamicTextComponent').html())
			.toMatch(new RegExp('<p class=".*.">Hello, world!</p>'));
	});

	it('should render use provided tag prop as HTML tag', () => {
		const sut = (<DynamicTextComponent tag="span">Hello, world!</DynamicTextComponent>);
		const wrapper = mount(sut);

		expect(wrapper.find('DynamicTextComponent').html())
			.toMatch(new RegExp('<span class=".*.">Hello, world!</span>'));
	});
});
