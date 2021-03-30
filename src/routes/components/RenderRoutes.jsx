import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import session from 'lib/shared/session';
import { history } from './RouterProvider';

/**
 * @name RouteWithSubRoutes
 * @description Renders a route with a potential sub-route.
 *
 * @author Yann Hodiesne
 *
 * @param {object}	currentUser				: If a user is authenticated, this variable contains its information. Undefined otherwise.
 * @param {string}	redirectAnonymous		: path to target if the user should be authenticated
 * @param {string}	redirectAuthenticated	: path to target if the user should be anonymous
 * @param {*}		fallback				: component to render as a fallback
 * @param {string}	accessRight				: access right to check against the current user rights
 * @param {object}	route 					: route to render
 */
const RouteWithSubRoutes = ({ currentUser, redirectAnonymous, redirectAuthenticated, fallback, accessRight, ...route }) => {
	// Here we check if the user should be redirected to another route
	// The route can have restriction properties, instructing us to check if the user is authenticated or not before rendering
	// As sub-routes can contain routes with such restriction properties, we must always render the sub-routes if there are any
	// As such, canAccessRoute checks for presence of sub-routes, the `allowAnonymous` and `allowAuthenticated` properties, and the user session

	const isLoggedIn = session.exists();

	// If a session exists but the user has not yet been fetched from the server, we do not want to render routes
	if (isLoggedIn && !currentUser) {
		// TODO replace with a loading page
		return <></>;
	}

	const redirectTarget = isLoggedIn ? redirectAuthenticated : redirectAnonymous;
	let canAccessRoute;

	// If there are sub-routes, skip the redirection logic
	if (route.routes === undefined) {
		const allowAnonymous = route.allowAnonymous === true; // Default value is false
		const allowAuthenticated = route.allowAuthenticated !== false; // Default value is true
		const requireSuperAdmin = route.superAdmin === true; // Default value is false

		canAccessRoute = (isLoggedIn ? allowAuthenticated : allowAnonymous) && (requireSuperAdmin ? (currentUser && currentUser.superadmin) : true);
	}

	return (
		<>
			{canAccessRoute && (
				<Route
					path={route.path}
					exact={route.exact}
					render={(props) => (route.routes ? (
						<RenderRoutes
							currentUser={currentUser}
							fallback={fallback}
							redirectAnonymous={redirectAnonymous}
							redirectAuthenticated={redirectAuthenticated}
							routes={route.routes}
						/>
					) : <route.component {...props} />)}
				/>
			)}
			{canAccessRoute || (
				<Redirect
					from={route.path}
					to={{
						pathname: redirectTarget,
						state: { requestedLocation: history.location },
					}}
				/>
			)}
		</>
	);
};

RouteWithSubRoutes.propTypes = {
	currentUser: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		superadmin: PropTypes.bool.isRequired,
	}),
	redirectAnonymous: PropTypes.string.isRequired,
	redirectAuthenticated: PropTypes.string.isRequired,
	fallback: PropTypes.elementType.isRequired,
	accessRight: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
};

RouteWithSubRoutes.defaultProps = {
	currentUser: undefined,
	routes: undefined,
	accessRight: undefined,
};

/**
 * @name RenderRoutes
 * @description Renders a set of routes with potential sub-routes.
 *
 * @author Yann Hodiesne
 *
 * @param {object}	currentUser				: If a user is authenticated, this variable contains its information. Undefined otherwise.
 * @param {string}	redirectAnonymous		: path to target if the user should be authenticated
 * @param {string}	redirectAuthenticated	: path to target if the user should be anonymous
 * @param {*}		fallback				: component to render as a fallback
 * @param {array}	route					: routes to render
 */
const RenderRoutes = ({ currentUser, redirectAnonymous, redirectAuthenticated, fallback, routes }) => (
	<Switch>
		{routes.map((route) => (
			<RouteWithSubRoutes
				currentUser={currentUser}
				key={route.path}
				fallback={fallback}
				redirectAnonymous={redirectAnonymous}
				redirectAuthenticated={redirectAuthenticated}
				{...route}
			/>
		))}
		<Route component={fallback} />
	</Switch>
);

RenderRoutes.propTypes = {
	currentUser: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		superadmin: PropTypes.bool.isRequired,
	}),
	redirectAnonymous: PropTypes.string.isRequired,
	redirectAuthenticated: PropTypes.string.isRequired,
	fallback: PropTypes.elementType.isRequired,
	routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RenderRoutes.defaultProps = {
	currentUser: undefined,
};

export default RenderRoutes;
