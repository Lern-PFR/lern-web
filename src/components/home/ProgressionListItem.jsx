import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useEffect } from 'react';
import { generatePath } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDiv, StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, GreatPrimer } from 'components/shared/typography';
import { progressionListItem, progressionListItemContent, progressionPill, progressionPillFilled, timelineConcept, timelineDate, timelineHeader, timelineModule, timelineSubject } from 'theme/pages/home/homepageAuth';
import { getModuleById } from 'redux/selectors/modules';
import { fetchModule } from 'redux/actions/modules';
import routes from 'routes';
import { history } from 'routes/components/RouterProvider';

/**
 * @name ProgressionListItem
 * @description A custom list item to display an instance of a user's progression in a subject
 *
 * @author Christopher Walker
 *
 * @param {string} updatedAt		The last time this progression was updated - the last time the user advanced in this subject.
 * @param {object} subject			An instance of the subject that progression is being shown for.
 * @param {object} concept			An instance of the last concept that the user completed in this subject.
 * @param {number} completion		The percentage of the subject that the user has completed.
 */
const ProgressionListItem = ({ updatedAt, subject, concept, completion }) => {
	const { t } = useTranslation();
	const module = useSelector((state) => getModuleById(state, concept.moduleId));
	const dispatch = useDispatch();
	const conceptIndex = module?.concepts.indexOf(module?.concepts.filter((c) => c.id === concept.id)[0]);
	let nextConcept;
	let nextModule;

	if (conceptIndex === module?.concepts.length - 1) {
		nextModule = subject?.modules[subject?.modules.indexOf(module) + 1] ?? {};
		console.log(nextModule);
		if (nextModule !== undefined) {
			nextConcept = nextModule?.concepts[0];
		}
	} else {
		nextConcept = module?.concepts[conceptIndex + 1];
	}

	const detailsPageRedirectionLink = useMemo(() => generatePath(routes.concepts.conceptDetails, { conceptId: concept.id }), [concept]);

	const onCardClick = useCallback(() => {
		history.push(detailsPageRedirectionLink);
	}, [detailsPageRedirectionLink]);

	useEffect(() => {
		dispatch(fetchModule(concept.moduleId));
	}, [dispatch, concept]);

	return (
		<StyledListItem {...progressionListItem} onClick={onCardClick}>
			<StyledDiv {...progressionListItemContent}>
				<StyledDiv {...progressionPill} {...progressionPillFilled} />
				<StyledDiv {...timelineHeader}>
					<GreatPrimer {...timelineDate}>{t('home.pages.auth.date', { lastUpdate: updatedAt })}</GreatPrimer>
					<BodyCopy {...timelineSubject}>{t('home.pages.auth.subject_completion', { subject: subject.title, completion })}</BodyCopy>
				</StyledDiv>
			</StyledDiv>
			<StyledDiv {...progressionListItemContent}>
				<StyledDiv {...progressionPill} {...progressionPillFilled} />
				<BodyCopy {...timelineModule}>{module?.title}</BodyCopy>
			</StyledDiv>
			<StyledDiv {...progressionListItemContent}>
				<StyledDiv {...progressionPill} {...progressionPillFilled} />
				<BodyCopy {...timelineConcept}>{concept.title}</BodyCopy>
			</StyledDiv>
			{nextModule && (
			<StyledDiv {...progressionListItemContent}>
				<StyledDiv {...progressionPill} />
				<BodyCopy {...timelineModule}>{nextModule?.title}</BodyCopy>
			</StyledDiv>
			)}
			{nextConcept && (
			<StyledDiv {...progressionListItemContent}>
				<StyledDiv {...progressionPill} />
				<BodyCopy {...timelineConcept}>{nextConcept?.title}</BodyCopy>
			</StyledDiv>
			)}
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
		modules: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number,
				]).isRequired,
				title: PropTypes.string.isRequired,
			}).isRequired,
		).isRequired,
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
