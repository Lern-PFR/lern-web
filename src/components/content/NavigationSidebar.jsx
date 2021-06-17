import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import keys from 'routes';
import { generatePath } from 'react-router';

import { getContentManipulationSidebarData } from 'redux/selectors/subjects';
import { StyledList } from 'components/shared/styledElements';
import { Link } from 'components/shared/navigation';
import { sidebar, sidebarCurrentElement, sidebarElement } from 'theme/contentEditionCommon/sidebar';

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
 *
 * @function
 * @name getRouteFromContentTypeAndAction
 * @description Returns a route depending on the action, content type and id if there is one.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} action		The action we want to perform. Can either be "creation" or "edition".
 * @param {string} contentType	The type of content we want to affect. Can be "subject", "module", "concept", "course" or "exercise".
 * @param {string} [id = null]	The id of the element we want to edit, if we want to perform an edition.
 *
 * @returns {string} The url from the routes/keys.js file linked to the provided information.
 */
const getRouteFromContentTypeAndAction = (action, contentType, id = null) => {
	if (contentType === 'subject') {
		return action === 'creation' ? keys.subjects.subjectCreation : generatePath(keys.subjects.subjectEdition, { subjectId: id });
	}

	return keys.home.default;
};

/**
 * @name NavigationSidebar
 * @description A sidebar component used in the content creation and edition pages to navigate between a subject's children.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} [currentlyUpdatingSubjectId] The id of the subject we're updating the content of.
 */
const NavigationSidebar = ({ currentlyUpdatingSubjectId }) => {
	const { t } = useTranslation();
	const sidebarItemsList = useSelector((state) => getContentManipulationSidebarData(state, currentlyUpdatingSubjectId));
	const [currentlyUpdatingElement] = useState({ contentType: 'subject', id: currentlyUpdatingSubjectId });

	return (
		<StyledList {...sidebar}>
			{!sidebarItemsList && <SidebarElement isCurrent>{t('subjects.creation.sidebar.new_subject')}</SidebarElement>}
			{sidebarItemsList && sidebarItemsList.map(({ label, id, contentType }) => (
				<SidebarElement key={id} isCurrent={isEqual(currentlyUpdatingElement.id, id)}>
					<Link to={getRouteFromContentTypeAndAction('edition', contentType, id)}>{label}</Link>
				</SidebarElement>
			))}
		</StyledList>
	);
};

NavigationSidebar.propTypes = {
	currentlyUpdatingSubjectId: PropTypes.string,
};

NavigationSidebar.defaultProps = {
	currentlyUpdatingSubjectId: undefined,
};

export default NavigationSidebar;
