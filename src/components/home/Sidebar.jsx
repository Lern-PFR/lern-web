import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyledDiv, StyledList } from 'components/shared/styledElements';
import { Paragon } from 'components/shared/typography';
import { timelineTitle as timelineTitleStyle, sidebar, progressionList as progList } from 'theme/pages/home/homepageAuth';
import ProgressionListItem from './ProgressionListItem';

/**
 * @name Sidebar
 * @description The sidebar to display on the connected user's dashboard.
 *
 * @author Christopher Walker
 *
 * @param {object} progressionList	The current user's recent progression.
 * @param {func} t				The translation method provided by the withTranslation HoC.
 */
const Sidebar = ({ progressionList }) => {
	const { t } = useTranslation();

	return (
		<aside>
			<StyledDiv {...sidebar}>
				<Paragon tag="h1" {...timelineTitleStyle}>{t('home.pages.auth.timeline')}</Paragon>
				<StyledList {...progList}>
					{progressionList.map((prog) => (
						<ProgressionListItem key={prog.updatedAt} {...prog} />
					))}
				</StyledList>
			</StyledDiv>
		</aside>
	);
};

Sidebar.propTypes = {
	progressionList: PropTypes.arrayOf(
		PropTypes.shape({
			createdAt: PropTypes.string.isRequired,
			updatedAt: PropTypes.string.isRequired,
			user: PropTypes.object.isRequired,
			subject: PropTypes.object.isRequired,
			concept: PropTypes.object.isRequired,
			suspended: PropTypes.bool.isRequired,
			completed: PropTypes.bool.isRequired,
			completion: PropTypes.number.isRequired,
			score: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default Sidebar;
