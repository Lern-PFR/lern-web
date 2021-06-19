import { useSelector } from 'react-redux';
import { getProgression } from 'redux/selectors/progression';
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
 */
const Sidebar = () => {
	const { t } = useTranslation();
	const progression = useSelector((state) => getProgression(state));

	return (
		<aside>
			<StyledDiv {...sidebar}>
				<Paragon tag="h1" {...timelineTitleStyle}>{t('home.pages.auth.timeline')}</Paragon>
				<StyledList {...progList}>
					{progression.map((prog) => (
						<ProgressionListItem key={prog.updatedAt} {...prog} />
					))}
				</StyledList>
			</StyledDiv>
		</aside>
	);
};

export default Sidebar;
