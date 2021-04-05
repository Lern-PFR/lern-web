import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link } from 'components/shared/navigation';
import routes from 'routes';

/**
 * @name NotFoundPage
 * @description A page to be displayed whenever the user hits an invalid URL.
 *
 * @author Yann Hodiesne
 *
 * @param {function} t : The i18next translation method.
 */
const NotFoundPage = ({ t }) => (
	<>
		<h1>{t('page_not_found.hero')}</h1>
		<h2>
			<Link to={routes.root}>{t('page_not_found.redirection_link.home_page')}</Link>
		</h2>
	</>
);

NotFoundPage.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(NotFoundPage);
