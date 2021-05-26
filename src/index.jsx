import { render } from 'react-dom';
import { Provider } from 'react-redux';
import RouterProvider from 'routes/components/RouterProvider';
import RouteProvider from 'routes/components/RouteProvider';
import { MainLayout } from 'components/shared/layout';

import 'lib/shared/i18n';
import configureStore from './redux/store/configureStore';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const store = configureStore();

/**
 * @name Root
 * @description The root of the application inside the browser's DOM.
 */
const Root = () => (
	<Provider store={store}>
		<RouterProvider>
			<MainLayout>
				<RouteProvider />
			</MainLayout>
		</RouterProvider>
	</Provider>
);

render(<Root />, document.getElementById('root'));
