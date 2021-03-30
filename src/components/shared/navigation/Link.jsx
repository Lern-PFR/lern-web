import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';
import {
	color,
} from 'styled-system';

const StyledLink = styled(ReactRouterLink)(
	{
		cursor: 'inherit',
		color: 'inherit',
		fontSize: 'inherit',
		fontWeight: 'inherit',
		textDecoration: 'inherit',
	},
	color,
);

/**
 * @name Link
 * @description Renders a link to an internal URL, by providing keys path to the route.
 *
 * @author Yann Hodiesne
 *
 * @param {string} to : key of the route to target with this Link
 */
const Link = ({ to, ...props }) => (
	<StyledLink to={to} {...props} />
);

Link.propTypes = {
	to: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.func,
	]),
};

Link.defaultProps = {
	to: '',
};

export default Link;
