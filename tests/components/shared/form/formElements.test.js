import { shallow } from 'enzyme';

import {
	LabeledCheckbox,
} from 'components/shared/form';

describe('Exported form elements', () => {
	describe('LabeledCheckbox', () => {
		it('should match previous snapshot', () => {
			const sut = (<LabeledCheckbox id="lcb">Primary button</LabeledCheckbox>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot for checked state', () => {
			const sut = (<LabeledCheckbox checked id="lcb">Primary button</LabeledCheckbox>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot for disabled state', () => {
			const sut = (<LabeledCheckbox disabled id="lcb">Primary button</LabeledCheckbox>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot for checked and disabled states', () => {
			const sut = (<LabeledCheckbox disabled checked id="lcb">Primary button</LabeledCheckbox>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});
});
