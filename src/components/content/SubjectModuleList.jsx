import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { PlusCircle } from 'react-feather';
import styled from 'styled-components';

import routes from 'routes';
import { StyledDiv, StyledList, StyledListItem } from 'components/shared/styledElements';
import { DoublePica } from 'components/shared/typography';
import { history } from 'routes/components/RouterProvider';

import { addInnerContentCard, innerContentList, innerContentListItem } from 'theme/contentEditionCommon/innerContentListTheme';
import SubjectModuleListItem from './SubjectModuleListItem';

const ListCard = styled(StyledListItem)(
	{
		...innerContentListItem,
	}
);

/**
 * @name SubjectModuleList
 * @description A component used in the subject edition page to display its modules and a "create new module" link.
 *
 * @author Timothée Simon-Franza
 *
 * @param {Array}	moduleList	The module list of the subject currently being edited.
 */
const SubjectModuleList = ({ moduleList }) => {
	const { t } = useTranslation();

	const onAddModuleCardClick = useCallback(() => {
		history.push(routes.modules.moduleCreation);
	}, []);

	return (
		<StyledDiv marginTop="64px">
			<DoublePica as="h3">{t('subjects.edition.modules_list.title')}</DoublePica>
			<StyledList {...innerContentList}>
				{moduleList.map((module) => (
					<SubjectModuleListItem key={module.id} {...module} />
				))}
				<ListCard {...addInnerContentCard} onClick={onAddModuleCardClick}>
					<PlusCircle />
					{t('subjects.edition.modules_list.links.add')}
				</ListCard>
			</StyledList>
		</StyledDiv>
	);
};

SubjectModuleList.propTypes = {
	moduleList: PropTypes.arrayOf(
		PropTypes.shape({
			description: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default SubjectModuleList;
