import { shallow } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import NotionContentNavigator from 'components/notions/NotionDetailsPage/NotionContentNavigator';

describe('NotionContentNavigator', () => {
	const notionContent = [
		{ id: 0, name: 'test lesson 0', order: 0 },
		{ id: 1, name: 'test lesson 1', order: 1 },
		{ id: 2, name: 'test lesson 2', order: 2 },
		{ id: 3, title: 'test exercise 0', order: 3 },
		{ id: 4, name: 'test lesson 4', order: 4 },
	];

	it('should match previous snapshot', () => {
		const wrapper = shallow(<NotionContentNavigator currentDocOrder={0} notionContent={notionContent} redirectTo={jest.fn()} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should have the "previous" button disabled when the first document is displayed', () => {
		const redirectToSpy = jest.fn();
		render(<NotionContentNavigator currentDocOrder={0} notionContent={notionContent} redirectTo={redirectToSpy} />);
		fireEvent.click(screen.getByTestId('notion-navigatior-previous'));

		expect(redirectToSpy).toHaveBeenCalledTimes(0);
	});

	it('should have the "next" button disabled when the last document is displayed', () => {
		const redirectToSpy = jest.fn();
		render(<NotionContentNavigator currentDocOrder={4} notionContent={notionContent} redirectTo={redirectToSpy} />);
		fireEvent.click(screen.getByTestId('notion-navigatior-next'));

		expect(redirectToSpy).toHaveBeenCalledTimes(0);
	});

	it('should call the "redirectTo" method with the currentDocOrder - 1 when clicking on the "previous" button', () => {
		const redirectToSpy = jest.fn();
		render(<NotionContentNavigator currentDocOrder={3} notionContent={notionContent} redirectTo={redirectToSpy} />);
		fireEvent.click(screen.getByTestId('notion-navigatior-previous'));

		expect(redirectToSpy).toBeCalledTimes(1);
		expect(redirectToSpy).toHaveBeenCalledWith(2);
	});

	it('should call the "redirectTo" method with the currentDocOrder + 1 when clicking on the "next" button', () => {
		const redirectToSpy = jest.fn();
		render(<NotionContentNavigator currentDocOrder={3} notionContent={notionContent} redirectTo={redirectToSpy} />);
		fireEvent.click(screen.getByTestId('notion-navigatior-next'));

		expect(redirectToSpy).toBeCalledTimes(1);
		expect(redirectToSpy).toHaveBeenCalledWith(4);
	});
});
