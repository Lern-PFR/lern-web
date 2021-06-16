import { StyledList } from 'components/shared/styledElements';
import { useTranslation } from 'react-i18next';
import { sidebar, sidebarCurrentElement, sidebarElement } from 'theme/pages/subjects/subjectCreationPage';
import styled from 'styled-components';

const SidebarElement = styled('li')(
	{
		...sidebarElement,
		color: (({ isCurrent }) => (isCurrent ? sidebarCurrentElement.color : sidebarElement.color)),
		backgroundColor: (({ isCurrent }) => (isCurrent ? sidebarCurrentElement.backgroundColor : sidebarElement.backgroundColor)),

		'&:hover': {
			color: ({ isCurrent }) => (isCurrent ? sidebarCurrentElement['&:hover'].color : sidebarElement['&:hover'].color),
		},
	},
);

/**
 * @name NavigationSidebar
 * @description A sidebar component used in the content creation and edition pages to navigate between a subject's children.
 *
 * @author Timothée Simon-Franza
 */
const NavigationSidebar = () => {
	const { t } = useTranslation();

	return (
		<StyledList {...sidebar}>
			<SidebarElement isCurrent>{t('subjects.creation.sidebar.new_subject')}</SidebarElement>
		</StyledList>
	);
};

export default NavigationSidebar;
