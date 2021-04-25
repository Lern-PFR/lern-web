import { shallow } from 'enzyme';
import LabelComponent from 'components/shared/form/LabelComponent';
import { cleanup } from '@testing-library/react';

describe('LabelComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<LabelComponent>Test label</LabelComponent>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
