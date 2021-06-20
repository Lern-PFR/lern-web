import { shallow } from 'enzyme';
import ResponseItem from 'components/content/ResponseItem';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ResponseItem', () => {
	afterEach(() => {
		cleanup();
	});

	it('should match previous snapshot', () => {
		const wrapper = shallow(<ResponseItem
			id="1"
			name="abcd"
			handleCheckedChanged={jest.fn()}
			handleChange={jest.fn()}
			handleBlur={jest.fn()}
			checked
			errorText=""
			hasPlaceholder
		/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call hendleCheckedChanged with input name when onChange is called', async () => {
		const mockedOnChange = jest.fn(() => {});
		const sut = (
			<ResponseItem
				id="1"
				name="rg"
				handleCheckedChanged={mockedOnChange}
				handleChange={jest.fn()}
				handleBlur={jest.fn()}
				errorText=""
				hasPlaceholder={false}
				checked={false}
			/>
		);
		render(sut);

		await act(async () => {
			userEvent.click(screen.getByRole('radio'));
		});

		expect(mockedOnChange).toHaveBeenCalledWith('rg');
	});
});
