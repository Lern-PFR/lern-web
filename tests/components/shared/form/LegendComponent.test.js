import { shallow } from 'enzyme';
import LegendComponent from 'components/shared/form/LegendComponent';
import { cleanup } from '@testing-library/react';

describe('LegendComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<LegendComponent>Test legend</LegendComponent>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
