import { shallow } from 'enzyme';
import DynamicLinkButtonComponent from 'components/shared/buttons/DynamicLinkButtonComponent';
import { cleanup } from '@testing-library/react';

describe('DynamicLinkButtonComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<DynamicLinkButtonComponent>Test button</DynamicLinkButtonComponent>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<DynamicLinkButtonComponent disabled>Test button</DynamicLinkButtonComponent>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
