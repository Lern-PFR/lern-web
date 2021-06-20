import { useSelector } from 'react-redux';

import { StyledDiv } from 'components/shared/styledElements';
import { HomepageAnon, HomepageAuth } from 'components/home';

import { getCurrentUser } from 'redux/selectors/users';

/**
 * @name Homepage
 * @description The default landing page on the website. Displays information according to the authentication status of the user.
 *
 * @author Christopher Walker
 *
 * @param {object}	[currentUser]	The currently authenticated user or undefined.
 */
const Homepage = () => {
	const currentUser = useSelector(getCurrentUser);

	return (
		<StyledDiv>
			{currentUser && <HomepageAuth user={currentUser} />}
			{!currentUser && <HomepageAnon />}
		</StyledDiv>
	);
};

export default Homepage;
