import PropTypes from 'prop-types';
import { StyledList } from 'components/shared/layout';
import { moduleList } from 'theme/pages/subjects/subjectDetailsPage';
import ModuleListItem from './ModuleListItem';

/**
 * @name ModuleList
 * @description A component used to display a subject's module list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array} modules The list of modules to display.
 */
const ModuleList = ({ modules }) => (
	<StyledList {...moduleList} listStyle="none">
		{modules && modules.map(({ id, name, description }) => (
			<ModuleListItem
				key={id}
				id={id}
				name={name}
				description={description}
			/>
		))}
	</StyledList>
);

ModuleList.propTypes = {
	modules: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})).isRequired,
};

export default ModuleList;
