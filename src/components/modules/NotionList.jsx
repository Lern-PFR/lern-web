import PropTypes from 'prop-types';
import { StyledList } from 'components/shared/styledElements';
import { notionList } from 'theme/pages/modules/moduleDetailsPage';
import NotionListItem from './NotionListItem';

/**
 * @name NotionList
 * @description A component used to display a module's notion list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array} notions The list of notions to display.
 */
const NotionList = ({ notions }) => (
	<StyledList listStyle="none" {...notionList}>
		{notions && notions.map(({ id, name, description, lessons }) => (
			<NotionListItem key={id} id={id} name={name} description={description} lessons={lessons} />
		))}
	</StyledList>
);

NotionList.propTypes = {
	notions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		lessons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})),
	})).isRequired,
};

export default NotionList;
