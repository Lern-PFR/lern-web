import { shallow } from 'enzyme';
import { standard } from 'theme/buttonStyles';
import DynamicButtonComponent from 'components/shared/buttons/DynamicButtonComponent';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('DynamicButtonComponent', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const sut = (<DynamicButtonComponent>Test button</DynamicButtonComponent>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match previous snapshot for disabled state', () => {
		const sut = (<DynamicButtonComponent disabled>Test button</DynamicButtonComponent>);
		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});

	it('should use injected onClick method', async () => {
		const mockedOnClick = jest.fn(() => {});
		const sut = (<DynamicButtonComponent onClick={mockedOnClick} {...standard}>Test button</DynamicButtonComponent>);
		render(sut);

		await act(async () => {
			fireEvent.click(screen.getByRole('button'));
		});

		expect(mockedOnClick).toHaveBeenCalled();
	});
});
