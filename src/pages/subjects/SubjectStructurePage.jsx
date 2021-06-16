import { useTranslation, Trans } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'react-feather';
import styled from 'styled-components';

import conf from 'conf';
import routes from 'routes/keys';

import { StyledDiv, StyledList, StyledListItem, StyledSvg } from 'components/shared/styledElements';
import { Canon, BodyCopy } from 'components/shared/typography';
import { SubtleLinkButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import { navigationChevrons } from 'theme/pages/concepts/conceptDetailsPage';
import ConceptContentNavigator from 'components/concepts/conceptDetailsPage/ConceptContentNavigator';

import {
	backToListButton,
	pageLayout,
	subjectName,
	backToListSvg,
	list,
	listItem,
	lastListItem,
	subjectListItem,
	listItemText,
	activeListItem,
	activeListItemText,
	moduleList,
	notionList,
	courseList,
} from 'theme/pages/subjects/subjectStructurePage';
import { backToParentButtonContentLayout } from 'theme/buttonStyles';
import { LabelComponent } from 'components/shared/form';

const PreviousButton = styled(ChevronLeft)({ ...navigationChevrons });
const NextButton = styled(ChevronRight)({ ...navigationChevrons });

/**
 * @name SubjectStructurePage
 * @description A page used to explain the subject structure.
 *
 * @author Christopher Walker
 */
const SubjectStructurePage = () => {
	const { t } = useTranslation();

	return (
		<StyledDiv>
			<StyledDiv>
				<SubtleLinkButton {...backToListButton}>
					<Link to={routes.subjects.list}>
						<StyledDiv {...backToParentButtonContentLayout}>
							<StyledSvg src={`${conf.svgPath}/chevronLeft.svg`} {...backToListSvg} />
							{t('subjects.links.back_to_list')}
						</StyledDiv>
					</Link>
				</SubtleLinkButton>
				<Canon {...subjectName} tag="h1">{t('subjects.structure.title')}</Canon>
				<BodyCopy>{t('subjects.structure.subtitle')}</BodyCopy>
			</StyledDiv>
			<StyledDiv {...pageLayout}>
				<StyledDiv>
					<BodyCopy>
						<Trans i18nKey="subjects.structure.subject.description" components={{ bold: <strong /> }} />
					</BodyCopy>
					<BodyCopy {...moduleList}>
						<Trans i18nKey="subjects.structure.module.description" components={{ bold: <strong /> }} />
					</BodyCopy>
					<BodyCopy {...notionList}>
						<Trans i18nKey="subjects.structure.notion.description" components={{ bold: <strong /> }} />
					</BodyCopy>
					<BodyCopy {...courseList}>
						<Trans i18nKey="subjects.structure.course.description" components={{ bold: <strong /> }} />
					</BodyCopy>
				</StyledDiv>
				<StyledDiv>
					<StyledList {...list}>
						<StyledListItem {...listItem} {...lastListItem} {...subjectListItem}>
							<LabelComponent textStyle="greatprimer" disabled {...listItemText}>{t('subjects.structure.subject.example')}</LabelComponent>
							<StyledList {...list} {...moduleList}>
								<StyledListItem {...listItem}>
									<LabelComponent textStyle="greatprimer" disabled {...listItemText}>
										<Trans i18nKey="subjects.structure.module.examples.0.example" />
									</LabelComponent>
									<StyledList {...list} {...notionList}>
										<StyledListItem {...listItem}>
											<LabelComponent textStyle="greatprimer" disabled {...listItemText}>
												<Trans i18nKey="subjects.structure.notion.examples.0.example" />
											</LabelComponent>
											<StyledList {...list} {...courseList}>
												<StyledListItem {...listItem} {...activeListItem}>
													<LabelComponent textStyle="greatprimer" {...listItemText} {...activeListItemText}>
														<Trans i18nKey="subjects.structure.course.examples.0.example" />
													</LabelComponent>
												</StyledListItem>
												<StyledListItem {...listItem} {...activeListItem}>
													<LabelComponent textStyle="greatprimer" {...listItemText} {...activeListItemText}>
														<Trans i18nKey="subjects.structure.course.examples.1.example" />
													</LabelComponent>
												</StyledListItem>
												<StyledListItem {...listItem} {...activeListItem}>
													<LabelComponent textStyle="greatprimer" {...listItemText} {...activeListItemText}>
														<Trans i18nKey="subjects.structure.course.examples.2.example" />
													</LabelComponent>
												</StyledListItem>
												<StyledListItem {...listItem} {...activeListItem} {...lastListItem}>
													<LabelComponent textStyle="greatprimer" {...listItemText} {...activeListItemText}>
														<Trans i18nKey="subjects.structure.course.examples.3.example" />
													</LabelComponent>
												</StyledListItem>
											</StyledList>
										</StyledListItem>
										<StyledListItem {...listItem} {...lastListItem}>
											<LabelComponent textStyle="greatprimer" disabled {...listItemText}>
												<Trans i18nKey="subjects.structure.notion.examples.1.example" />
											</LabelComponent>
										</StyledListItem>
									</StyledList>
								</StyledListItem>
								<StyledListItem {...listItem} {...lastListItem}>
									<LabelComponent textStyle="greatprimer" disabled {...listItemText}>
										<Trans i18nKey="subjects.structure.module.examples.1.example" />
									</LabelComponent>
								</StyledListItem>
							</StyledList>
						</StyledListItem>
					</StyledList>
				</StyledDiv>
			</StyledDiv>
			<StyledDiv display="flex" justifyContent="center">
				<ConceptContentNavigator
					currentDocOrder={1}
					conceptContent={[1, 2, 3, 4]}
					redirectTo={2}
				/>
				<PreviousButton />
				<NextButton />
			</StyledDiv>
		</StyledDiv>
	);
};

export default SubjectStructurePage;
