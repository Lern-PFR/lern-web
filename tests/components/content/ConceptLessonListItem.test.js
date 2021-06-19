import { shallow } from 'enzyme';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Router, StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConceptLessonListItem from 'components/content/ConceptLessonListItem';

import { ActionTypes } from 'redux/actions/lessons';
import { createMemoryHistory } from 'history';
import routes from 'routes';

describe('Concept edition page - lesson list item', () => {
	const mockStore = configureMockStore([thunk]);
	const store = mockStore({});
	const mockedLesson = { id: 'dummy_lesson_id_1', title: 'dummy_lesson_title_1', description: 'dummy_lesson_desc_1' };

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('snapshots', () => {
		it('should match previous snapshot', () => {
			const sut = (
				<Provider store={store}>
					<ConceptLessonListItem {...mockedLesson} conceptId="1" />
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('onClick events', () => {
		it('should dispatch a lesson deletion request action upon click on the lesson card\'s delete button.', () => {
			render(
				<StaticRouter>
					<Provider store={store}>
						<ConceptLessonListItem {...mockedLesson} conceptId="1" />
					</Provider>
				</StaticRouter>
			);

			act(() => {
				fireEvent.click(screen.getByText('concepts.edition.lessons_list.links.delete'));
			});

			expect(store.getActions()).toEqual([{ type: ActionTypes.DELETE_LESSON_REQUEST }]);
		});

		it('should redirect to the lesson\'s edition page url upon click on the card\'s edit button.', () => {
			const history = createMemoryHistory();

			render(
				<Router history={history}>
					<Provider store={store}>
						<ConceptLessonListItem {...mockedLesson} conceptId="1" />
					</Provider>
				</Router>
			);

			act(() => {
				fireEvent.click(screen.getByText('concepts.edition.lessons_list.links.edit'));
			});

			expect(history.location.pathname).toEqual(routes.lessons.lessonEdition.replace(':lessonId', mockedLesson.id));
		});
	});
});
