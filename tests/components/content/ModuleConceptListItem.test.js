import { shallow } from 'enzyme';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Router, StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ModuleConceptListItem from 'components/content/ModuleConceptListItem';

import { ActionTypes } from 'redux/actions/concepts';
import { createMemoryHistory } from 'history';
import routes from 'routes';

describe('Module edition page - concept list item', () => {
	const mockStore = configureMockStore([thunk]);
	const store = mockStore({});
	const mockedConcept = { id: 'dummy_concept_id_1', title: 'dummy_concept_title_1', description: 'dummy_concept_desc_1' };

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('snapshots', () => {
		it('should match previous snapshot', () => {
			const sut = (
				<Provider store={store}>
					<ModuleConceptListItem {...mockedConcept} subjectId="1" />
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('onClick events', () => {
		it('should dispatch a concept deletion request action upon click on the concept card\'s delete button.', () => {
			render(
				<StaticRouter>
					<Provider store={store}>
						<ModuleConceptListItem {...mockedConcept} subjectId="1" />
					</Provider>
				</StaticRouter>
			);

			act(() => {
				fireEvent.click(screen.getByText('modules.edition.concepts_list.links.delete'));
			});

			expect(store.getActions()).toEqual([{ type: ActionTypes.DELETE_CONCEPT_REQUEST }]);
		});

		it('should redirect to the concept\'s edition page url upon click on the card\'s edit button.', () => {
			const history = createMemoryHistory();

			render(
				<Router history={history}>
					<Provider store={store}>
						<ModuleConceptListItem {...mockedConcept} subjectId="1" />
					</Provider>
				</Router>
			);

			act(() => {
				fireEvent.click(screen.getByText('modules.edition.concepts_list.links.edit'));
			});

			expect(history.location.pathname).toEqual(routes.concepts.conceptEdition.replace(':conceptId', mockedConcept.id));
		});
	});
});
