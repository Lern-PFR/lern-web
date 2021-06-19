import { shallow } from 'enzyme';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ConceptLessonList } from 'components/content';
import routes from 'routes';
import { history } from 'routes/components/RouterProvider';

describe('Concept edition page - lesson list', () => {
	const mockStore = configureMockStore([thunk]);
	const store = mockStore({});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('snapshots', () => {
		it('should match previous snapshot with an empty lessonList prop', () => {
			const sut = (
				<Provider store={store}>
					<ConceptLessonList lessonList={[]} conceptId="1" />
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with a non-empty moduleList prop', () => {
			const mockedLessonList = [
				{ id: 'dummy_lesson_id_1', title: 'dummy_lesson_title_1', description: 'dummy_lesson_desc_1' },
				{ id: 'dummy_lesson_id_2', title: 'dummy_lesson_title_2', description: 'dummy_lesson_desc_2' },
				{ id: 'dummy_lesson_id_3', title: 'dummy_lesson_title_3', description: 'dummy_lesson_desc_3' },
			];

			const sut = (
				<Provider store={store}>
					<ConceptLessonList lessonList={mockedLessonList} conceptId="1" />
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('onClick events', () => {
		it('should call history.push with the lesson creation route upon click on the lesson creation card.', () => {
			const historyPushSpy = jest.spyOn(history, 'push');
			render(
				<Provider store={store}>
					<ConceptLessonList lessonList={[]} conceptId="1" />
				</Provider>
			);

			act(() => {
				fireEvent.click(screen.getByRole('listitem'));
			});

			expect(historyPushSpy).toHaveBeenCalledTimes(1);
			expect(historyPushSpy).toBeCalledWith(routes.concepts.lessonCreation.replace(':conceptId', '1'));
		});
	});
});
