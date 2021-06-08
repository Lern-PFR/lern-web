import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from 'pages/NotFound';
import { loginWithToken } from 'redux/actions/users';
import { getCurrentUser } from 'redux/selectors/users';
import { RenderRoutes } from '.';
import routes from '../routes';
import keys from '../keys';

/**
 * @name RouteProvider
 * @description A component providing react-router with all routes and fallbacks of the application.
 *
 * @author Yann Hodiesne
 * @author Timothée Simon-Franza
 */
const RouteProvider = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(getCurrentUser);

	useEffect(() => {
		dispatch(loginWithToken());
	}, [dispatch]);

	return <RenderRoutes currentUser={currentUser} redirectAnonymous={keys.auth.login} redirectAuthenticated={keys.app.default} fallback={NotFound} routes={routes} />;
};

export default RouteProvider;
