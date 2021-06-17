import { shallow } from 'enzyme';
import { Home } from 'react-feather';

import {
	PrimaryButton,
	PrimaryLinkButton,
	OutlinedButton,
	OutlinedLinkButton,
	StandardButton,
	SubtleButton,
	DropdownButton,
	DangerButton,
	IconButton,
	FloatingActionButton,
} from 'components/shared/buttons';

describe('Exported buttons elements', () => {
	describe('PrimaryButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<PrimaryButton>Primary button</PrimaryButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('PrimaryButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<PrimaryLinkButton>Primary Link button</PrimaryLinkButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('OutlinedButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<OutlinedButton>Outlined button</OutlinedButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('OutlinedLinkButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<OutlinedLinkButton>Outlined Link button</OutlinedLinkButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('StandardButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<StandardButton>Standard button</StandardButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('SubtleButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<SubtleButton>Subtle button</SubtleButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('DropdownButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<DropdownButton>Dropdown button</DropdownButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('DangerButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<DangerButton>Danger button</DangerButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('IconButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<IconButton><Home /></IconButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('FloatingActionButton', () => {
		it('should match previous snapshot', () => {
			const sut = (<FloatingActionButton><Home /></FloatingActionButton>);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});
});
