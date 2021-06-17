import { shallow } from 'enzyme';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Router, StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import SubjectModuleListItem from 'components/content/SubjectModuleListItem';

import { ActionTypes } from 'redux/actions/modules';
import { createMemoryHistory } from 'history';
import routes from 'routes';

describe('Subject edition page - module list', () => {
	const mockStore = configureMockStore([thunk]);
	const store = mockStore({});
	const mockedModule = { id: 'dummy_module_id_1', title: 'dummy_module_title_1', description: 'dummy_module_desc_1' };

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('snapshots', () => {
		it('should match previous snapshot', () => {
			const sut = (
				<Provider store={store}>
					<SubjectModuleListItem {...mockedModule} />
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('onClick events', () => {
		it('should dispatch a module deletion request action upon click on the module card\'s delete button.', () => {
			render(
				<StaticRouter>
					<Provider store={store}>
						<SubjectModuleListItem {...mockedModule} />
					</Provider>
				</StaticRouter>
			);

			act(() => {
				fireEvent.click(screen.getByText('subjects.edition.modules_list.links.delete'));
			});

			expect(store.getActions()).toEqual([{ type: ActionTypes.DELETE_MODULE_REQUEST }]);
		});

		it('should redirect to the module\'s edition page url upon click on the card\'s edit button.', () => {
			const history = createMemoryHistory();

			render(
				<Router history={history}>
					<Provider store={store}>
						<SubjectModuleListItem {...mockedModule} />
					</Provider>
				</Router>
			);

			act(() => {
				fireEvent.click(screen.getByText('subjects.edition.modules_list.links.edit'));
			});

			expect(history.location.pathname).toEqual(routes.modules.moduleEdition.replace(':moduleId', mockedModule.id));
		});
	});
});
