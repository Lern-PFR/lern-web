// import { useCallback, useMemo } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { generatePath } from 'react-router';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';

// import routes from 'routes';
// import { history } from 'routes/components/RouterProvider';

import { StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, Brevier } from 'components/shared/typography';
// import { OutlinedButton, OutlinedLinkButton } from 'components/shared/buttons';
// import Link from 'components/shared/navigation/Link';

import { innerContentListItem, moduleCard } from 'theme/contentEditionCommon/innerContentListTheme';
// import { deleteQuestion } from 'redux/actions/questions';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
		'&, & *': {
			cursor: 'pointer',
		},
	}
);

/**
 * @name LessonQuestionListItem
 * @description A component used to display a concept's lesson in the concept edition page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} description	The current lesson's description.
 * @param {string} id			The current lesson's id.
 * @param {string} title		THe current lesson's title.
 */
const LessonQuestionListItem = ({ exercise }) => {
	// const dispatch = useDispatch();
	// const { t } = useTranslation();
	const { id, questions } = exercise;

	// const editPageRedirectionLink = useMemo(() => generatePath(routes.lessons.lessonEdition, { lessonId: id }), [id]);

	// const onCardClick = useCallback(() => {
	// 	history.push(editPageRedirectionLink);
	// }, [editPageRedirectionLink]);

	// const onDeleteBtnClick = useCallback((e) => {
	// 	if (e?.stopPropagation) {
	// 		e.stopPropagation();
	// 	}

	// 	dispatch(deleteQuestion(id));
	// }, [dispatch, id]);

	return (
		<ListCard key={id} {...moduleCard}>
			<BodyCopy margin="0">{questions[0]?.statement}</BodyCopy>
			<Brevier margin="0">{questions[0]?.type}</Brevier>
			{/* <StyledDiv {...innerContentListItemActionsRow}>
				<OutlinedLinkButton>
					<Link to={editPageRedirectionLink}>{t('lessons.edition.questions_list.links.edit')}</Link>
				</OutlinedLinkButton>
				<OutlinedButton onClick={onDeleteBtnClick}>
					{t('lessons.edition.questions_list.links.delete')}
				</OutlinedButton>
			</StyledDiv> */}
		</ListCard>
	);
};

LessonQuestionListItem.propTypes = {
	exercise: PropTypes.object.isRequired,
};

export default LessonQuestionListItem;
