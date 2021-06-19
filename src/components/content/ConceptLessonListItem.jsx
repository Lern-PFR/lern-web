import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import routes from 'routes';
import { history } from 'routes/components/RouterProvider';

import { StyledDiv, StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, Brevier } from 'components/shared/typography';
import { OutlinedButton, OutlinedLinkButton } from 'components/shared/buttons';
import Link from 'components/shared/navigation/Link';

import { innerContentListItem, innerContentListItemActionsRow, moduleCard } from 'theme/contentEditionCommon/innerContentListTheme';
import { deleteLesson } from 'redux/actions/lessons';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
		'&, & *': {
			cursor: 'pointer',
		},
	}
);

/**
 * @name ConceptLessonListItem
 * @description A component used to display a concept's lesson in the concept edition page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} description	The current lesson's description.
 * @param {string} id			The current lesson's id.
 * @param {string} title		THe current lesson's title.
 */
const ConceptLessonListItem = ({ description, id, title }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const editPageRedirectionLink = useMemo(() => generatePath(routes.lessons.lessonEdition, { lessonId: id }), [id]);

	const onCardClick = useCallback(() => {
		history.push(editPageRedirectionLink);
	}, [editPageRedirectionLink]);

	const onDeleteBtnClick = useCallback((e) => {
		if (e?.stopPropagation) {
			e.stopPropagation();
		}

		dispatch(deleteLesson(id));
	}, [dispatch, id]);

	return (
		<ListCard key={id} onClick={onCardClick} {...moduleCard}>
			<BodyCopy margin="0">{title}</BodyCopy>
			<Brevier margin="0">{description}</Brevier>
			<StyledDiv {...innerContentListItemActionsRow}>
				<OutlinedLinkButton>
					<Link to={editPageRedirectionLink}>{t('concepts.edition.lessons_list.links.edit')}</Link>
				</OutlinedLinkButton>
				<OutlinedButton onClick={onDeleteBtnClick}>
					{t('concepts.edition.lessons_list.links.delete')}
				</OutlinedButton>
			</StyledDiv>
		</ListCard>
	);
};

ConceptLessonListItem.propTypes = {
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default ConceptLessonListItem;
