import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import routes from 'routes';
import { deleteModule } from 'redux/actions/modules';
import { StyledDiv, StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, Brevier } from 'components/shared/typography';
import { OutlinedButton, OutlinedLinkButton } from 'components/shared/buttons';
import Link from 'components/shared/navigation/Link';

import { innerContentListItem, innerContentListItemActionsRow, moduleCard } from 'theme/contentEditionCommon/innerContentListTheme';
import { history } from 'routes/components/RouterProvider';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
		'&, & *': {
			cursor: 'pointer',
		},
	}
);

/**
 * @name SubjectModuleListItem
 * @description A component used to display a subject's module in the subject edition page.
 *
 * @author Timothée Simon-Franza
 *
 */
const SubjectModuleListItem = ({ description, id, title }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const editPageRedirectionLink = useMemo(() => generatePath(routes.modules.moduleEdition, { moduleId: id }), [id]);

	const onCardClick = useCallback(() => {
		history.push(editPageRedirectionLink);
	}, [editPageRedirectionLink]);

	const onDeleteModuleBtnClick = useCallback(() => {
		dispatch(deleteModule(id));
	}, [dispatch, id]);

	return (
		<ListCard key={id} onClick={onCardClick} {...moduleCard}>
			<BodyCopy margin="0">{title}</BodyCopy>
			<Brevier margin="0">{description}</Brevier>
			<StyledDiv {...innerContentListItemActionsRow}>
				<OutlinedLinkButton>
					<Link to={editPageRedirectionLink}>{t('subjects.edition.modules_list.links.edit')}</Link>
				</OutlinedLinkButton>
				<OutlinedButton onClick={onDeleteModuleBtnClick}>
					{t('subjects.edition.modules_list.links.delete')}
				</OutlinedButton>
			</StyledDiv>
		</ListCard>
	);
};

SubjectModuleListItem.propTypes = {
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default SubjectModuleListItem;
