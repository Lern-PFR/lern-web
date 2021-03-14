import PropTypes from 'prop-types';
import { mainContainerLayout, mainLayout } from 'theme/layout';
import { StyledDiv } from 'components/shared/layout';

/**
 * @name MainLayout
 * @description The main layout to use for every page of the application.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : Elements to be displayed in the page.
 */
const MainLayout = ({ children }) => (
	<StyledDiv {...mainContainerLayout}>
		{/* @TODO: replace next line with custom Navbar react component. */}
		<nav />
		<StyledDiv as="main" {...mainLayout}>
			{children}
		</StyledDiv>
	</StyledDiv>
);

MainLayout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.elementType,
		PropTypes.node,
	]).isRequired,
};

export default MainLayout;
