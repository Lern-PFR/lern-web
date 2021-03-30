import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

/**
 * @name history
 * @description The global history object, handling the navigation for the whole application
 *
 * @author Yann Hodiesne
 */
export const history = createBrowserHistory();

/**
 * @name RouterProvider
 * @description A component providing a Router from react-router, with the ability to export its history and block navigation
 *
 * @author Yann Hodiesne
 *
 * @param {*} children : The children to render inside the Router
 */
const RouterProvider = ({ children }) => (
	<Router history={history}>
		{children}
	</Router>
);

RouterProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RouterProvider;
