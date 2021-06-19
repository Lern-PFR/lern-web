import { Fragment } from 'react';
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

	if (contentType === 'module') {
		return action === 'creation' ? keys.subjects.moduleCreation : generatePath(keys.modules.moduleEdition, { moduleId: id });
	}

	if (contentType === 'concept') {
		return action === 'creation' ? keys.modules.conceptCreation : generatePath(keys.concepts.conceptEdition, { conceptId: id });
	}

	return keys.home.default;
};

/**
 * @name NavigationSidebar
 * @description A sidebar component used in the content creation and edition pages to navigate between a subject's children.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	[currentlyUpdatingSubjectId]		The id of the subject we're updating the content of.
 * @param {string}	[currentlyUpdatingElementId]		The id of the element we're updating.
 * @param {object}	[contentCreationOptions]			If we are on a content creation page, holds data to add a "create ..." item.
 * @param {string}	contentCreationOptions.contentType	The currently created content type.
 * @param {string}	contentCreationOptions.parentId		The parent of the content we're creating.
 */
const NavigationSidebar = ({ currentlyUpdatingSubjectId, currentlyUpdatingElementId, contentCreationOptions }) => {
	const { t } = useTranslation();
	const sidebarItemsList = useSelector((state) => getContentManipulationSidebarData(state, currentlyUpdatingSubjectId));

	return (
		<StyledList {...sidebar}>
			{!sidebarItemsList && <SidebarElement isCurrent>{t('subjects.creation.sidebar.new_subject')}</SidebarElement>}
			{sidebarItemsList && sidebarItemsList.map(({ label, id, contentType }) => (
				<Fragment key={id}>
					<SidebarElement isCurrent={!contentCreationOptions && isEqual(currentlyUpdatingElementId, id)}>
						<Link to={getRouteFromContentTypeAndAction('edition', contentType, id)}>{label}</Link>
					</SidebarElement>
					{contentCreationOptions && isEqual(contentCreationOptions.parentId, id) && (
						<SidebarElement isCurrent>{t(`subjects.creation.sidebar.new_${contentCreationOptions.contentType}`)}</SidebarElement>
					)}
				</Fragment>
			))}
		</StyledList>
	);
};

NavigationSidebar.propTypes = {
	currentlyUpdatingSubjectId: PropTypes.string,
	currentlyUpdatingElementId: PropTypes.string,
	contentCreationOptions: PropTypes.shape({
		contentType: PropTypes.string.isRequired,
		parentId: PropTypes.string.isRequired,
	}),
};

NavigationSidebar.defaultProps = {
	currentlyUpdatingSubjectId: undefined,
	currentlyUpdatingElementId: undefined,
	contentCreationOptions: undefined,
};

export default NavigationSidebar;
