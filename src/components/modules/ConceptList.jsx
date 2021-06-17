import PropTypes from 'prop-types';
import { StyledList } from 'components/shared/styledElements';
import { conceptList } from 'theme/pages/modules/moduleDetailsPage';
import ConceptListItem from './ConceptListItem';

/**
 * @name ConceptList
 * @description A component used to display a module's concept list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array} concepts The list of concepts to display.
 */
const ConceptList = ({ concepts }) => (
	<StyledList listStyle="none" {...conceptList}>
		{concepts && concepts.map(({ id, title, description, courses }) => (
			<ConceptListItem key={id} id={id} title={title} description={description} lessons={courses} />
		))}
	</StyledList>
);

ConceptList.propTypes = {
	concepts: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		lessons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})),
	})).isRequired,
};

export default ConceptList;
