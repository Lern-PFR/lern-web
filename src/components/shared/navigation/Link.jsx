import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { color, layout, space } from 'styled-system';

const StyledLink = styled(ReactRouterLink)(
	{
		cursor: 'inherit',
		color: 'inherit',
		fontFamily: 'inherit',
		fontSize: (({ fontSize }) => (fontSize || 'inherit')),
		fontWeight: (({ fontWeight }) => (fontWeight || 'inherit')),
		textDecoration: 'inherit',
	},
	color,
	layout,
	space,
);

/**
 * @name Link
 * @description Renders a link to an internal URL, by providing keys path to the route.
 *
 * @author Yann Hodiesne
 *
 * @param {string}	to			key of the route to target with this Link
 * @param {bool}	[disabled]	Whether the link is disabled or not. If so, the onClick event is aborted.
 */
const Link = ({ to, disabled, ...props }) => (
	<StyledLink to={to} {...(disabled ? { onClick: (e) => e.preventDefault() } : {})} {...props} />
);

Link.propTypes = {
	to: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.func,
	]),
	disabled: PropTypes.bool,
};

Link.defaultProps = {
	disabled: false,
};

Link.defaultProps = {
	to: '',
};

export default Link;
