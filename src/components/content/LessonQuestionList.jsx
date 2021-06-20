import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { PlusCircle } from 'react-feather';
import { generatePath } from 'react-router';
import styled from 'styled-components';

import routes from 'routes';
import { StyledDiv, StyledList, StyledListItem } from 'components/shared/styledElements';
import { DoublePica } from 'components/shared/typography';
import { history } from 'routes/components/RouterProvider';

import { addInnerContentCard, innerContentList, innerContentListItem } from 'theme/contentEditionCommon/innerContentListTheme';
import LessonQuestionListItem from './LessonQuestionListItem';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
	}
);

/**
 * @name LessonQuestionList
 * @description A component used in the concept edition page to display its lessons and a "create new lesson" link.
 *
 * @author Timothée Simon-Franza
 *
 * @param {Array}	exerciseList	The lesson list of the concept currently being edited.
 * @param {string}	lessonId	The id of the parent concept.
 */
const LessonQuestionList = ({ exerciseList, lessonId }) => {
	const { t } = useTranslation();

	const onAddQuestionCardClick = useCallback(() => {
		history.push(generatePath(routes.lessons.exerciseCreation, { lessonId }));
	}, [lessonId]);

	return (
		<StyledDiv marginTop="64px">
			<DoublePica as="h3">{t('lessons.edition.questions_list.title')}</DoublePica>
			<StyledList {...innerContentList}>
				{exerciseList.length === 0 && (
					<ListCard {...addInnerContentCard} onClick={onAddQuestionCardClick}>
						<PlusCircle />
						{t('lessons.edition.questions_list.links.add')}
					</ListCard>
				)}
				{exerciseList.length > 0 && exerciseList.map((exercise) => (
					<LessonQuestionListItem key={exercise.id} exercise={exercise} />
				))}
			</StyledList>
		</StyledDiv>
	);
};

LessonQuestionList.propTypes = {
	exerciseList: PropTypes.arrayOf(
		PropTypes.shape({
			description: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	).isRequired,
	lessonId: PropTypes.string.isRequired,
};

export default LessonQuestionList;
