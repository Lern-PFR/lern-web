import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotFound from 'pages/NotFound';
import { loginWithToken } from 'redux/actions/users';
import { RenderRoutes } from '.';
import routes from '../routes';
import keys from '../keys';

/**
 * @name RouteProvider
 * @description A component providing react-router with all routes and fallbacks of the application.
 *
 * @author Yann Hodiesne
 *
 * @param {func}	dispatchLoginWithToken	A dispatched redux action creator used to check if the current auth token is valid.
 * @param {object}	currentUser				The currently authentified user.
 */
const RouteProvider = ({ dispatchLoginWithToken, currentUser }) => {
	useEffect(() => {
		dispatchLoginWithToken();
	}, [dispatchLoginWithToken]);

	return <RenderRoutes currentUser={currentUser} redirectAnonymous={keys.auth.login} redirectAuthenticated={keys.app.default} fallback={NotFound} routes={routes} />;
};

RouteProvider.propTypes = {
	dispatchLoginWithToken: PropTypes.func.isRequired,
	currentUser: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		superadmin: PropTypes.bool.isRequired,
	}),
};

RouteProvider.defaultProps = {
	currentUser: undefined,
};

/**
 *
 * @param {*} state
 * @param {*} ownProps
 */
const mapStateToProps = (state) => {
	const { users: { currentUser } } = state;

	return {
		currentUser,
	};
};

const mapDispatchToProps = {
	dispatchLoginWithToken: loginWithToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteProvider);
