import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { StyledDiv } from 'components/shared/styledElements';
import { Paragon } from 'components/shared/typography';
import { timelineTitle as timelineTitleStyle, sidebar } from 'theme/pages/home/homepageAuth';

/**
 * @name Sidebar
 * @description The sidebar to display on the connected user's dashboard.
 *
 * @author Christopher Walker
 *
 * @param {object} progression	The current user's recent progression.
 * @param {func} t				The translation method provided by the withTranslation HoC.
 */
const Sidebar = ({ t, progression }) => (
	<aside>
		<StyledDiv {...sidebar}>
			<Paragon tag="h1" {...timelineTitleStyle}>{t('home.pages.auth.timeline')}</Paragon>
			{progression.map(({ id }) => (
				<StyledDiv key={id} /> // TODO: create component
			))}
		</StyledDiv>
	</aside>
);

Sidebar.propTypes = {
	t: PropTypes.func.isRequired,
	progression: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
};

export default withTranslation()(Sidebar);
