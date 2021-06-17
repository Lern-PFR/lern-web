import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useParams } from 'react-router';
import { fetchModule } from 'redux/actions/modules';
import { useTranslation } from 'react-i18next';

import conf from 'conf';
import routes from 'routes/keys';

import { clearConceptList, fetchConceptListByModuleId } from 'redux/actions/concepts';
import { getModuleById } from 'redux/selectors/modules';

import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { Canon, GreatPrimer } from 'components/shared/typography';
import ConceptList from 'components/modules/ConceptList';
import { Link } from 'components/shared/navigation';
import { SubtleLinkButton } from 'components/shared/buttons';
import { moduleName, moduleDescription, pageLayout, backToSubjectSvg } from 'theme/pages/modules/moduleDetailsPage';
import { backToListButton } from 'theme/pages/subjects/subjectDetailsPage';
import { backToParentButtonContentLayout } from 'theme/buttonStyles';

/**
 * @name ModuleDetailsPage
 * @description A page used to display the current module and its composing concepts
 *
 * @author Timothée Simon-Franza
 */
const ModuleDetailsPage = () => {
	const { moduleId } = useParams();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const module = useSelector((state) => getModuleById(state, moduleId));

	useEffect(() => {
		dispatch(fetchModule(moduleId));
		dispatch(fetchConceptListByModuleId(moduleId));

		return () => dispatch(clearConceptList());
	}, [dispatch, moduleId]);

	return (
		<StyledDiv {...pageLayout}>
			{!module && (<></>)}
			{module && (
				<>
					<StyledDiv>
						<SubtleLinkButton {...backToListButton}>
							<Link to={generatePath(routes.subjects.subjectDetails, { subjectId: module?.subjectId })}>
								<StyledDiv {...backToParentButtonContentLayout}>
									<StyledSvg src={`${conf.svgPath}/chevronLeft.svg`} {...backToSubjectSvg} />
									{t('modules.links.back_to_subject')}
								</StyledDiv>
							</Link>
						</SubtleLinkButton>
						<Canon tag="h1" {...moduleName}>{module?.title}</Canon>
						<GreatPrimer {...moduleDescription}>{module?.description}</GreatPrimer>
					</StyledDiv>
					<ConceptList concepts={module?.concepts} />
				</>
			)}
		</StyledDiv>
	);
};

export default ModuleDetailsPage;
