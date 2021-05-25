import PropTypes from 'prop-types';
import { mainContainerLayout, mainLayout } from 'theme/layout';
import { Navbar } from 'components/shared/navigation';
import { StyledDiv } from 'components/shared/styledElements';

/**
 * @name MainLayout
 * @description The main layout to use for every page of the application.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children Elements to be displayed in the page.
 */
const MainLayout = ({ children }) => (
	<StyledDiv {...mainContainerLayout}>
		<Navbar />
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
