import { shallow } from 'enzyme';
import { SubjectCreationPage } from 'pages/subjects';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import RouterProvider from 'routes/components/RouterProvider';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('Subject creation page', () => {
	it('should match previous snapshot.', () => {
		const sut = (
			<Provider store={store}>
				<RouterProvider>
					<SubjectCreationPage />
				</RouterProvider>
			</Provider>
		);

		const wrapper = shallow(sut);

		expect(wrapper).toMatchSnapshot();
	});
});
