import { shallow } from 'enzyme';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ModuleConceptList } from 'components/content';
import routes from 'routes';
import { history } from 'routes/components/RouterProvider';

describe('Module edition page - concept list', () => {
	const mockStore = configureMockStore([thunk]);
	const store = mockStore({});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	describe('snapshots', () => {
		it('should match previous snapshot with an empty moduleList prop', () => {
			const sut = (
				<Provider store={store}>
					<ModuleConceptList conceptList={[]} moduleId="1" subjectId="1" />
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match previous snapshot with a non-empty moduleList prop', () => {
			const mockedModuleList = [
				{ id: 'dummy_module_id_1', title: 'dummy_module_title_1', description: 'dummy_module_desc_1' },
				{ id: 'dummy_module_id_2', title: 'dummy_module_title_2', description: 'dummy_module_desc_2' },
				{ id: 'dummy_module_id_3', title: 'dummy_module_title_3', description: 'dummy_module_desc_3' },
			];

			const sut = (
				<Provider store={store}>
					<ModuleConceptList conceptList={mockedModuleList} moduleId="1" subjectId="1" />
				</Provider>
			);
			const wrapper = shallow(sut);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('onClick events', () => {
		it('should call history.push with the module creation route upon click on the module creation card.', () => {
			const historyPushSpy = jest.spyOn(history, 'push');
			render(
				<Provider store={store}>
					<ModuleConceptList conceptList={[]} moduleId="1" subjectId="1" />
				</Provider>
			);

			act(() => {
				fireEvent.click(screen.getByRole('listitem'));
			});

			expect(historyPushSpy).toHaveBeenCalledTimes(1);
			expect(historyPushSpy).toBeCalledWith(routes.modules.conceptCreation.replace(':moduleId', '1'));
		});
	});
});
