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
import ConceptLessonListItem from './ConceptLessonListItem';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
	}
);

/**
 * @name ConceptLessonList
 * @description A component used in the concept edition page to display its lessons and a "create new lesson" link.
 *
 * @author Timothée Simon-Franza
 *
 * @param {Array}	lessonList	The lesson list of the concept currently being edited.
 * @param {string}	conceptId	The id of the parent concept.
 */
const ConceptLessonList = ({ lessonList, conceptId }) => {
	const { t } = useTranslation();

	const onAddLessonCardClick = useCallback(() => {
		history.push(generatePath(routes.concepts.lessonCreation, { conceptId }));
	}, [conceptId]);

	return (
		<StyledDiv marginTop="64px">
			<DoublePica as="h3">{t('concepts.edition.lessons_list.title')}</DoublePica>
			<StyledList {...innerContentList}>
				{lessonList.map((lesson) => (
					<ConceptLessonListItem key={lesson.id} {...lesson} />
				))}
				<ListCard {...addInnerContentCard} onClick={onAddLessonCardClick}>
					<PlusCircle />
					{t('concepts.edition.lessons_list.links.add')}
				</ListCard>
			</StyledList>
		</StyledDiv>
	);
};

ConceptLessonList.propTypes = {
	lessonList: PropTypes.arrayOf(
		PropTypes.shape({
			description: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	).isRequired,
	conceptId: PropTypes.string.isRequired,
};

export default ConceptLessonList;
