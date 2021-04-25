import { shallow } from 'enzyme';
import FieldsetComponent from 'components/shared/form/FieldsetComponent';
import { LabeledCheckbox } from 'components/shared/form';
import { cleanup } from '@testing-library/react';

describe('FieldsetComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<FieldsetComponent title="Test fieldset">
			<LabeledCheckbox id="cb">Test checkbox</LabeledCheckbox>
		</FieldsetComponent>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});