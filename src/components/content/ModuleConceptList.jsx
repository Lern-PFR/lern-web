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
import ModuleConceptListItem from './ModuleConceptListItem';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
	}
);

/**
 * @name ModuleConceptList
 * @description A component used in the module edition page to display its concepts and a "create new concept" link.
 *
 * @author Timothée Simon-Franza
 *
 * @param {Array}	conceptList	The concept list of the module currently being edited.
 * @param {string}	moduleId	The id of the parent module.
 * @param {string}	subjectId	The id of the parent subject.
 */
const ModuleConceptList = ({ conceptList, moduleId, subjectId }) => {
	const { t } = useTranslation();

	const onAddModuleCardClick = useCallback(() => {
		history.push(generatePath(routes.modules.conceptCreation, { moduleId }));
	}, [moduleId]);

	return (
		<StyledDiv marginTop="64px">
			<DoublePica as="h3">{t('modules.edition.concepts_list.title')}</DoublePica>
			<StyledList {...innerContentList}>
				{conceptList.map((module) => (
					<ModuleConceptListItem key={module.id} subjectId={subjectId} {...module} />
				))}
				<ListCard {...addInnerContentCard} onClick={onAddModuleCardClick}>
					<PlusCircle />
					{t('modules.edition.concepts_list.links.add')}
				</ListCard>
			</StyledList>
		</StyledDiv>
	);
};

ModuleConceptList.propTypes = {
	conceptList: PropTypes.arrayOf(
		PropTypes.shape({
			description: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	).isRequired,
	moduleId: PropTypes.string.isRequired,
	subjectId: PropTypes.string.isRequired,
};

export default ModuleConceptList;
