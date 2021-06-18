import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import routes from 'routes';
import { history } from 'routes/components/RouterProvider';

import { deleteConcept } from 'redux/actions/concepts';
import { StyledDiv, StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, Brevier } from 'components/shared/typography';
import { OutlinedButton, OutlinedLinkButton } from 'components/shared/buttons';
import Link from 'components/shared/navigation/Link';

import { innerContentListItem, innerContentListItemActionsRow, moduleCard } from 'theme/contentEditionCommon/innerContentListTheme';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
		'&, & *': {
			cursor: 'pointer',
		},
	}
);

/**
 * @name ModuleConceptListItem
 * @description A component used to display a module's concept in the subject edition page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} description	The current concept's description.
 * @param {string} id			The current concept's id.
 * @param {string} subjectId	The current concept's parent subject's id. Used for data refresh after deletion.
 * @param {string} title		THe current concept's title.
 */
const ModuleConceptListItem = ({ description, id, subjectId, title }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const editPageRedirectionLink = useMemo(() => generatePath(routes.concepts.conceptEdition, { conceptId: id }), [id]);

	const onCardClick = useCallback(() => {
		history.push(editPageRedirectionLink);
	}, [editPageRedirectionLink]);

	const onDeleteBtnClick = useCallback((e) => {
		if (e?.stopPropagation) {
			e.stopPropagation();
		}

		dispatch(deleteConcept(id, subjectId));
	}, [dispatch, id, subjectId]);

	return (
		<ListCard key={id} onClick={onCardClick} {...moduleCard}>
			<BodyCopy margin="0">{title}</BodyCopy>
			<Brevier margin="0">{description}</Brevier>
			<StyledDiv {...innerContentListItemActionsRow}>
				<OutlinedLinkButton>
					<Link to={editPageRedirectionLink}>{t('modules.edition.concepts_list.links.edit')}</Link>
				</OutlinedLinkButton>
				<OutlinedButton onClick={onDeleteBtnClick}>
					{t('modules.edition.concepts_list.links.delete')}
				</OutlinedButton>
			</StyledDiv>
		</ListCard>
	);
};

ModuleConceptListItem.propTypes = {
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	subjectId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default ModuleConceptListItem;
