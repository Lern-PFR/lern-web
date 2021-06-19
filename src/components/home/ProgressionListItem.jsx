import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, GreatPrimer } from 'components/shared/typography';
import { progressionListItem } from 'theme/pages/home/homepageAuth';
import { getModuleById } from 'redux/selectors/modules';
import { fetchModule } from 'redux/actions/modules';

/**
 * @name ProgressionListItem
 * @description A custom list item to display an instance of a user's progression in a subject
 *
 * @author Christopher Walker
 *
 * @param {string} updatedAt		The last time this progression was updated - the last time the user advanced in this subject.
 * @param {object} subject			An instance of the subject that progression is being shown for.
 * @param {object} concept	An instance of the last concept that the user completed in this subject.
 * @param {number} completion		The percentage of the subject that the user has completed.
 */
const ProgressionListItem = ({ updatedAt, subject, concept, completion }) => {
	const module = useSelector((state) => getModuleById(state, concept.moduleId));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchModule(concept.moduleId));
	}, [dispatch, concept]);

	return (
		<StyledListItem {...progressionListItem}>
			<GreatPrimer margin="0">{updatedAt}</GreatPrimer>
			<BodyCopy margin="0">
				{subject.title}
				(
				{completion}
				)
			</BodyCopy>
			<BodyCopy margin="1px">{module?.title}</BodyCopy>
			<BodyCopy margin="2px">{concept.title}</BodyCopy>
		</StyledListItem>
	);
};

ProgressionListItem.propTypes = {
	updatedAt: PropTypes.string.isRequired,
	subject: PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
	concept: PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		title: PropTypes.string.isRequired,
		moduleId: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
	}).isRequired,
	completion: PropTypes.number.isRequired,
};

export default ProgressionListItem;
