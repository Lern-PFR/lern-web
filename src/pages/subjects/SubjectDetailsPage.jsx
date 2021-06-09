import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Proptypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import conf from 'conf';
import routes from 'routes/keys';

import { clearModuleList, fetchModuleListBySubjectId } from 'redux/actions/modules';
import { getSubjectById } from 'redux/selectors/subjects';
import { fetchSubject } from 'redux/actions/subjects';

import { StyledDiv, StyledSvg } from 'components/shared/styledElements';
import { Brevier, Canon, BodyCopy } from 'components/shared/typography';
import ModuleList from 'components/subjects/ModuleList';
import { SubtleLinkButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';

import { backToListButton, pageLayout, subjectAuthor, subjectName, subjectDetails, backToListSvg } from 'theme/pages/subjects/subjectDetailsPage';
import { backToParentButtonContentLayout } from 'theme/buttonStyles';

/**
 * @name SubjectDetailsPage
 * @description A page used to display the current subject with its composing modules.
 *
 * @author Timothée Simon-Franza
 *
 * @param {func} t	The translation method provided by the withTranslation HoC.
 */
const SubjectDetailsPage = ({ t }) => {
	const dispatch = useDispatch();
	const { subjectId } = useParams();

	const subject = useSelector((state) => getSubjectById(state, subjectId));

	useEffect(() => {
		dispatch(fetchModuleListBySubjectId(subjectId));
		dispatch(fetchSubject(subjectId));

		return () => dispatch(clearModuleList());
	}, [dispatch, subjectId]);

	return (
		<StyledDiv {...pageLayout}>
			{!subject && <></>}
			{subject && (
				<>
					<StyledDiv>
						<StyledDiv {...subjectDetails}>
							<Canon {...subjectName} tag="h1">{subject?.title}</Canon>
							<Brevier {...subjectAuthor}>
								{t('subjects.details.author_section', { author: subject?.author, lastUpdate: subject?.updatedAt })}
							</Brevier>
							<BodyCopy>{subject?.description}</BodyCopy>
							<SubtleLinkButton {...backToListButton}>
								<Link to={routes.subjects.list}>
									<StyledDiv {...backToParentButtonContentLayout}>
										<StyledSvg src={`${conf.svgPath}/chevronLeft.svg`} {...backToListSvg} />
										{t('subjects.links.back_to_list')}
									</StyledDiv>
								</Link>
							</SubtleLinkButton>
						</StyledDiv>
					</StyledDiv>
					<StyledDiv>
						<ModuleList
							modules={subject?.modules ?? []}
							noDataText={t('subjects.details.modules.no_data')}
						/>
					</StyledDiv>
				</>
			)}
		</StyledDiv>
	);
};

SubjectDetailsPage.propTypes = {
	t: Proptypes.func.isRequired,
};

export default withTranslation()(SubjectDetailsPage);
