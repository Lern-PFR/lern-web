import { render } from 'react-dom';
import { Provider } from 'react-redux';
import RouterProvider from 'routes/components/RouterProvider';
import RouteProvider from 'routes/components/RouteProvider';

import 'lib/shared/i18n';
import configureStore from './redux/store/configureStore';

const store = configureStore();

/**
 * @name renderApp
 * @description Renders the root of the application inside the browser's DOM.
 */
const renderApp = () => (
	render(
		<Provider store={store}>
			<RouterProvider>
				<RouteProvider />
			</RouterProvider>
		</Provider>,
		document.getElementById('root')
	)
);

renderApp();
